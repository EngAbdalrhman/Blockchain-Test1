// testing the contract and check everything is good before deploy to a network (once deployed can't return or edit the deployed version)
const { expect } = require("chai");
const { ethers } = require("hardhat");
// see coverage (hardhat coverage library prompt) to make test case
//const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
/* the same meaning
const chai = require("chai");
chai.expect
*/
/*
describe("Token Test", function () {
  it("Deployment should be assign the max_ico to the owner of the token", async function () {
    const [owner] = await ethers.getSigners();
    // console.log(`owner is ${owner}`);
    const TokenContract = await ethers.getContractFactory("Token"); // instance contract
    const hToken = await TokenContract.deploy(); // deploy contract
    const ownerBalance = await hToken.getBalance(owner.address);

    expect(await hToken.max_ico()).to.equal(ownerBalance);
  });

  it("Should Transfer amount of Token between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    //console.log(`owner is ${owner}`);
    const TokenContract = await ethers.getContractFactory("Token"); // instance contract
    const hToken = await TokenContract.deploy(); // deploy contract
    const ownerBalance = await hToken.getBalance(owner.address);
    await hToken.transfer(addr1.address, 100);
    expect(await await hToken.getBalance(addr1.address)).to.equal(100);

    // expect(await hToken.max_ico()).to.equal(ownerBalance + 100); check

    await hToken.connect(addr1).transfer(addr2.address, 30);
    expect(await await hToken.getBalance(addr2.address)).to.equal(30);
  });
});
*/
/*describe("Transfer Test", function () {
  it("Should Transfer amount of Token between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    //console.log(`owner is ${owner}`);
    const TokenContract = await ethers.getContractFactory("Token"); // instance contract
    const hToken = await TokenContract.deploy(); // deploy contract
    const ownerBalance = await hToken.getBalance(owner.address);
    await hToken.transfer(addr1.address, 100);
    expect(await await hToken.getBalance(addr1.address)).to.equal(100);

    // expect(await hToken.max_ico()).to.equal(ownerBalance + 100); check

    await hToken.connect(addr1).transfer(addr2.address, 30);
    expect(await await hToken.getBalance(addr2.address)).to.equal(30);
  });
});
*/
describe("Token Contract Init", function () {
  let TokenContract, owner, addr1, addr2, addrs, TContract, ownerBalance;

  beforeEach(async function () {
    TokenContract = await ethers.getContractFactory("Token"); // instance contract
    TContract = await TokenContract.deploy(); // deploy contract
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });
  describe("Deployment Test", function () {
    it("should be assign the max_ico to the owner of the token", async function () {
      ownerBalance = await TContract.getBalance(owner.address);
      expect(await TContract.max_ico()).to.equal(ownerBalance);
      expect(await TContract.i_owner()).to.equal(owner.address);
    });
  });

  describe("Transactions Test", function () {
    it("Should Transfer amount of Token between accounts", async function () {
      await TContract.transfer(addr1.address, 100);
      expect(await TContract.getBalance(addr1.address)).to.equal(100);

      // expect(await TContract.max_ico()).to.equal(ownerBalance + 100); check

      await TContract.connect(addr1).transfer(addr2.address, 30);
      expect(await TContract.getBalance(addr2.address)).to.equal(30);
    });
    it("Should fail if not enough amount of Token before transaction", async function () {
      await expect(
        TContract.connect(addr1).transfer(addr2.address, 130)
      ).to.be.revertedWith("Not Enough Tokens");
    });
    it("Should update balances of Token after transaction", async function () {
      await TContract.transfer(addr1.address, 100);
      const finalOwnerBalance = await TContract.getBalance(owner.address);
      //console.log(ownerBalance);
      //console.log(finalOwnerBalance);
      expect(finalOwnerBalance).to.equal(ownerBalance - 100);
    });
  });
});
