import React from 'react'

export const Section4 = () => {
    return (
        <>
            <div className=" space-y-4 ">
                <p className=" md:text-xl text-sm font-bold">
                    <span> <span className='mr-2'>6.</span> Securely transfer your earned </span>
                    <a
                        href="/withdraw"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline text-[#003b67] transition-colors"
                    >
                        <span> funds </span>
                    </a> after your campaign ends and successfully meets its funding requirements.
                </p>
                <img
                    src="./withdrawfund.png"
                    alt="Campaign creation"
                    className="w-full max-w-5xl   mx-auto rounded-2xl" 
                    />
            </div>

            <div className=" space-y-4 ">
                <p className=" md:text-xl text-sm font-bold">
                    <span> <span className='mr-2'>7.</span> Secure a full </span>
                    <a
                        href="/refund"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline text-[#003b67] transition-colors"
                    >
                        <span>  refund  </span> 
                        </a> if the campaign’s funding target is not successfully reached.

                </p>
                <img
                    src="./refunddonation.png"
                    alt="Campaign creation"
                    className="w-full max-w-5xl   mx-auto rounded-2xl" 
                    />
            </div>
        </>
    )
}

//  funds after your campaign ends and successfully meets its funding requirements.