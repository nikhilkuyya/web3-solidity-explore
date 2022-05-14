//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SimpleBank {

    address public minter;
    mapping(address => uint256) public balances;
    event Sent(address from, address to,uint256 amount);
    error InSufficientBalance(uint256 requested, uint balance);

    constructor() {
        minter = msg.sender;
    }

    function mint(address receiver, uint256 amount) public {
        require(msg.sender == minter);
        balances[receiver] += amount;
    }

    function transfer(address to,uint256 amount) public {
        if(balances[msg.sender] < amount) {
            revert InSufficientBalance({
                requested: amount,
                balance: balances[msg.sender]
            });
        }

        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Sent(msg.sender,to,amount);
    }
}
