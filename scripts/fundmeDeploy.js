const {ethers} = require("hardhat")

async function main(){
    console.log("start deploy fundme")
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("generate contract")
    const fundMe = await fundMeFactory.deploy(3600);
    console.log("fund me deploy, wait finish")
    await fundMe.waitForDeployment();
    console.log(`fund me deployed to: ${fundMe.target}`);
    if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
        console.log(`fund me wait 6`);
        await fundMe.deploymentTransaction().wait(6);
        await hre.run("verify:verify",{
            address: fundMe.target,
            constructorArguments:[10]
        });
    }else{
        console.log("run hardhat")
    }
    console.log(`fund me get signer`);
    const [firstAccount, secondAccount] = await ethers.getSigners();
    const fundFun = await fundMe.fund({value: ethers.parseEther("0.1")});
    await fundFun.wait();
    const firstAccountFundBalance = await ethers.provider.getBalance(fundMe.target);
    console.log(`fund balance: ${firstAccountFundBalance}` );

    const secondFundFun = await fundMe.connect(secondAccount).fund({value: ethers.parseEther("0.1")});
    await secondFundFun.wait();
    const secondAccountFundBalance = await ethers.provider.getBalance(fundMe.target);
    console.log(`fund balance: ${secondAccountFundBalance}` );

    const firstAccountBalance = await fundMe.fundersToAmount(firstAccount.address);
    const secondAccountBalance = await fundMe.fundersToAmount(secondAccount.address);
    console.log(`first account balance: ${firstAccountBalance}, second account balance: ${secondAccountBalance}` );
}

main().then().catch((error)=>{
    console.error(error)
    process.exit(1)
})