// "use client"

import { ethers } from "ethers"
import config from '../config.json';
import campaignabi from '@/abis/Campaign.json';
import { getProvider, getcontract, getchainId, getCampaignEvents, getOrdersEvents, getwithdrawEvents } from "@/store/slice/campaignSlice";

export const LoadallData = async (dispatch) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(getProvider(provider));

  const { chainId } = await provider.getNetwork();
  dispatch(getchainId(chainId))

  const campaign = new ethers.Contract(config[chainId].campaign.address, campaignabi, provider)
  dispatch(getcontract(campaign))

}


export const LoadEvents = async (dispatch,provider, campaignContract, Decorate, donor) => {
  console
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    let donationStream = await campaignContract.queryFilter('Donate', 0, latestblock)
    dispatch(getOrdersEvents(donationStream))
  }

  dispatch(getCampaignEvents(campaigns))

}

// export const LoadWithdrawEvents = async (dispatch, campaignContract, account) => {

//   const campaigns = await LoadEvents(dispatch, campaignContract, 'noDecorate');

//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const latestblock = await provider.getBlockNumber()
//   // const fromBlock = Math.max(latestblock, 0)

//   let withdrawStream = await campaignContract?.queryFilter('Withdraw', 0, latestblock);
//   withdrawStream = decorateWithdraw(campaigns, withdrawStream, account);
//   dispatch(getwithdrawEvents(withdrawStream))

// }

const decorateCampaign = (CampaignStream) => {
  const now = Math.floor(Date.now() / 1000);

  return CampaignStream.filter((campaign) => {
    return campaign?.args?.deadline?.toNumber() > now;
  });
};

// const decorateWithdraw = async (campaigns, withdrawStream, account) => {
//   // Filter only campaigns created by the current account
//   let mycampaign = campaigns.filter(
//     (campaign) => campaign?.creator?.toString() === account?.address?.toString()
//   );

//   // Decorate each campaign with withdraw status
//   mycampaign = mycampaign.map((campaign) => {
//     const hasWithdraw = withdrawStream.some(
//       (withdraw) => withdraw?.args?.id?.toString() === campaign?.id?.toString()
//     );

//     return {
//       ...campaign,
//       withdraw: hasWithdraw,
//     };
//   });

//   console.log(mycampaign, "}}");
//   return mycampaign;
// };


