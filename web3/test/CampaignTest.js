const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Campaign", () => {

    let campaign, deployer, receiver;

    beforeEach(async () => {
        const Campaign = await ethers.getContractFactory("Campaign");
        campaign = await Campaign.deploy();
        await campaign.deployed();

        [deployer, receiver] = await ethers.getSigners();
    });

    describe("createCampaign", () => {
        let transaction, result;
        beforeEach(async () => {
            transaction = await campaign.createCampaign('Open Knowledge', 'This image represents the spirit of open-source information, symbolized by the Wikipedia logo. It highlights the collaborative nature of global knowledge sharing.', 'https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco', 2, 7);
            result = await transaction.wait();
            //   console.log(result.events[0].args)
        })

        describe("success", async () => {
            let currentTimestamp,durationInSeconds,durationInDays;
            beforeEach(async () => {
                // Get current block timestamp
                const blockNum = await ethers.provider.getBlockNumber();
                const block = await ethers.provider.getBlock(blockNum);
                currentTimestamp = block.timestamp;
                 durationInDays = 7;
                 durationInSeconds = durationInDays * 24 * 60 * 60;


            })

            it("should order campaigns creation proper", async () => {
                
                const campaignData = await campaign.campaigns(1);
                expect(campaignData.id).to.be.equal(1);
                expect(campaignData.title).to.be.equal('Open Knowledge');
                expect(campaignData.description).to.be.equal('This image represents the spirit of open-source information, symbolized by the Wikipedia logo. It highlights the collaborative nature of global knowledge sharing.');
                expect(campaignData.imageUrl).to.be.equal('https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco');
                expect(campaignData.creator).to.be.equal(deployer.address);
                expect(campaignData.goal).to.be.equal(2);
                expect(campaignData.raised).to.be.equal(0);
                expect(campaignData.withdrawn).to.be.equal(false);
                expect(campaignData.active).to.be.equal(true);
                expect(campaignData.deadline).to.be.equal(currentTimestamp + durationInSeconds)

            })

            it("emit campaign created event", async () => {
              
                const event = result.events[0];
                const args = event.args;
                expect(args.id).to.be.equal(1);
                expect(args.title).to.be.equal('Open Knowledge');
                expect(args.description).to.be.equal('This image represents the spirit of open-source information, symbolized by the Wikipedia logo. It highlights the collaborative nature of global knowledge sharing.');
                expect(args.imageUrl).to.be.equal('https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco');
                expect(args.creator).to.be.equal(deployer.address);
                expect(args.goal).to.be.equal(2);
                expect(args.raised).to.be.equal(0);
                expect(args.withdrawn).to.be.equal(false);
                expect(args.active).to.be.equal(true);
                expect(args.deadline).to.be.equal(currentTimestamp + durationInSeconds)
            })
        })

        describe("failure", () => {

        })
    })
})