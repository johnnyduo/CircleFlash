/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  SwiftMessageOracle,
  SwiftMessageOracleInterface,
} from "../../contracts/SwiftMessageOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "iban",
        type: "string",
      },
    ],
    name: "AssignIban",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "verified",
        type: "bool",
      },
    ],
    name: "VerificationCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "swiftCode",
        type: "string",
      },
    ],
    name: "VerificationRequested",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressMapping",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "swiftCode",
        type: "string",
      },
    ],
    name: "assignIban",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "ibanMapping",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "jobCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "swiftCode",
        type: "string",
      },
    ],
    name: "requestVerification",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        internalType: "string",
        name: "swiftCode",
        type: "string",
      },
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "verified",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "verified",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "submitVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50604051610fce380380610fce833981016040819052602c916050565b600480546001600160a01b0319166001600160a01b0392909216919091179055607e565b600060208284031215606157600080fd5b81516001600160a01b0381168114607757600080fd5b9392505050565b610f418061008d6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80637dc0d1d01161005b5780637dc0d1d0146100f557806381d12c581461012057806396bfb321146101445780639f169a621461015757600080fd5b806303bcbcd81461008d5780630494cd9a146100a25780630d213472146100cb57806350355d76146100de575b600080fd5b6100a061009b366004610a15565b610180565b005b6100b56100b0366004610a86565b610413565b6040516100c29190610af0565b60405180910390f35b6100a06100d9366004610b03565b6104ad565b6100e760005481565b6040519081526020016100c2565b600454610108906001600160a01b031681565b6040516001600160a01b0390911681526020016100c2565b61013361012e366004610b45565b610569565b6040516100c2959493929190610b5e565b6100e7610152366004610baa565b61063a565b610108610165366004610b45565b6002602052600090815260409020546001600160a01b031681565b6004546001600160a01b031633146101ef5760405162461bcd60e51b815260206004820152602760248201527f4f6e6c7920746865206f7261636c652063616e20706572666f726d20746869736044820152661030b1ba34b7b760c91b60648201526084015b60405180910390fd5b6000848152600160205260409020546001600160a01b03166102445760405162461bcd60e51b815260206004820152600e60248201526d125b9d985b1a59081a9bd888125160921b60448201526064016101e6565b610285848484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061080692505050565b6102c55760405162461bcd60e51b8152602060048201526011602482015270496e76616c6964207369676e617475726560781b60448201526064016101e6565b6000848152600160205260409020600401805460ff191684158015919091179091556103d157600060026000600160008881526020019081526020016000206001016040516020016103179190610c28565b60408051808303601f19018152918152815160209283012083528282019390935290820160009081205488825260019092528290206002810154600390910154925163a9059cbb60e01b81526001600160a01b03928316600482018190526024820194909452929350169063a9059cbb906044016020604051808303816000875af11580156103aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ce9190610cb4565b50505b837f9836dc47c75b7cdf9f3c6918e37848e107a9b6ea2209871e46b5f05895e20f3484604051610405911515815260200190565b60405180910390a250505050565b6003602052600090815260409020805461042c90610bee565b80601f016020809104026020016040519081016040528092919081815260200182805461045890610bee565b80156104a55780601f1061047a576101008083540402835291602001916104a5565b820191906000526020600020905b81548152906001019060200180831161048857829003601f168201915b505050505081565b336002600084846040516020016104c5929190610cd1565b60408051808303601f190181529181528151602092830120835282820193909352908201600090812080546001600160a01b0319166001600160a01b039590951694909417909355338352600390529020610521828483610d65565b50336001600160a01b03167feda13d285e28f0895059db124ead568507865a7ab2aab268b418276e0145ac1e838360405161055d929190610cd1565b60405180910390a25050565b6001602081905260009182526040909120805491810180546001600160a01b039093169261059690610bee565b80601f01602080910402602001604051908101604052809291908181526020018280546105c290610bee565b801561060f5780601f106105e45761010080835404028352916020019161060f565b820191906000526020600020905b8154815290600101906020018083116105f257829003601f168201915b505050506002830154600384015460049094015492936001600160a01b039091169290915060ff1685565b60008054818061064983610e25565b91905055506040518060a00160405280336001600160a01b0316815260200184848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509385525050506001600160a01b0388811660208085019190915260408085018a9052606090940183905282548352600180825293909220845181546001600160a01b03191692169190911781559083015190918201906106fa9082610e4c565b506040828101516002830180546001600160a01b0319166001600160a01b03928316179055606084015160038401556080909301516004928301805460ff1916911515919091179055516323b872dd60e01b8152339181019190915230602482015260448101869052908616906323b872dd906064016020604051808303816000875af115801561078f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b39190610cb4565b50336001600160a01b03166000547fa34e1dd2e50439a3590264f0b2c8d97c220efc7ef0fbe5a3552280b9b128c84485856040516107f2929190610cd1565b60405180910390a350600054949350505050565b600080848460405160200161082a929190918252151560f81b602082015260210190565b604051602081830303815290604052805190602001209050600061089b826040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b6004549091506001600160a01b03166108b482866108c8565b6001600160a01b0316149695505050505050565b6000806000806108d785610947565b6040805160008152602081018083528b905260ff8316918101919091526060810184905260808101839052929550909350915060019060a0016020604051602081039080840390855afa158015610932573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b6000806000835160411461099d5760405162461bcd60e51b815260206004820152601860248201527f496e76616c6964207369676e6174757265206c656e677468000000000000000060448201526064016101e6565b50505060208101516040820151606090920151909260009190911a90565b80151581146109c957600080fd5b50565b60008083601f8401126109de57600080fd5b50813567ffffffffffffffff8111156109f657600080fd5b602083019150836020828501011115610a0e57600080fd5b9250929050565b60008060008060608587031215610a2b57600080fd5b843593506020850135610a3d816109bb565b9250604085013567ffffffffffffffff811115610a5957600080fd5b610a65878288016109cc565b95989497509550505050565b6001600160a01b03811681146109c957600080fd5b600060208284031215610a9857600080fd5b8135610aa381610a71565b9392505050565b6000815180845260005b81811015610ad057602081850181015186830182015201610ab4565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610aa36020830184610aaa565b60008060208385031215610b1657600080fd5b823567ffffffffffffffff811115610b2d57600080fd5b610b39858286016109cc565b90969095509350505050565b600060208284031215610b5757600080fd5b5035919050565b6001600160a01b038616815260a060208201819052600090610b8290830187610aaa565b6001600160a01b03959095166040830152506060810192909252151560809091015292915050565b60008060008060608587031215610bc057600080fd5b8435610bcb81610a71565b935060208501359250604085013567ffffffffffffffff811115610a5957600080fd5b600181811c90821680610c0257607f821691505b602082108103610c2257634e487b7160e01b600052602260045260246000fd5b50919050565b602081526000808354610c3a81610bee565b8060208601526001821660008114610c595760018114610c7557610ca9565b60ff1983166040870152604082151560051b8701019350610ca9565b86600052602060002060005b83811015610ca057815488820160400152600190910190602001610c81565b87016040019450505b509195945050505050565b600060208284031215610cc657600080fd5b8151610aa3816109bb565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b634e487b7160e01b600052604160045260246000fd5b601f821115610d6057806000526020600020601f840160051c81016020851015610d3d5750805b601f840160051c820191505b81811015610d5d5760008155600101610d49565b50505b505050565b67ffffffffffffffff831115610d7d57610d7d610d00565b610d9183610d8b8354610bee565b83610d16565b6000601f841160018114610dc55760008515610dad5750838201355b600019600387901b1c1916600186901b178355610d5d565b600083815260209020601f19861690835b82811015610df65786850135825560209485019460019092019101610dd6565b5086821015610e135760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b600060018201610e4557634e487b7160e01b600052601160045260246000fd5b5060010190565b815167ffffffffffffffff811115610e6657610e66610d00565b610e7a81610e748454610bee565b84610d16565b6020601f821160018114610eae5760008315610e965750848201515b600019600385901b1c1916600184901b178455610d5d565b600084815260208120601f198516915b82811015610ede5787850151825560209485019460019092019101610ebe565b5084821015610efc5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea264697066735822122098ca73ced262b80b97784b11db6681a4b9e49860f42fa351733fc677c558372264736f6c634300081b0033";

type SwiftMessageOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SwiftMessageOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SwiftMessageOracle__factory extends ContractFactory {
  constructor(...args: SwiftMessageOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _oracle: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_oracle, overrides || {});
  }
  override deploy(
    _oracle: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_oracle, overrides || {}) as Promise<
      SwiftMessageOracle & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SwiftMessageOracle__factory {
    return super.connect(runner) as SwiftMessageOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwiftMessageOracleInterface {
    return new Interface(_abi) as SwiftMessageOracleInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SwiftMessageOracle {
    return new Contract(address, _abi, runner) as unknown as SwiftMessageOracle;
  }
}
