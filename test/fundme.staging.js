const {ethers} = require("hardhat")
const {assert} = require("chai")
const {helpers,expect} = require("@nomicfoundation/hardhat-network-helpers");
const {INCREASE_TIME, networkConfig, developmentChains} = require("../properties")

developmentChains.includes(network.name)
? describe.skip
: describe("Fund me staging test", async function(){
    let fundMe
    let account
    beforeEach(async function(){
        await deployments.fixture(["all"])
        account = (await getNamedAccounts()).firstAccount
        const fundMeDeployment = await deployments.get("FundMe");
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)
    })

    it("Staging test get fund", async function(){
        console.log("Staging test get fund start")
        await fundMe.fund({value: ethers.parseEther("0.01")});
        console.log("Staging test finish fund")
        await new Promise(resolve => setTimeout(resolve, 190000))
        console.log("Staging test finish wait")
        const fundTx = await fundMe.getFund();
        console.log("Staging test finish get fund")
        const fundFinish = await fundTx.wait();
        console.log("Staging test finish getFund wait")
        expect(fundFinish).to.be.emit(fundMe, "GetFundEvent").withArgs(ethers.parseEther("0.01"))
    })
})