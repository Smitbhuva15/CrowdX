// "use client"

import { ethers } from "ethers"
import config from '../config.json';
import campaignabi from '@/abis/Campaign.json';
import { getProvider, getcontract, getchainId, getCampaignEvents, getOrdersEvents } from "@/store/slice/campaignSlice";

export const LoadallData = async (dispatch) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(getProvider(provider));

  const { chainId } = await provider.getNetwork();
  dispatch(getchainId(chainId))

  const campaign = new ethers.Contract(config[chainId].campaign.address, campaignabi, provider)
  dispatch(getcontract(campaign))

}


export const LoadEvents = async (dispatch, campaignContract) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const latestblock = await provider.getBlockNumber()
  // const fromBlock = Math.max(latestblock, 0)

  let CampaignStream = await campaignContract.queryFilter('CampaignCreated', 0, latestblock)
  CampaignStream = decorateCampaign(CampaignStream);

  // Map to live data from contract storage
  const campaigns = await Promise.all(
    CampaignStream.map(async (event) => {
      const id = event.args.id;
      const liveData = await campaignContract.campaigns(id);
      return liveData;
    })
  );

  let donationStream = await campaignContract.queryFilter('Donate', 0, latestblock)

  dispatch(getCampaignEvents(campaigns))
  dispatch(getOrdersEvents(donationStream))
}

const decorateCampaign = (CampaignStream) => {
  const now = Math.floor(Date.now() / 1000);

  return CampaignStream.filter((campaign) => {
    return campaign?.args?.deadline?.toNumber() > now;
  });
};

