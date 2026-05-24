const {ethers} = require("hardhat")
const {assert} = require("chai")
const {helpers,expect} = require("@nomicfoundation/hardhat-network-helpers");
const {INCREASE_TIME, networkConfig, developmentChains} = require("../properties")


!developmentChains.includes(network.name)
 ? describe.skip
 : describe("Fund me unit test", async function(){
    let fundMe
    let account
    let mockV3Aggregator
    beforeEach(async function(){
        await deployments.fixture(["all"])
        account = (await getNamedAccounts()).firstAccount
        const fundMeDeployment = await deployments.get("FundMe");
        mockV3Aggregator = await deployments.get("MockV3Aggregator")
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)
    })

    // it("test msg.sender", async function(){
    //     const dataFeed = networkConfig[network.config.chainId].ethUsdDataFeed
    //     const [account] = await ethers.getSigners();
    //     const fundMeFactory = await ethers.getContractFactory("FundMe");
    //     const fundMe = await fundMeFactory.deploy(180, dataFeed);
    //     await fundMe.waitForDeployment();
    //     assert.equal((await fundMe.owner()), account.address)
    // })
    //
    // it("test dataFeed value", async function(){
    //     const dataFeed = networkConfig[network.config.chainId].ethUsdDataFeed
    //     const fundMeFactory = await ethers.getContractFactory("FundMe");
    //     const fundMe = await fundMeFactory.deploy(180, dataFeed);
    //     await fundMe.waitForDeployment();
    //     const valuefeed = await fundMe.dataFeed();
    //     console.log(`datafedd:${valuefeed}, constant value:0x694AA1769357215DE4FAC081bf1f309aDC325306`)
    //     assert.equal((await fundMe.dataFeed()), mockV3Aggregator.address)
    // })

    it("easy test msg.sender", async function(){
        assert.equal((await fundMe.owner()), account)
    })

    it("easy test dataFeed value", async function(){
        const valuefeed = await fundMe.dataFeed();
        // 分环境断言
        if(developmentChains.includes(network.name)){
            // 本地开发链：断言等于Mock地址
            assert.equal(valuefeed, mockV3Aggregator.address)
        }else{
            // 公网链：断言等于真实预言机地址
            assert.equal(valuefeed, networkConfig[network.config.chainId].ethUsdDataFeed)
        }
    })

    // it("test window closed", async function(){
    //     // 所有helpers方法前面加await
    //     await helpers.time.increase(INCREASE_TIME)
    //     await helpers.mine()
    //     // 测试revert必须在expect前加await
    //     await helpers.expect(fundMe.fund({value: ethers.parseEther("0.1")})).to.be.revertedWith("window is closed")
    // })
})