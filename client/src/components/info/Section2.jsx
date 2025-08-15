import React from 'react'

export const Section2 = () => {
    return (
        <>
            <div className='space-y-4'>
                <div >
                    <span className='md:text-xl text-sm font-bold mr-2'> 2.</span>  <a
                        href="/"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline text-[#003b67] transition-colors"
                    >
                        <span className='md:text-xl text-sm font-bold'> Explore</span>
                    </a> <span className='md:text-xl text-sm font-bold'> all active campaigns currently accepting contributions.</span>
                </div>
            </div>

            <div className=" space-y-4 ">
                <p className=" md:text-xl text-sm font-bold">
                    <span> <span className='mr-2'>3.</span> Create a  </span>
                    <a
                        href="/CreatCampaign"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline text-[#003b67] transition-colors"
                    >
                        <span> Campaign</span>
                    </a> in just a few steps.
                </p>
                <img
                    src="./create campaign.png"
                    alt="Campaign creation"
                    className="w-full max-w-md sm:ml-10 sm:mx-0 mx-auto rounded-2xl"
                />
            </div>

        </>
    )
}
