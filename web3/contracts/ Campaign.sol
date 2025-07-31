// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Campaign{

    uint256 CampaignCount=0;

     struct Campaign{
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
     }


     
    //////////////////////////        mapping       /////////////////////////////

    mapping(uint => Campaign) public campaigns;
    mapping(uint256 =>mapping(address => uint256)) public contributions;

    /////////////////////////         errors       ////////////////////////////// 

    error goalmustBeGreaterThanZero();
    error durationmustBeGreaterThanZero();

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
 

    function createCampaign(string title,string description,string imageUrl,uint256 goal,uint256 durationinDay) public {
         if(goal <=0){
            revert goalmustBeGreaterThanZero();
         }
         if(durationinDay <=0){
            revert durationmustBeGreaterThanZero();
         }
         CampaignCount++;
         uint256 deadline=block.timestamp+(durationinDay * 1 days);

         campaigns[CampaignCount]=Campaign(
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
         )

         emit CampaignCreated (
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
         )
    }
}
