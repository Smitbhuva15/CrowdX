import { Section1 } from '@/components/info/Section1'
import Section5 from '@/components/info/Section5'
import { ArrowBigRight } from 'lucide-react'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    // <div className="bg-black text-white px-4 py-10">
    //   <div className="md:w-[90%] w-full mx-auto  text-white md:text-xl space-y-4 leading-relaxed my-6">

    //     <Section1 />
    //     <Section2 />
    //     <Section3 />
    //     <Section4 />
    //     <Section5 />
    //   </div>
    // </div>
    <div className='xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg w-[90%] mx-auto text-white py-8'>
      <div className="text-4xl sm:text-5xl font-extrabold mb-6 ">
        <h1>
          <span className='text-[#003b67]'>Crowd</span><span className="text-amber-900 font-extrabold text-5xl sm:text-6xl">X</span>
        </h1>
      </div>
      <div>
        <p className="text-white md:text-xl  mt-6 font]">
          Welcome to CrowdX! Check this guide to discover how to start, support, and handle campaigns securely.
        </p>
      </div>
      <div>
        <div className='border my-8 border-e-white '></div>
        <div className=' space-y-1!'>
          <Section1 />
          <div className='border my-18 border-e-white '></div>
          <Section5 />
        </div>
      </div>
    </div>
  )
}

export default page