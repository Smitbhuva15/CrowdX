// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

////////////////////////// EVENTS ///////////////////////////////

/**
 * @notice Emitted when a new campaign is created.
 * @param id Unique ID of the campaign.
 * @param creator Address of the campaign creator.
 * @param title Title of the campaign.
 * @param description Description of the campaign.
 * @param imageUrl IPFS/image URL of the campaign.
 * @param goal Fundraising goal (in wei).
 * @param raised Initial amount raised (starts at 0).
 * @param deadline UNIX timestamp representing campaign end time.
 * @param withdrawn Whether funds have been withdrawn.
 * @param active Whether the campaign is still active.
 */

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

/**
 * @notice Emitted when a user donates to a campaign.
 * @param id ID of the campaign being donated to.
 * @param donor Address of the contributor.
 * @param amount Amount of ETH donated (in wei).
 */
event Donate(
    uint256 id,
    address donor,
    uint256 amount
);

/**
 * @notice Emitted when the campaign creator withdraws raised funds.
 * @param id ID of the campaign.
 * @param creator Address of the campaign creator.
 * @param raised Total amount raised that was withdrawn.
 */
event Withdraw(
    uint256 id,
    address creator,
    uint256 raised
);

/**
 * @notice Emitted when a donor is refunded after an unsuccessful campaign.
 * @param id ID of the campaign.
 * @param donor Address of the user receiving the refund.
 * @param amount Amount refunded to the user (in wei).
 */
event Refund(
    uint256 id,
    address donor,
    uint256 amount
);
