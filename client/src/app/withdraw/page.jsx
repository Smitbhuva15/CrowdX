"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useActiveAccount } from "thirdweb/react";
import { LoadEvents} from '@/lib/LoadData'
import Banner2 from '@/components/Banner/Banner2'
import { Banner } from '@/components/Banner/Banner'


const Page = () => {
  const [myCampaign, setMyCampaign] = useState();


  const dispatch = useDispatch();
  const account = useActiveAccount();

  const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns);
  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
   const provider= useSelector((state) => state?.campaign?.provider);


    useEffect(() => {
      if(campaignContract && account && provider){
      LoadEvents(dispatch,provider, campaignContract,"Decore","noDonor")
      }
    }, [account,campaignContract,provider])

  useEffect(() => {
    setMyCampaign(Allcampaigns?.filter((campaign) => campaign?.creator.toString() === account?.address.toString()))
  }, [Allcampaigns])


  return (
    account ?
      (<div className="min-h-screen bg-black py-10">
        <div className="sm:pl-10 pl-5 mb-6">
          <Banner title="Fund Withdrawal" />
        </div>
        {
          !myCampaign || myCampaign.length == 0
            ?
            (
              <Banner2 title={'No funds available for withdrawal yet.'}
                model={"Looks like there's nothing to withdraw at the moment."}
                active={'true'} />
            )
            :
            (
              <div className="bg-[#1e1f24] lg:max-w-6xl md:lg-max-w-4xl mx-auto sm:max-w-xl xs:max-w-sm xxs:max-w-[240px] px-4 overflow-x-auto rounded-2xl md:mt-24 mt-20">
                <div className="  rounded-2xl shadow-md p-6">
                  {/* Make table wide enough to cause scroll on smaller devices */}

                  <Table className=" overflow-x-hidden lg:min-w-[720px] md:min-w-[550px] sm:min-w-[400px]  rounded-2xl ">
                    <TableCaption className="text-zinc-400 text-sm mt-2">
                      Found 4 Requests
                    </TableCaption>

                    <TableHeader className=" overflow-x-hidden ">
                      <TableRow className="text-zinc-300 text-sm  overflow-x-hidden">
                        <TableHead className="w-[80px] whitespace-nowrap">#</TableHead>
                        <TableHead className="whitespace-nowrap">Campaign Title</TableHead>
                        <TableHead className="whitespace-nowrap">Target (ETH)</TableHead>
                        <TableHead className="whitespace-nowrap">Raised (ETH)</TableHead>
                        <TableHead className="whitespace-nowrap">Claimed</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Withdraw Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody className=" overflow-x-hidden">
                      <TableRow className="text-white hover:bg-[#2a2b31] transition overflow-x-hidden">
                        <TableCell className="font-medium whitespace-nowrap">1</TableCell>
                        <TableCell className="whitespace-nowrap">empowing power system by you</TableCell>
                        <TableCell className="whitespace-nowrap">1</TableCell>
                        <TableCell className="whitespace-nowrap">0.01</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className="text-red-500 font-bold">✘</span>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#8b5cf6] text-white font-medium rounded-md hover:bg-[#7a4ee0] transition"
                          >
                            Withdraw
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-white hover:bg-[#2a2b31] transition overflow-x-hidden">
                        <TableCell className="font-medium whitespace-nowrap">1</TableCell>
                        <TableCell className="whitespace-nowrap">empowing power system by you</TableCell>
                        <TableCell className="whitespace-nowrap">1</TableCell>
                        <TableCell className="whitespace-nowrap">0.01</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className="text-red-500 font-bold">✘</span>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#8b5cf6] text-white font-medium rounded-md hover:bg-[#7a4ee0] transition"
                          >
                            Withdraw
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-white hover:bg-[#2a2b31] transition overflow-x-hidden">
                        <TableCell className="font-medium whitespace-nowrap">1</TableCell>
                        <TableCell className="whitespace-nowrap">empowing power system by you</TableCell>
                        <TableCell className="whitespace-nowrap">1</TableCell>
                        <TableCell className="whitespace-nowrap">0.01</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className="text-red-500 font-bold">✘</span>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#8b5cf6] text-white font-medium rounded-md hover:bg-[#7a4ee0] transition"
                          >
                            Withdraw
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>


                </div>

              </div>
            )
        }
      </div>
      ) : (
        <Banner2 title={'Connect Wallet'} model={''} active={''} />
      )
  )
}

export default Page
