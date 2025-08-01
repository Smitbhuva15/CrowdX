// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Campaign {
    uint256 CampaignCount = 0;

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

    //////////////////////////        mapping       /////////////////////////////

    mapping(uint => Campaigns) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    /////////////////////////         errors       //////////////////////////////

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

    /////////////////////////         events      //////////////////////////////

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

    // Donate ETH to a campaign
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

        c.raised = c.raised + msg.value;

        contributions[_id][msg.sender] += msg.value;

        emit Donate(c.id, msg.sender, msg.value);
    }

    // Withdraw by campaign creator (only if goal is met)
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

        (bool success, ) = payable(c.creator).call{value: c.raised}("");
        require(success, "Transaction Failed");

        emit Withdraw(c.id, c.creator, c.raised);
    }

    // Refund to donors (only if goal NOT met after deadline)
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

        //check donation
        uint256 amountToDonate = getcontributions(_id, msg.sender);
        if (amountToDonate == 0) {
            revert donationsNotFound();
        }

        // refund amount
        (bool success, ) = payable(msg.sender).call{value: amountToDonate}("");
        require(success, "Transaction Failed");

        contributions[_id][msg.sender]=0;

        emit Refund(_id, msg.sender, amountToDonate);
    }

    // use only for test
    function deactivateCampaign(uint256 _id) public {
        campaigns[_id].active = false;
    }

    function getcontributions(
        uint256 _id,
        address user
    ) public view returns (uint256) {
        return contributions[_id][user];
    }
}
