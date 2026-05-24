const DECIMAL = 8
const INIT_ANSWER = 1000
const developmentChains = ["hardhat", "local"]
const LOCK_TIME = 180
const CONFIRMATION_NUMBER = 5
const INCREASE_TIME = 200

const networkConfig = {
    11155111:{
        ethUsdDataFeed:"0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}

module.exports={DECIMAL, INIT_ANSWER, developmentChains, networkConfig, LOCK_TIME, CONFIRMATION_NUMBER, INCREASE_TIME}