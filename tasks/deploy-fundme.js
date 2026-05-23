const {task} = require("hardhat/config")

task("deploy-fundme").setAction(async (taskArgs, href) =>{
    const ethers = href.ethers
    console.log("start deploy fundme")
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("generate contract")
    const fundMe = await fundMeFactory.deploy(180);
    console.log("fund me deploy, wait finish")
    await fundMe.waitForDeployment();
    console.log(`fund me deployed to: ${fundMe.target}`);
    if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
        console.log(`fund me wait 6`);
        await fundMe.deploymentTransaction().wait(6);
        await hre.run("verify:verify",{
            address: fundMe.target,
            constructorArguments:[180]
        });
    }else{
        console.log("run hardhat")
    }
})

module.exports = task("deploy-fundme")