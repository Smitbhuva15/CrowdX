import { ArrowBigRight } from 'lucide-react'
import React from 'react'

export const Section1 = () => {
  return (
    <>
        {/* Title */}
        <h1 className="text-xl sm:text-4xl font-bold text-[#8b5cf6] text-center">
          Welcome to Crowd<span className="text-white font-extrabold text-3xl sm:text-5xl">X</span>
        </h1>

        {/* Intro Section */}
        <div className=" space-y-4">
          <p className=" md:text-xl text-sm font-bold">
            <span> <span className='mr-2'>1.</span> CrowdX is your gateway to decentralized crowdfunding.  </span>
            <a
              href="/" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline text-[#8b5cf6] transition-colors"
            >
              <span> Connect </span>
            </a> your wallet to get started.
          </p>
          <img
            src="./connectwallet2.png"
            alt="CrowdX Homepage"
            className="w-full max-w-5xl mx-auto rounded-2xl "
          />


        </div>

        {/* Wallet Popup Section */}
        <div className=" space-y-4 ">
          <p className=" md:text-xl text-sm font-bold list flex">
            <span className='mr-4 text-[#8b5cf6]'><ArrowBigRight /></span>
            <span>When you connect, a popup will allow you to choose from 350+ supported wallets including MetaMask, Coinbase Wallet, and Rainbow.</span>
          </p>
          <img
            src="./walletpopup.png"
            alt="Wallet connection popup"
            className="w-full max-w-md mx-auto rounded-2xl"
          />
        </div>
    </>
  )
}
