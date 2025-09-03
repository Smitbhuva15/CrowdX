// "use client"

import { ethers } from "ethers"
import config from '@/config/config.json';
import campaignabi from '@/abis/Campaign.json';
import { getProvider, getcontract, getchainId, getCampaignEvents, getOrdersEvents, getwithdrawEvents, getRefundDonation } from "@/store/slice/campaignSlice";

export const LoadallData = async (dispatch) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(getProvider(provider));

  const { chainId } = await provider.getNetwork();
  dispatch(getchainId(chainId))

  const campaign = new ethers.Contract(config[chainId].campaign.address, campaignabi, provider)
  dispatch(getcontract(campaign))

}

export const LoadDonations = async (dispatch, provider, campaignContract) => {
  const latestblock = await provider.getBlockNumber()
  let donationStream = await campaignContract.queryFilter('Donate', 0, latestblock)
  dispatch(getOrdersEvents(donationStream))
  return donationStream;
}

export const LoadEvents = async (dispatch, provider, campaignContract, Decorate, donor) => {

  const latestblock = await provider.getBlockNumber()
  // const fromBlock = Math.max(latestblock, 0)

  let CampaignStream = await campaignContract.queryFilter('CampaignCreated', 0, latestblock)

  if (Decorate === 'Decore') {
    CampaignStream = decorateCampaign(CampaignStream);

  }

  // Map to live data from contract storage
  const campaigns = await Promise.all(
    CampaignStream.map(async (event) => {
      const id = event?.args?.id;
      const liveData = await campaignContract.campaigns(id);
      return liveData;
    })
  );

  if (donor == 'Donor') {
    LoadDonations(dispatch, provider, campaignContract)
  }

  dispatch(getCampaignEvents(campaigns))
  return campaigns;
}

export const LoadRefundWithDonation = async (dispatch, provider, campaignContract) => {
  const latestBlock = await provider.getBlockNumber();

  let donationstream = await LoadDonations(dispatch, provider, campaignContract);
  let refundstream = await campaignContract.queryFilter('Refund', 0, latestBlock);
  let refundDonation = await Promise.all(
    donationstream.map(async (donation) => {
      // Await the decorated donation

      donation = await decorateDonationRefund(donation, dispatch, provider, campaignContract);

      // Check if this donation has already been refunded
      const hashrefund = refundstream.some((refund) => {
        return refund?.args?.id.toString() === donation?.args?.id.toString();
      });

      return {
        ...donation,
        refunded: hashrefund,
      };
    })
  );

  dispatch(getRefundDonation(refundDonation))

}

const decorateDonationRefund = async (donation, dispatch, provider, campaignContract) => {
  const now = Math.floor(Date.now() / 1000);

  const campaigns = await LoadEvents(dispatch, provider, campaignContract, "noDecore", "noDonor");


  // Find the campaign that matches the donation ID
  const matchedCampaign = campaigns.find(
    (campaign) => campaign?.id.toString() === donation?.args?.id.toString()
  );
  const readyForRefund =
    matchedCampaign &&
    matchedCampaign.goal > matchedCampaign.raised &&
    matchedCampaign.deadline.toNumber() < now;

  return {
    ...donation,
    readyForRefund,
  };

}



const decorateCampaign = (CampaignStream) => {
  const now = Math.floor(Date.now() / 1000);

  return CampaignStream.filter((campaign) => {
    return campaign?.args?.deadline?.toNumber() > now;
  });
};


