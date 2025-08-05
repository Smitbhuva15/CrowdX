"use client"
import { Banner } from '@/components/Banner/Banner';
import Banner2 from '@/components/Banner/Banner2';
import { MyCart } from '@/components/Cart/MyCart';
import { LoadEvents } from '@/lib/LoadData';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useActiveAccount } from "thirdweb/react";


const page = () => {

   const [myCampaign,setMyCampaign]=useState();
  const dispatch = useDispatch();
  const account = useActiveAccount();

  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns)
   const provider= useSelector((state) => state?.campaign?.provider);


  useEffect(() => {
    if(campaignContract && account && provider){
    LoadEvents(dispatch,provider, campaignContract,"Decore","noDonor")
    }
  }, [account,campaignContract,provider])

  useEffect(()=>{
   setMyCampaign(Allcampaigns?.filter((campaign)=>campaign?.creator.toString() === account?.address.toString()))
  },[Allcampaigns])

  return (
    account ?
      (<div className="bg-black min-h-screen">
        <div className="sm:pl-10 pl-5">
          <Banner title={`Live Campaigns by You (${myCampaign?.length})`} />
        </div>
        <div>
          <MyCart Allcampaigns={myCampaign} />
        </div>

      </div>) : (
        <div >
          <Banner2 title={'Connect Your Wallet to Continue.'} model={''} active={''} />
        </div>
      )
  );

}

export default page