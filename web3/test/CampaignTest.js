const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Campaign", () => {

    let campaign, deployer, receiver, transaction, result, signer;

    beforeEach(async () => {
        const Campaign = await ethers.getContractFactory("Campaign");
        campaign = await Campaign.deploy();
        await campaign.deployed();

        [deployer, receiver, signer] = await ethers.getSigners();

        const goal = ethers.utils.parseEther('2');
        transaction = await campaign.connect(deployer).createCampaign('Open Knowledge', 'This image represents the spirit of open-source information, symbolized by the Wikipedia logo. It highlights the collaborative nature of global knowledge sharing.', 'https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco', goal, 7);
        result = await transaction.wait();
    });

    describe("createCampaign", () => {


        describe("success", async () => {
            let currentTimestamp, durationInSeconds, durationInDays;
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
                expect(campaignData.goal).to.be.equal(ethers.utils.parseEther('2'));
                expect(campaignData.raised).to.be.equal(0);
                expect(campaignData.withdrawn).to.be.equal(false);
                expect(campaignData.active).to.be.equal(true);
                expect(campaignData.deadline).to.be.equal(currentTimestamp + durationInSeconds)

            })

            it("emit campaign created event", async () => {

                const event = result.events[0];
                const args = event.args;
                expect(event.event).to.be.equal('CampaignCreated');
                expect(args.id).to.be.equal(1);
                expect(args.title).to.be.equal('Open Knowledge');
                expect(args.description).to.be.equal('This image represents the spirit of open-source information, symbolized by the Wikipedia logo. It highlights the collaborative nature of global knowledge sharing.');
                expect(args.imageUrl).to.be.equal('https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco');
                expect(args.creator).to.be.equal(deployer.address);
                expect(args.goal).to.be.equal(ethers.utils.parseEther('2'));
                expect(args.raised).to.be.equal(0);
                expect(args.withdrawn).to.be.equal(false);
                expect(args.active).to.be.equal(true);
                expect(args.deadline).to.be.equal(currentTimestamp + durationInSeconds)
            })
        })

        describe("failure", () => {
            it("handel goal failure", async () => {
                await expect(campaign.connect(deployer).createCampaign('Open Knowledge', 'This image represents the spirit of open-source information, symbolized by the Wikipedia logo. It highlights the collaborative nature of global knowledge sharing.', 'https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco', 0, 7)).to.be.reverted;
            })

            it("handel duration failure", async () => {
                await expect(campaign.connect(deployer).createCampaign('Open Knowledge', 'This image represents the spirit of open-source information, symbolized by the Wikipedia logo. It highlights the collaborative nature of global knowledge sharing.', 'https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco', ethers.utils.parseEther('2'), 0)).to.be.reverted;
            })


        })


    })


    describe("donate", () => {


        describe("success", async () => {
            let currentTimestamp, durationInSeconds, durationInDays;
            beforeEach(async () => {

                // Get current block timestamp
                const blockNum = await ethers.provider.getBlockNumber();
                const block = await ethers.provider.getBlock(blockNum);
                currentTimestamp = block.timestamp;
                durationInDays = 7;
                durationInSeconds = durationInDays * 24 * 60 * 60;

            })

            it("donate ETH", async () => {
                const donationAmount = await ethers.utils.parseEther("1.0");
                await campaign.connect(signer).donate(1, { value: donationAmount });


                const campaignData = await campaign.campaigns(1);
                expect(campaignData.raised).to.be.equal(donationAmount);
                expect(await campaign.getcontributions(1, signer.address)).to.equal(donationAmount)
            })

            it("emit Donate event", async () => {
                const donationAmount = await ethers.utils.parseEther("1.0");
                transaction = await campaign.connect(signer).donate(1, { value: donationAmount });
                result = await transaction.wait();

                const event = result.events[0];
                const args = event.args;
                expect(event.event).to.be.equal('Donate');
                expect(args.id).to.be.equal(1);
                expect(args.donor).to.be.equal(signer.address);
                expect(args.value).to.be.equal(ethers.utils.parseEther('1'));

            })
        })

        describe("failure", () => {
            let donationAmount;
            beforeEach(async () => {
                donationAmount = await ethers.utils.parseEther("1.0");
            })
            it("handel id failure", async () => {
                await expect(campaign.connect(signer).donate(10, { value: donationAmount })).to.be.reverted;
            })

            it("handel donation failure", async () => {
                donationAmount = await ethers.utils.parseEther("0");
                await expect(campaign.connect(signer).donate(1, { value: donationAmount })).to.be.reverted;
            })


            it("handel campaign active failure", async () => {
                // First, deactivate the campaign
                await campaign.deactivateCampaign(1);


                await expect(
                    campaign.connect(signer).donate(1, { value: donationAmount })
                ).to.be.reverted;
            })

            it("handel deadline failure", async () => {

                // Fast forward time by 8 days
                await network.provider.send("evm_increaseTime", [8 * 24 * 60 * 60]);
                await network.provider.send("evm_mine");

                await expect(
                    campaign.connect(signer).donate(1, { value: donationAmount })
                ).to.be.reverted;
            })

            it("handel sender failure", async () => {
                await expect(campaign.connect(deployer).donate(1, { value: donationAmount })).to.be.reverted;
            })
        })


    })


})