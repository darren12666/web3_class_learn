require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();
require("./tasks/deploy-fundme")
require("hardhat-deploy")

const SEPOLIA_URL = process.env.SEPOLIA_URL
const SEPOLIA_ACCOUNTS = process.env.SEPOLIA_ACCOUNTS
const SEPOLIA_ACCOUNTS_2 = process.env.SEPOLIA_ACCOUNTS_2
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url: SEPOLIA_URL,
      accounts:[SEPOLIA_ACCOUNTS, SEPOLIA_ACCOUNTS_2],
      chainId:11155111
    }
  },
  etherscan:{
    apiKey: ETHERSCAN_API_KEY,
    timeout: 120000,
    requestConfig: {
      proxy: {
        host: "172.23.96.1",
        port: 7897,
        protocol: "http"
      }
    }
  },
  namedAccounts:{
    firstAccount:{
      default:0
    },
    secondAccount:{
      default:1
    }
  },
  gasReporter:{
    enabled: true,
  },
  mocha:{
    timeout: 600000
  },
  sourcify: {
    enabled: false
  }
};
