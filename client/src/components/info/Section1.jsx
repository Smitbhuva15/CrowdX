import { ArrowBigRight } from 'lucide-react'
import React from 'react'

export const Section1 = () => {
  return (
    <>
        {/* Title */}
        <h1 className="text-2xl sm:text-5xl font-bold text-zinc-300 sm:text-center text-left">
          Welcome to <span className='text-[#003b67]'>Crowd</span><span className="text-amber-900 font-extrabold text-4xl sm:text-6xl">X</span>
        </h1>

        {/* Intro Section */}
        <div className="">
          <p className=" md:text-xl text-sm font-semibold">
            <span> <span className='mr-2'>1.</span> CrowdX is your gateway to decentralized crowdfunding.  </span>
            <a
              href="/" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline text-[#003b67] transition-colors"
            >
              <span> Connect </span>
            </a> your wallet to get started.
          </p>
         
        </div>

        {/* Wallet Popup Section */}
        <div className="-mt-6 ">
          <p className=" md:text-xl text-sm font-semibold list flex mb-4">
            <span className='mr-2 text-[#003b67]'><ArrowBigRight /></span>
            <span>When you connect, a popup will allow you to choose from 350+ supported wallets including MetaMask, Coinbase Wallet, and Rainbow.</span>
          </p>
          <img
            src="./walletpopup.png"
            alt="Wallet connection popup"
            className="w-full max-w-md sm:ml-16 sm:mx-0 mx-auto rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
    </>
  )
}
