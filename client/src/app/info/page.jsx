import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="bg-black text-zinc-300 px-4 py-10">
      <div className="md:w-[90%] w-full mx-auto space-y-10">

        {/* Title */}
        <h1 className="text-xl sm:text-4xl font-bold text-[#8b5cf6] text-center">
          Welcome to Crowd<span className="text-white font-extrabold text-3xl sm:text-5xl">X</span>
        </h1>

        {/* Intro Section */}
        <div className=" space-y-4">
          <p className=" md:text-xl text-sm font-bold">
            <span> 1. CrowdX is your gateway to decentralized crowdfunding.  </span> 
            <a
              href="/" // ← replace with actual link
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
        <div className=" space-y-4">
          <p className=" md:text-xl text-sm font-bold">
            When you connect, a popup will allow you to choose from 350+ supported wallets including MetaMask, Coinbase Wallet, and Rainbow.
          </p>
          <img
            src="./walletpopup.png"
            alt="Wallet connection popup"
            className="w-full max-w-md mx-auto rounded-2xl"
          />
        </div>

      </div>
    </div>

  )
}

export default page