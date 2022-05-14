//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


contract BooleanOperators {

    function logicalAndOperation(bool op1,bool op2) public pure returns(bool) {
        return op1 && op2;
    }

    function logicalOrOperation(bool op1, bool op2) public pure returns(bool) {
        return op1 || op2;
    }

    function notOperation(bool op1) public pure returns(bool) {
        return !op1;
    }

    function isEqualOperation(bool op1, bool op2) public pure returns(bool) {
        return op1 == op2;
    }

    function isNotEqualOperation(bool op1,bool op2) public pure returns(bool){
        return op1 != op2;
    }
}

contract ValueType is BooleanOperators {

    int public integer;
    uint public postiveInteger;
    bool public boolean;
        
}

