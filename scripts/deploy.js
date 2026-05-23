//import ether.js

const {ethers} = require("hardhat");

async function main(){
    const stakTokenContract = await ethers.getContractFactory("StakingERC20");
    const stakToken = await stakTokenContract.deploy(ethers.parseEther("1000"));
    await stakToken.waitForDeployment();
    const rewardTokenContract = await ethers.getContractFactory("RewardERC20");
    const rewardToken = await rewardTokenContract.deploy(ethers.parseEther("1000"));
    await rewardToken.waitForDeployment();
    const deployer = await ethers.getContractFactory("StakingRewardContract");
    const starkingReward = await deployer.deploy(stakToken.target, rewardToken.target);
    await starkingReward.waitForDeployment();
    console.log(`Starking contract address: ${stakToken.target}, Reward contract address:${rewardToken.target}, stakingReward contract address: ${starkingReward.target} `);
}

main().then().catch((error) => {
    console.error(error)
    process.exit(1);
})