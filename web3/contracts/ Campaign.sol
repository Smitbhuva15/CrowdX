// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "hardhat/console.sol";

/**
 * @title Campaign
 * @author Smit Bhuva
 * @dev A crowdfunding contract that allows users to create campaigns, donate ETH, withdraw funds if the goal is met, or refund donors if the campaign fails.
 */
contract Campaign {

    uint256 CampaignCount = 0;

    /**
     * @dev Struct representing a campaign.
     */
    struct Campaigns {
        uint256 id;
        address creator;
        string title;
        string description;
        string imageUrl;
        uint256 goal;
        uint256 raised;
        uint256 deadline;
        bool withdrawn;
        bool active;
    }

    ////////////////////////// MAPPINGS /////////////////////////////

    // Maps campaign ID to Campaign struct
    mapping(uint => Campaigns) public campaigns;

    // Maps campaign ID => donor address => contribution amount
    mapping(uint256 => mapping(address => uint256)) public contributions;

    ////////////////////////// ERRORS ///////////////////////////////

    error goalmustBeGreaterThanZero();
    error durationmustBeGreaterThanZero();
    error campaignNotFound();
    error paymustBeGreaterThanZero();
    error sendermustBeValid();
    error campaignIsNotActive();
    error timeStampExceeded();
    error sendermustdifferentToCreator();
    error amoutMustbValid();
    error fundsalreadyWithdrawn();
    error sendermustbeSameasCreator();
    error fundgoalnotmet();
    error campaignNotEndedYet();
    error donationsNotFound();
    error fundgoalmet();

    ////////////////////////// EVENTS ///////////////////////////////

    event CampaignCreated(
        uint256 id,
        address creator,
        string title,
        string description,
        string imageUrl,
        uint256 goal,
        uint256 raised,
        uint256 deadline,
        bool withdrawn,
        bool active
    );

    event Donate(uint256 id, address donor, uint256 amount);
    event Withdraw(uint256 id, address creator, uint256 raised);
    event Refund(uint256 id, address donor, uint256 amount);

    /////////////////////// CREATE CAMPAIGN /////////////////////////

    /**
     * @notice Create a new fundraising campaign.
     * @param title Title of the campaign.
     * @param description Description of the campaign.
     * @param imageUrl Image URL representing the campaign.
     * @param goal Funding goal in wei.
     * @param durationinDay Duration in days.
     */
    function createCampaign(
        string memory title,
        string memory description,
        string memory imageUrl,
        uint256 goal,
        uint256 durationinDay
    ) public {
        if (goal <= 0) {
            revert goalmustBeGreaterThanZero();
        }
        if (durationinDay <= 0) {
            revert durationmustBeGreaterThanZero();
        }

        CampaignCount++;
        uint256 deadline = block.timestamp + (durationinDay * 1 days);

        campaigns[CampaignCount] = Campaigns(
            CampaignCount,
            msg.sender,
            title,
            description,
            imageUrl,
            goal,
            0,
            deadline,
            false,
            true
        );

        emit CampaignCreated(
            CampaignCount,
            msg.sender,
            title,
            description,
            imageUrl,
            goal,
            0,
            deadline,
            false,
            true
        );
    }

    /////////////////////// DONATE TO CAMPAIGN /////////////////////////

    /**
     * @notice Donate ETH to a specific campaign.
     * @param _id ID of the campaign.
     */
    function donate(uint256 _id) public payable {
        if (_id <= 0 || _id > CampaignCount) {
            revert campaignNotFound();
        }

        Campaigns storage c = campaigns[_id];

        if (msg.value <= 0) {
            revert paymustBeGreaterThanZero();
        }

        if (msg.sender == address(0)) {
            revert sendermustBeValid();
        }

        if (c.active == false) {
            revert campaignIsNotActive();
        }

        if (block.timestamp > c.deadline) {
            revert timeStampExceeded();
        }

        if (msg.sender == c.creator) {
            revert sendermustdifferentToCreator();
        }

        // Update raised amount
        c.raised += msg.value;

        // Record the donation
        contributions[_id][msg.sender] += msg.value;

        emit Donate(c.id, msg.sender, msg.value);
    }

    /////////////////////// WITHDRAW FUNDS /////////////////////////

    /**
     * @notice Allows campaign creator to withdraw funds if the campaign is successful.
     * @param _id ID of the campaign.
     */
    function withdrawFund(uint256 _id) public {
        if (_id <= 0 || _id > CampaignCount) {
            revert campaignNotFound();
        }

        Campaigns storage c = campaigns[_id];

        if (c.active == false) {
            revert campaignIsNotActive();
        }

        if (c.withdrawn == true) {
            revert fundsalreadyWithdrawn();
        }

        if (msg.sender != c.creator) {
            revert sendermustbeSameasCreator();
        }

        if (c.goal > c.raised) {
            revert fundgoalnotmet();
        }

        if (block.timestamp < c.deadline) {
            revert campaignNotEndedYet();
        }

        c.active = false;
        c.withdrawn = true;

        // Transfer funds to the creator
        (bool success, ) = payable(c.creator).call{value: c.raised}("");
        require(success, "Transaction Failed");

        emit Withdraw(c.id, c.creator, c.raised);
    }

    /////////////////////// REFUND DONORS /////////////////////////

    /**
     * @notice Refunds donors if campaign goal is not met after the deadline.
     * @param _id ID of the campaign.
     */
    function refund(uint256 _id) public {
        if (_id <= 0 || _id > CampaignCount) {
            revert campaignNotFound();
        }

        Campaigns storage c = campaigns[_id];

        if (block.timestamp < c.deadline) {
            revert campaignNotEndedYet();
        }

        if (c.goal < c.raised) {
            revert fundgoalmet();
        }

        uint256 amountToRefund = getcontributions(_id, msg.sender);
        if (amountToRefund == 0) {
            revert donationsNotFound();
        }

        // Refund the donor
        (bool success, ) = payable(msg.sender).call{value: amountToRefund}("");
        require(success, "Transaction Failed");

        // Reset their contribution
        contributions[_id][msg.sender] = 0;

        emit Refund(_id, msg.sender, amountToRefund);
    }

    /////////////////////// HELPER (TEST) /////////////////////////

    /**
     * @dev Test-only helper to deactivate a campaign.
     */
    function deactivateCampaign(uint256 _id) public {
        campaigns[_id].active = false;
    }

    /////////////////////// GETTERS /////////////////////////

    /**
     * @notice Get total contribution by a user to a campaign.
     * @param _id Campaign ID.
     * @param user Address of contributor.
     */
    function getcontributions(
        uint256 _id,
        address user
    ) public view returns (uint256) {
        return contributions[_id][user];
    }

    /**
     * @notice Get full campaign details.
     * @param _id Campaign ID.
     */
    function getCampaign(
        uint256 _id
    )
        public
        view
        returns (
            uint256 id,
            address creator,
            string memory title,
            string memory description,
            string memory imageUrl,
            uint256 goal,
            uint256 raised,
            uint256 deadline,
            bool withdrawn,
            bool active
        )
    {
        Campaigns storage c = campaigns[_id];

        return (
            c.id,
            c.creator,
            c.title,
            c.description,
            c.imageUrl,
            c.goal,
            c.raised,
            c.deadline,
            c.withdrawn,
            c.active
        );
    }
}
