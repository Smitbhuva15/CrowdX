import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Section1 = () => {
  return (
    <>
      {/* sec1 */}
      <div >
        <p className=" md:text-xl md:leading-8  ">
          <span> <span className='mr-2'>1.</span> CrowdX is your gateway to decentralized crowdfunding.  </span>
          <a
            href="/"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1  text-[#003b67] transition-colors"
          >
            <span> Connect </span>
          </a>     your wallet to get started. When you connect, a popup will allow you to choose from 350+ supported wallets including MetaMask, Coinbase Wallet, and Rainbow
        </p>
      </div>
      {/* sec2 */}
      <div >
        <p className=" md:text-xl md:leading-8  ">
          <span> <span className='mr-2'>2.</span> Explore all active CrowdX campaigns  </span>
          <Link href="/" className="text-[#003b67]"  >
            <span>here </span>
          </Link>    track real-time funding progress, and support innovative ideas with secure on-chain donations.
          <Image src={'/allcampaign.png'} alt='campaign' width={3000} height={3000} className='my-5 hover:scale-105 duration-700 ' />
        </p>

      </div>
      {/* sec3 */}
      <div >
        <p className=" md:text-xl md:leading-8 ">
          <span> <span className='mr-2'>3.</span> Create a Campaign  </span>
          <Link href="/CreatCampaign" className="text-[#003b67]"  >
            <span>here </span>
          </Link>     in just a few simple steps: set goal, set duration, add details and launch.
        </p>

      </div>
      {/* sec4 */}
      <div >
        <p className=" md:text-xl md:leading-8 ">
          <span> <span className='mr-2'>4.</span> Donors can explore detailed information about a specific campaign, </span>
          track its progress, and securely contribute funds to support ideas on the CrowdX.
          <div className='flex justify-center'>
            <Image src={'/donate.png'} alt='campaign' width={800} height={3000} className='my-5 hover:scale-105 duration-700 ' />
          </div>

        </p>

      </div>
      {/* sec5 */}
      <div >
        <p className=" md:text-xl md:leading-8 ">
          <span> <span className='mr-2'>5.</span>  Explore and manage all the campaigns you’ve created  </span>
          <Link href="/lanchpad" className="text-[#003b67]"  >
            <span>here </span>
          </Link>   track contributions, monitor progress, and oversee funding securely and efficiently.
          <div className='flex justify-center'>
            <Image src={'/campaign.png'} alt='campaign' width={300} height={300} className='my-5 hover:scale-105 duration-700 ' />
          </div>
        </p>

      </div>
      {/* sec6 */}
      <div >
        <p className=" md:text-xl md:leading-8 ">
          <span> <span className='mr-2'>6.</span> Securely transfer your earned funds  </span>
          <Link href="/withdraw" className="text-[#003b67]"  >
            <span>here </span>
          </Link>  once your campaign ends and successfully reaches its funding goal.
          <Image src={'/withdrawfund.png'} alt='withdraw' width={3000} height={3000} className='my-5 hover:scale-105 duration-700 ' />
        </p>
      </div>
      {/* sec7 */}
      <div >
        <p className=" md:text-xl md:leading-8 ">
          <span> <span className='mr-2'>7.</span> Claim a full refund  </span>
          <Link href="/refund" className="text-[#003b67]"  >
            <span>here </span>
          </Link>   if the campaign fails to reach its funding target, ensuring your contribution remains safe and secure.
          <Image src={'/refunddonation.png'} alt='refund' width={3000} height={3000} className='my-5 hover:scale-105 duration-700 ' />
        </p>
      </div>
    </>
  )
}
