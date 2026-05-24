const getNameAccounts = require("hardhat")
const {developmentChains, networkConfig, LOCK_TIME, CONFIRMATION_NUMBER} = require("../properties")
module.exports = async({getNamedAccounts, deployments})=>{
    const firstAccount = (await getNamedAccounts()).firstAccount
    const {deploy} = deployments
    let dataFeed
    let confirmationNumber
    if(developmentChains.includes(network.name)){
        const mockContract = await deployments.get("MockV3Aggregator")
        dataFeed = mockContract.address
        confirmationNumber = 0
    }else{
        dataFeed = networkConfig[network.config.chainId].ethUsdDataFeed
        confirmationNumber = CONFIRMATION_NUMBER
    }
    const fundMeConstract = await deploy("FundMe",{
        from:firstAccount,
        args:[LOCK_TIME, dataFeed],
        log:true,
        waitConfirmations:confirmationNumber
    })
    console.log(`firstAccount:${firstAccount}`)

    if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
        console.log(`fund me verify start`);
        await hre.run("verify:verify",{
            address: fundMeConstract.address,
            constructorArguments:[LOCK_TIME, dataFeed]
        });
    }else{
        console.log("run hardhat")
    }
}

module.exports.tags = ["fundme", "all"]