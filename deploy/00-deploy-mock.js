const getNameAccounts = require("hardhat")
const {DECIMAL, INIT_ANSER, developmentChains, networkConfig, LOCK_TIME} = require("../properties")

module.exports = async({getNamedAccounts, deployments})=>{
    console.log(`development chains: ${JSON.stringify(developmentChains)}, network name:${network.name}`)
    if(developmentChains.includes(network.name)){
        const firstAccount = (await getNamedAccounts()).firstAccount
        const {deploy} = deployments
        await deploy("MockV3Aggregator",{
            from:firstAccount,
            args:[8,300000000000],
            log:true,
        })
    }else{
        console.log("not local environment")
    }
}

module.exports.tags = ["mock", "all"]