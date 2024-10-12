// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SwiftMessageOracle {
    struct VerificationRequest {
        address requester;
        string swiftCode;
        IERC20 token;
        uint256 amount;
        bool verified;
    }

    uint256 public jobCounter;
    mapping(uint256 => VerificationRequest) public requests;
    mapping(bytes32 => address) public ibanMapping;
    mapping(address => string) public addressMapping;
    address public oracle;
    
    event AssignIban(address indexed wallet, string iban);
    event VerificationRequested(uint256 indexed jobId, address indexed requester, string swiftCode);
    event VerificationCompleted(uint256 indexed jobId, bool verified);

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only the oracle can perform this action");
        _;
    }

    constructor(address _oracle) {
        oracle = _oracle;
    }

    function assignIban(string calldata swiftCode) external {
        ibanMapping[keccak256(abi.encode(swiftCode))] = msg.sender;
        addressMapping[msg.sender] = swiftCode;
        emit AssignIban(msg.sender, swiftCode);
    }

    function requestVerification(IERC20 token, uint256 amount, string calldata swiftCode) external returns (uint256) {
        jobCounter++;
        requests[jobCounter] = VerificationRequest(msg.sender, swiftCode, token, amount, false);

        token.transferFrom(msg.sender, address(this), amount);

        emit VerificationRequested(jobCounter, msg.sender, swiftCode);
        return jobCounter;
    }

    function submitVerification(uint256 jobId, bool verified, bytes calldata signature) external onlyOracle {
        require(requests[jobId].requester != address(0), "Invalid job ID");
        require(_verifySignature(jobId, verified, signature), "Invalid signature");

        requests[jobId].verified = verified;

        if (verified) {
            address target = ibanMapping[keccak256(abi.encode(requests[jobId].swiftCode))];
            requests[jobId].token.transfer(target, requests[jobId].amount);
        }

        emit VerificationCompleted(jobId, verified);
    }

    function _verifySignature(uint256 jobId, bool verified, bytes memory signature) internal view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(jobId, verified));
        bytes32 ethSignedMessageHash = _toEthSignedMessageHash(messageHash);
        return _recoverSigner(ethSignedMessageHash, signature) == oracle;
    }

    function _toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function _recoverSigner(bytes32 ethSignedMessageHash, bytes memory signature) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = _splitSignature(signature);
        return ecrecover(ethSignedMessageHash, v, r, s);
    }

    function _splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Invalid signature length");
        
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}