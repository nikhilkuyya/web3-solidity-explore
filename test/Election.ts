import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

async function deploy() {
    const Election = await ethers.getContractFactory("Election");
    const election = await Election.deploy();
    await election.deployed();
    return election;
}
describe("Election Test", function() {
  

  it("should deploy succes",async function(){
    const election = await deploy();
    expect(await election.candidatesCount()).to.equal(0);
  })
  
  it("should addCandidate Candidate",async function(){
    const election = await deploy();
    await election.addCandidate("nikhil");
    expect(await election.candidatesCount()).to.equal(1);
  });
})
