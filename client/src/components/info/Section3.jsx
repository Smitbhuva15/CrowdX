import React from 'react'

export const Section3 = () => {
    return (
        <>
            <div className="-mt-5 ">
                < div className='mb-3'>
                    <span className='md:text-xl text-sm font-bold mr-2 '> 4.</span>  <a
                        href="/lanchpad"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline text-[#003b67] transition-colors"
                    >
                        <span className='md:text-xl text-sm font-semibold'> Explore</span>
                    </a> <span className='md:text-xl text-sm font-semibold'> and Manage All the Campaigns You’ve Created.</span>
                </div>
                <img
                    src="./campaign.png"
                    alt="launchpad"
                    className="w-full max-w-[300px] transition-transform duration-300 hover:scale-105 sm:ml-16 sm:mx-0 mx-auto rounded-2xl"
                />
            </div>

            <div className="-mt-3">
                < div className='md:text-xl text-sm font-semibold mb-3'>
                   <span className='mr-2'>5.</span> Donate to Specific powerful campaign directly using your crypto wallet - fast, secure, and transparent.
                </div>
                <img
                    src="./donate.png"
                    alt="launchpad"
                    className="w-full max-w-5xl transition-transform duration-300 hover:scale-105  mx-auto rounded-2xl"
                />
            </div>
        </>


    )
}
