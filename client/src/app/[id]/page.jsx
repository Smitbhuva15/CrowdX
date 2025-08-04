"use client"
import { LoadEvents } from '@/lib/LoadData';
import { ethers } from 'ethers';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useActiveAccount } from "thirdweb/react";


const page = () => {
     const dispatch = useDispatch();
  const account = useActiveAccount();
  const { id } = useParams();

const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns);
  console.log(Allcampaigns)
  const campaign = Allcampaigns?.filter((c) => c?.args?.id.toString() === id.toString());
  const currentCampaign = campaign?.[0];

  const [goal, setGoal] = useState("0");
  const [raised, setRaised] = useState("0");

  useEffect(() => {
     LoadEvents(dispatch, campaignContract)
    if (currentCampaign?.args?.goal ) {
        const formattedGoal = ethers.utils.formatEther(currentCampaign.args.goal);
        setGoal(formattedGoal);
        const formattedRaised = ethers.utils.formatEther(currentCampaign.args.raised);
        setRaised(formattedRaised);
    }
  }, [account]);


    return (
        <div className="w-full bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Section 1 */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-[#8b5cf6]">
            {currentCampaign?.args?.title}
          </h1>
          <p className="text-zinc-300 text-md">{currentCampaign?.args?.description}</p>
          <div className="text-[#8b5cf6] underline cursor-pointer">
            etherScan link
          </div>

          <div className="p-4 bg-[#1e1f24] rounded-2xl">
            <p className="text-gray-400">Target Amount</p>
            <p className="text-[#b794f4] text-lg font-medium">{goal} ETH</p>
          </div>

          <div className="p-4 bg-[#1e1f24] rounded-2xl">
            <p className="text-gray-400">Wallet Address of Campaign Creator</p>
            <p className="text-[#facc15] break-words">{currentCampaign?.args?.creator}</p>
          </div>

          <div className="p-4 bg-[#1e1f24] rounded-2xl">
            <p className="text-gray-400">Number of Requests</p>
            <p className="text-[#34d399]">5</p>
          </div>

          <div className="p-4 bg-[#1e1f24] rounded-2xl">
            <p className="text-gray-400">Number of Donors</p>
            <p className="text-[#60a5fa]">5</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="p-6 bg-[#1e1f24] rounded-2xl">
            <p className="text-gray-400 text-xl font-semibold">Campaign Balance</p>
            <p className="text-[#f87171] text-lg">{raised} ETH</p>
          </div>

          <div className="p-6 bg-[#1e1f24] rounded-2xl space-y-4">
            <h2 className="text-[#8b5cf6] font-semibold text-lg">Contribute Now!</h2>
            <form className="space-y-3">
              <label className="block text-sm text-gray-300">Amount you want to contribute</label>
              <input
                type="number"
                placeholder="e.g. 1"
                className="w-full px-3 py-2 bg-black border border-[#8b5cf6] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
              />
              <button
                type="submit"
                className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors text-white py-2 rounded-md font-semibold"
              >
                Donate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page