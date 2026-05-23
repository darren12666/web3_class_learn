// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract RewardERC20 is ERC20{
    constructor(uint256 amount) ERC20("Reward Token", "RWT"){
        _mint(msg.sender, amount);
    }

    function _min(address addr,uint256 amount) public {
        _mint(addr, amount);
    }
}