// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

////////////////////////// ERRORS ///////////////////////////////

/// @notice Goal must be greater than zero during campaign creation
error GoalMustBeGreaterThanZero();

/// @notice Duration must be greater than zero during campaign creation
error DurationMustBeGreaterThanZero();

/// @notice Campaign with the given ID does not exist
error CampaignNotFound();

/// @notice Donation amount must be greater than zero
error PayMustBeGreaterThanZero();

/// @notice Sender address must be valid (not zero address)
error SenderMustBeValid();

/// @notice Campaign is no longer active or has been closed
error CampaignIsNotActive();

/// @notice Campaign deadline has passed
error TimeStampExceeded();

/// @notice Creator cannot donate to their own campaign
error SenderMustDifferentToCreator();

/// @notice Donation or refund amount is invalid
error AmountMustBeValid();

/// @notice Funds have already been withdrawn from the campaign
error FundsAlreadyWithdrawn();

/// @notice Only the campaign creator is allowed to perform this action
error SenderMustBeSameAsCreator();

/// @notice Cannot withdraw funds because campaign goal was not met
error FundGoalNotMet();

/// @notice Campaign has not ended yet (deadline not reached)
error CampaignNotEndedYet();

/// @notice No donation found from this sender for refund
error DonationsNotFound();

/// @notice Cannot refund because funding goal was met
error FundGoalMet();
