import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello world: Contract", function(){
  
 it("should say hi",async function(){
   // 1. setup -> adding the imports	
   // 2. deploy our contract
   const HelloWorld = await ethers.getContractFactory("HelloWorld");
   const hello = await HelloWorld.deploy();
   await hello.deployed();
   expect(await hello.hello()).to.equal("Hello, World!")
  });

});
