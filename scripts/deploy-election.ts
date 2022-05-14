import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
 const Election = await ethers.getContractFactory("Election");
 const election = await Election.deploy();
 await election.deployed();
 return election;
}

deploy().then(() => { console.log("hello world election"); }).catch(console.error);
