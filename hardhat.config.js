require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    // Matic Mainnet
    matic: {
      url: process.env.MATIC_MAINNET_ALCHEMY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    // Matic Testnet
    mumbai: {
      url: process.env.MATIC_TESTNET_ALCHEMY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },        
  },
  etherscan: {
    // eh a mesma key para mainnet e testnet
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}