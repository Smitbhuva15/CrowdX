// "use client"

import { ethers } from "ethers"
import config from '../config.json';
import campaignabi from '@/abis/Campaign.json';
import { getProvider,getcontract,getchainId  } from "@/store/slice/campaignSlice";

export const LoadallData = async (dispatch) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(getProvider(provider));

  const { chainId } = await provider.getNetwork();
  dispatch(getchainId(chainId))

  const campaign=new ethers.Contract(config[chainId].campaign.address,campaignabi,provider)
  dispatch(getcontract(campaign))
   
}
