import { config as dotenv } from "dotenv"
dotenv()
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const accounts = [process.env.PRIVATE_KEY!]

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts,
    }
  },
};

export default config;
