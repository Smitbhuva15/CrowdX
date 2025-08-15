"use client"
import Banner2 from '@/components/Banner/Banner2';
import { LoadEvents } from '@/lib/LoadDatas';
import { ethers } from 'ethers';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useActiveAccount } from "thirdweb/react";
import { Toaster } from 'react-hot-toast';
import LeftSection from '@/components/CampaignOne/LeftSection';
import RightSection from '@/components/CampaignOne/RightSection';



const page = () => {
  const dispatch = useDispatch();
  const account = useActiveAccount();
  const { id } = useParams();

  const [goal, setGoal] = useState("0");
  const [raised, setRaised] = useState("0");
  const [orders, setOrders] = useState();

  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns);
  const Allorders = useSelector((state) => state?.campaign?.Allorders)
  const provider = useSelector((state) => state?.campaign?.provider);


  const campaign = Allcampaigns?.filter((c) => c?.id.toString() === id.toString());
  const currentCampaign = campaign?.[0];

  useEffect(() => {
    if (currentCampaign?.goal) {
      try {
        const formattedGoal = ethers.utils.formatEther(currentCampaign?.goal);
        setGoal(formattedGoal);
        const formattedRaised = ethers.utils.formatEther(currentCampaign?.raised);
        setRaised(formattedRaised);
      } catch (err) {
        console.error("Invalid goal or raised value:", err);
      }
    }
  }, [currentCampaign]);

  useEffect(() => {
    if (Allorders)
      setOrders(Allorders?.filter((order) => order?.args?.id.toString() === id.toString()));
  }, [Allorders])

  const isReady = provider && Object.keys(provider).length > 0 &&
    campaignContract && Object.keys(campaignContract).length > 0;

  useEffect(() => {
    if (isReady && account) {
      LoadEvents(dispatch, provider, campaignContract, 'nonDecore', 'Donor');
    }
  }, [isReady, account]);





  return (
    account ? (
      goal === "0"
        ?
        (
          <div className="flex items-center justify-center h-[78vh]">
            <Loader2 className="h-10 w-10 text-[#003b67] animate-spin" />
          </div>
        )
        :
        (
          <div className="w-ful  text-zinc-300  py-8 px-4 ">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

              {/* Section 1 */}
              <LeftSection currentCampaign={currentCampaign} goal={goal} orders={orders.length} />

              {/* Section 2 */}
              <RightSection currentCampaign={currentCampaign} raised={raised} account={account} />

            </div>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
            />
          </div>
        )

    ) : (
      <div >
        <Banner2 title={'Hey there! Connect your wallet to join the campaign experience.'} model={""} active={''} />
      </div>
    )

  );
}

export default page