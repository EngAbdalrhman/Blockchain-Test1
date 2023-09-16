const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  TokenContract = await ethers.getContractFactory("Token"); // instance contract , could pass abi after compile , binary, signer
  token = await TokenContract.deploy(); // deploy contract
  await token.deployTransaction.wait(1); // confirmation block
  console.log(token.address); // contract address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
