import React from 'react'

export const Section4 = () => {
    return (
        <>
            <div className=" space-y-4 ">
                <p className=" md:text-xl text-sm font-bold">
                    <span> <span className='mr-2'>5.</span> Securely transfer your earned </span>
                    <a
                        href="/withdraw"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline text-[#8b5cf6] transition-colors"
                    >
                        <span> funds </span>
                    </a> after your campaign ends and successfully meets its funding requirements.
                </p>
                <img
                    src="./withdraw.png"
                    alt="Campaign creation"
                    className="w-full max-w-5xl   mx-auto rounded-2xl" 
                    />
            </div>
        </>
    )
}

//  funds after your campaign ends and successfully meets its funding requirements.

