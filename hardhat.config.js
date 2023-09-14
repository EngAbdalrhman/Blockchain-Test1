// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const Sepolia_PRIVATE_KEY = process.env.wallet_private_sign_key;
const Alckmey_api = `https://eth-sepolia.g.alchemy.com/v2/${process.env.Alchemy_Private_KEY}`;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `${Alckmey_api}`,
      accounts: [`${Sepolia_PRIVATE_KEY}`],
    },
  },
};
