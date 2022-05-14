//SPDX-License-Identifier: MIT
// Software Package Developement Exchange
pragma solidity ^0.8.0;

contract HelloWorld {

 // declartaion of function name 
 // which state visibility public
 // state modifier 
 // returns(type datalocation)
 function hello() public pure returns(string memory) {
  return "Hello, World!";
 }

}
