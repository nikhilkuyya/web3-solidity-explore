//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Counter{

 int counter;
 event CounterUpdate(int counter);

 function increment() public {
  counter++;
  console.logInt(counter);
  emit CounterUpdate(counter);
 }

 function decrement() public {
  counter--;
  console.logInt(counter);
  emit CounterUpdate(counter);
 }
 
 function getCounter() public view returns(int) {
  return counter;
 }

}

