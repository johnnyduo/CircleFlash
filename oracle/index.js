const { ethers } = require('ethers');
const abi = require('./SwiftMessageOracle.json');

// Set up ethers provider to connect to the blockchain
const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');

// Oracle account to sign the verification and interact with the smart contract
const oraclePrivateKey = '0x333f7325f29176b98f2a3d2843214e67a8a83e3484b8c29879011cab4cb8d4ad';
const oracleWallet = new ethers.Wallet(oraclePrivateKey, provider);

// Smart contract address and ABI
const contractAddress = '0x0A9E017d22B39829F43E861E8C679D090ebbd2B7';
const contract = new ethers.Contract(contractAddress, abi, oracleWallet);

// Listening for the VerificationRequested event
async function listenForEvents() {
    contract.on('VerificationRequested', async (jobId, requester, swiftMessage) => {
        console.log(`Verification requested for Job ID: ${jobId}, SWIFT Message: ${swiftMessage}`);

        try {
            // Validate SWIFT Message using custom validation logic
            const isValid = validateSwiftMessage(swiftMessage);

            // Sign the verification result
            const messageHash = ethers.solidityPackedKeccak256(['uint256', 'bool'], [jobId, isValid]);
            const signature = await oracleWallet.signMessage(ethers.getBytes(messageHash));

            // Submit the verification result to the smart contract
            await submitVerification(jobId, isValid, signature);
        } catch (error) {
            console.error(`Error processing Job ID ${jobId}:`, error);
        }
    });
}

// Function to validate SWIFT message
function validateSwiftMessage(swiftMessage) {
    // // Custom logic to validate SWIFT message format
    // const swiftMessageRegex = /\{1:F01[A-Z0-9]{8}X{3}\d{10}\}\{2:I\d{3}[A-Z0-9]{8}X{0,3}\d*\}\{3:\{108:[A-Z0-9]{1,16}\}\}\{4:(.|)*-\}/;
    // const isValidFormat = swiftMessageRegex.test(swiftMessage);

    // if (!isValidFormat) {
    //     return false;
    // }

    // // Additional logic to verify specific fields if needed
    // // Example: Check if the amount is positive, or if the SWIFT code matches certain criteria
    // const fields = extractFields(swiftMessage);
    // if (!fields[":32A:"] || parseFloat(fields[":32A:"].amount) <= 0) {
    //     return false;
    // }

    return true;
}

// Function to extract fields from SWIFT message
function extractFields(swiftMessage) {
    const fields = {};
    const fieldRegex = /:(\d+[A-Z]*):([^:]+)(?=(\n:|-$))/g;
    let match;
    while ((match = fieldRegex.exec(swiftMessage)) !== null) {
        fields[match[1]] = match[2].trim();
    }
    return fields;
}

// Function to submit verification result to the smart contract
async function submitVerification(jobId, verified, signature) {
    try {
        const tx = await contract.submitVerification(jobId, verified, signature);
        const receipt = await tx.wait();
        console.log(`Verification result for Job ID ${jobId} submitted. Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
        console.error(`Error submitting verification for Job ID ${jobId}:`, error);
    }
}

// Start listening for events
listenForEvents();