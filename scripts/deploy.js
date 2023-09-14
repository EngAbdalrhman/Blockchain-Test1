const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  TokenContract = await ethers.getContractFactory("Token"); // instance contract
  token = await TokenContract.deploy(); // deploy contract
  console.log(token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
