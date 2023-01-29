// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Karma is ERC20 {
    mapping (address => uint256) public give_block;
    address[] public users;
    address init;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        init = msg.sender;
    }
    
    // Karma is non-transferrable
    function transfer(address recipient, uint256 amount) public override returns (bool) {return false;}
    function approve(address spender, uint256 amount) public override returns (bool) {return false;} 
    function increaseAllowance(address spender, uint256 addedValue) public override returns (bool) {return false;}
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {return false;}

    function register() public returns (bool) {
        if (registered()) {
            return false;
        }
        users.push(msg.sender);
    }

    function registered() public view returns (bool) {
        for(uint i = 0; i < users.length; i++) {
            if (users[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function leader() public view returns (address) {
        address lead = address(0);
        uint max = 0;
        for(uint i = 0; i < users.length; i++) {
            if (balanceOf(users[i]) > max) {
                lead = users[i];
                max = balanceOf(users[i]);
            }
        }
        return lead;
    }

    function upVote(address recipient) public returns (bool) {
        // allow one upVote per block
        assert(give_block[msg.sender] != block.number);
        give_block[msg.sender] = block.number;

        // give recipient one Karma
        _mint(recipient, 1 * 10 ** uint(decimals()));

        return true;
    }

    function penalize(address recipient) public returns (bool) {
        assert(msg.sender == recipient);
        assert(balanceOf(msg.sender) >= 1 * 10 ** uint(decimals()));
        _transfer(msg.sender, init, 1 * 10 ** uint(decimals()));
        return true;
    }

}
