require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    sonicTestnet: {
      url: process.env.SONIC_TESTNET_RPC,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      chainId: 14601
    }
  }
};
