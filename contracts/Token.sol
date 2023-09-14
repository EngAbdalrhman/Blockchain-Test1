// SPDX-License-Identifier: MIT-License
pragma solidity >=0.8.19;

// Uncomment this line to use console.log
import "hardhat/console.sol";
error NOT_ENOUGH_TOKENS();

contract Token {
    uint public max_ico = 100000;
    address public immutable i_owner; // payable
    mapping(address => uint) balance;

    constructor() {
        balance[msg.sender] = max_ico;
        i_owner = msg.sender;
        /* require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        max_ico = _unlockTime;
        owner = payable(msg.sender);*/
    }

    // revert("NOT_ENOUGH_TOKENS")
    modifier check_balance(uint amount) {
        require(balance[msg.sender] >= amount, "Not Enough Tokens");
        _;
    }

    function transfer(address to, uint amount) external check_balance(amount) {
        // console.log(balance[msg.sender]);
        balance[msg.sender] -= amount;
        console.log(
            "** Sending %s tokens from address %s to address %s **",
            amount,
            msg.sender,
            to
        );
        balance[to] += amount;
        console.log(
            "** sender Balance is %s and Reciver Balance is %s **",
            balance[msg.sender],
            balance[to]
        );
    }

    function getBalance(address account) external view returns (uint) {
        return balance[account];
    }
}
