// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract StakingRewardContract {
    IERC20 public stakerToken;
    IERC20 public rewardToken;

    address public owner;
    uint256 public duration;
    uint256 public finishAt;
    uint256 public updateAt;

    uint256 public rewardRate; // 每秒收益率
    uint256 public rewardPerToken; // 每个质押Tocken的收益
    mapping(address => uint256) public userRewardPerToken; // 用户质押Token的收益率
    uint256 public totalSupply;// 总质押量

    mapping(address => uint256) public userStaks;// 质押Token
    mapping(address => uint256) public userRewards;// 用户收益

    constructor(address _StakerToken, address _RewardToken) {
        stakerToken = IERC20(_StakerToken);
        rewardToken = IERC20(_RewardToken);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    function setDuration(uint _duration) public onlyOwner {
        require(_duration > 0, "Duration must be greater than 0");
        duration = _duration;
    }

    function setRewardAmount(uint256 _amount) public onlyOwner calculateReward(address(0)) {
        require(_amount > 0, "Reward amount must be greater than 0");
        if (block.timestamp > finishAt) {
            rewardRate = _amount / duration;
        } else {
            rewardRate =
                (_amount + (finishAt - block.timestamp) * rewardRate) /
                duration;
        }
        require(
            rewardRate * duration <= rewardToken.balanceOf(address(this)),
            "Reward amount greater than total amount"
        );
        finishAt = block.timestamp + duration;
        updateAt = block.timestamp;
    }

    function stake(uint256 amount) public  calculateReward(msg.sender) {
        require(amount > 0, "Stark amount must be greater than 0");
        userStaks[msg.sender] += amount;
        totalSupply += amount;
        stakerToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) public  calculateReward(msg.sender) {
        require(amount > 0, "Withdraw amount must be greater than 0");
        userStaks[msg.sender] -= amount;
        totalSupply -= amount;
        stakerToken.transfer(msg.sender, amount);
    }

    function getReward() public  calculateReward(msg.sender) {
        uint256 amount = userRewards[msg.sender];
        require(amount > 0, "Remark amount must be greater than 0");
        userRewards[msg.sender] = 0;
        rewardToken.transfer(msg.sender, amount);
    }

    modifier calculateReward(address _addr) {
        if(totalSupply > 0){
            rewardPerToken += rewardRate * (_min(finishAt, block.timestamp) - block.timestamp) * 1e18/totalSupply ;
        }
        updateAt = _min(finishAt, block.timestamp);
        if(_addr == address(0)){
            userRewardPerToken[_addr] = rewardPerToken;
            userRewards[_addr] = earn(_addr);
        }
        _;
    }

    function earn(address _addr) public view returns(uint256){
        return userRewards[_addr]  + (rewardPerToken - userRewardPerToken[_addr]) *  userStaks[_addr] / 1e18;
    }

    function _min(uint256 _x, uint256 _y) private pure returns(uint256){
        return _x >= _y ? _y : _x;
    }
}
