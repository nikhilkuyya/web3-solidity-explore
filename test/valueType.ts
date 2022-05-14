import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("ValueType", function () {

  async function deploy() {
    const ValueType = await ethers.getContractFactory("ValueType");
    const valueType = await ValueType.deploy();
    await valueType.deployed();
    return valueType;
  }

  it("test initial deployement", async function () {
    const valueType = await deploy();
    console.log('ValueType deployed at:'+ valueType.address);
    // msg address -> how to get the msg address.
    expect((await valueType.boolean())).to.equal(false);
  });

  it("valueType : LogicalAndOperation with true and true", async function () {
    const valueType = await deploy();
    expect((await valueType.logicalAndOperation(true,true))).to.equal(true);
  });

  it("valueType: logicalAndOperation : 1, 1 -> true",async function(){
    const valueType = await deploy();
    expect((await valueType.logicalAndOperation(1,1))).to.equal(true);
  })

  it("valueType: logicalAndOperation : -1, 0 -> false",async function(){
    const valueType = await deploy();
    expect((await valueType.logicalAndOperation(-1,0))).to.equal(false);
  })

  const valueTypeNotOperationObject = [
    {
      text: "valueType: notOperation : 1 -> false",
      input: 1,
      output: false
    },
    {
      text: "valueType: notOperation : -1 -> false",
      input: -1,
      output: false
    },
    {
      text: "valueType: notOperation : 0 -> true",
      input: 0,
      output: true
    },
  ];

  valueTypeNotOperationObject.forEach((valueTypeNotOperationObj) => {
    it(valueTypeNotOperationObj.text,async function(){
      const valueType = await deploy();
      expect((await valueType.notOperation(valueTypeNotOperationObj.input))).to.equal(valueTypeNotOperationObj.output);
    })
  })


});
