import { Section1 } from '@/components/info/Section1'
import { Section2 } from '@/components/info/Section2'
import { ArrowBigRight } from 'lucide-react'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="bg-black text-zinc-300 px-4 py-10">
      <div className="md:w-[90%] w-full mx-auto space-y-10">

        <Section1 />
        <Section2 />
      </div>
    </div>

  )
}

export default page