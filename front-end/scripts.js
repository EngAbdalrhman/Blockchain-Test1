"use strict";

import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constant.js";

const connectButton = document.querySelector(".btn_connect");
const transferTokensButton = document.querySelector(".btn_transfer");
const RequestButton = document.querySelector(".btn_request");
const balanceButton = document.querySelector(".btn_balance");
const addressButton = document.querySelector(".btn_address");
// const balanceButton = document.getElementById("btn_balance")
connectButton.onclick = connect;
transferTokensButton.onclick = transferTokens;
balanceButton.onclick = getBalance;
RequestButton.onclick = Request;
addressButton.onclick = checkAddress;
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    // connectButton.innerHTML = "Please install MetaMask"
    alert("Please install MetaMask");
  }
}

async function checkAddress() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // console.log("my address :" + (await signer.getAddress()));

    try {
      document.querySelector(".r").textContent = await signer.getAddress();
    } catch (error) {
      console.log(error);
    }
  } else {
    // transferTokensButton.innerHTML = "Please install MetaMask"
    alert("Please install MetaMask");
  }
}

async function transferTokens() {
  console.log(`transfering...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const amount = parseInt(document.querySelector(".Amount").value);
    const addr2 = document.querySelector(".to-address").value;
    try {
      const transfer = await contract.transfer(addr2, amount); // .connect(signer)
      console.log("transfer = " + transfer);
      /* const transactionResponse = await contract.transfer();
      await listenForTransactionMine(transactionResponse, provider);
      await transactionResponse.wait(1);*/
      getBalance();
    } catch (error) {
      console.log(error);
    }
  } else {
    // transferTokens.innerHTML = "Please install MetaMask"
    alert("Please install MetaMask");
  }
}

async function Request() {
  console.log(`funding...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // rpc
    const w_owner = new ethers.Wallet(
      "5b5c78d24d7412f8262ac2a4e4ae2fdf3dc881f2ca547f51fa9e3a1d20cb9dc0",
      provider
    );
    console.log("owner" + w_owner);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // console.log(provider.getSigner());
    // console.log("my address :" + (await signer.getAddress()));
    // const i_owner = "0xe2e45dadf43d0a83bf945688afba99f1eb03750a";
    // const owner_sign = [object Object];
    const contract = new ethers.Contract(contractAddress, abi, signer);
    // console.log("contract : " + contract);
    const amount = parseInt(document.querySelector(".Amount").value);
    // console.log(amount);
    try {
      // const i_owner = await contract.i_owner(); // need signer not address
      //console.log("owner : " + i_owner);
      const transfer = await contract
        .connect(w_owner)
        .transfer(await signer.getAddress(), amount);
      console.log("transfer = " + transfer);
      getBalance();
    } catch (error) {
      console.log(error);
    }
  } else {
    // transferTokensButton.innerHTML = "Please install MetaMask"
    alert("Please install MetaMask");
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      // const balance = await provider.getBalance(await signer.getAddress());
      const balance = await contract.getBalance(await signer.getAddress());
      // console.log(ethers.utils.formatEther(balance));
      document.querySelector(".r").textContent = balance;
    } catch (error) {
      console.log(error);
    }
  } else {
    // balanceButton.innerHTML = "Please install MetaMask";
    alert("Please install MetaMask");
  }
}
/*
function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
*/
