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

  // etherscan: {apiKey: process.env.POLYGONSCAN_API_KEY},

  etherscan: {
    apiKey: {
      matic: process.env.POLYGONSCAN_API_KEY,
      mumbai: process.env.POLYGONSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
    },
    customChains: [
      {
        network: "matic",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com/"
        }
      },
      {
        network: "mumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com/"
        }
      },
      {
        network: "bsc",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com/"
        }
      }
    ]
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