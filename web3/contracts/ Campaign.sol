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
    error  CampaignNotFound();
    error paymustBeGreaterThanZero();
    error sendermustBeValid();
    error campaignIsNotActive();
    error timeStampExceeded();

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

    event Donate(uint256 id, address donor, uint256 value);

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
         
         if(_id<=0 && _id>CampaignCount){
            revert CampaignNotFound(); 
         }

         if(msg.value<=0){
            revert paymustBeGreaterThanZero();
         }

         if(msg.sender == address(0)){
            revert sendermustBeValid();
         }

         if(campaigns[_id].active == false){
            revert campaignIsNotActive();
         }

         if(block.timestamp > campaigns[_id].deadline){
            revert timeStampExceeded();
         }

        Campaigns storage c = campaigns[_id];

        c.raised = c.raised + msg.value;
        contributions[_id][msg.sender] += msg.value;

        emit Donate(c.id, msg.sender, msg.value);
    }
}
