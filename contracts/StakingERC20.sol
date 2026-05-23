// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract StakingERC20 is ERC20{
    constructor(uint256 amount) ERC20("Staking Token", "ST"){
        _mint(msg.sender, amount);
    }

    function _min(address addr,uint256 amount) public {
        _mint(addr, amount);
    }
    //1000000000000000000000
}