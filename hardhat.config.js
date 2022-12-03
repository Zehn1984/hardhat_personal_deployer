require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

module.exports = {

  defaultNetwork: "mumbai",

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
    // BSC Mainnet
    bsc: {
      url: process.env.BSC_TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },

  etherscan: {
    // Mesma key para mainnet e testnet
    // apiKey: process.env.BSCSCAN_API_KEY
    apiKey: process.env.POLYGONSCAN_API_KEY
  },

  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
  
}