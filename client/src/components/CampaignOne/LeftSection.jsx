import React from 'react'
import config from '@/config.json';
import { useSelector } from 'react-redux';
import { ExternalLink } from 'lucide-react';


const LeftSection = ({ currentCampaign, goal,orders }) => {
   
  const chainId = useSelector((state) => state?.campaign?.chainId);

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      <h1 className="sm:text-3xl text-xl font-bold text-[#8b5cf6]">
        {currentCampaign?.title}
      </h1>
      <p className="text-zinc-300 text-dm sm:text-md">{currentCampaign?.description}</p>

      <div className="inline-flex items-center gap-1 text-[#8b5cf6] hover:text-violet-400 transition-colors duration-200 underline cursor-pointer">
        <a
          href={`https://sepolia.etherscan.io/address/${config[chainId].campaign.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1"
        >
          <span>View on Etherscan</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>



      <div className="p-4 bg-[#1e1f24] rounded-2xl">
        <p className="text-gray-400">Target Amount</p>
        <p className="text-[#b794f4] text-lg font-medium">{goal} ETH</p>
      </div>

      <div className="p-4 bg-[#1e1f24] rounded-2xl">
        <p className="text-gray-400">Wallet Address of Campaign Creator</p>

        <p className="hidden sm:block text-[#facc15] break-words">
          {currentCampaign?.creator}
        </p>

        <p className="block sm:hidden text-[#facc15] break-words">
          {`${currentCampaign?.creator.slice(0, 9)}...${currentCampaign?.creator.slice(-9)}`
          }
        </p>
      </div>

      <div className="p-4 bg-[#1e1f24] rounded-2xl">
        <p className="text-gray-400">Number of Requests</p>
        <p className="text-[#34d399]">{orders}</p>
      </div>

      <div className="p-4 bg-[#1e1f24] rounded-2xl">
        <p className="text-gray-400">Number of Donors</p>
        <p className="text-[#60a5fa]">{orders}</p>
      </div>
    </div>
  )
}

export default LeftSection