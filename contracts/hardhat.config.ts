import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://rpc2.sepolia.org`,
      accounts: ['bd0cef31fef0e40085b0f2801744057feb0a6b3d3a7d96d01eac0c08eea2e596']
    }
  }
};

export default config;
