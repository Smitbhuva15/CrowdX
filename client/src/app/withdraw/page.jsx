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
import { LoadEvents } from '@/lib/LoadDatas'
import Banner2 from '@/components/Banner/Banner2'
import { Banner } from '@/components/Banner/Banner'
import { ethers } from 'ethers'
import { ShieldCheck } from 'lucide-react'
import { ShieldX } from 'lucide-react'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import errorconfig from '@/config/errorconfig.json';



const Page = () => {
  const [myCampaign, setMyCampaign] = useState();
  const [loading, setLoading] = useState(0);

  const dispatch = useDispatch();
  const account = useActiveAccount();

  const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns);
  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const provider = useSelector((state) => state?.campaign?.provider);
  const search = useSelector((state) => state?.campaign?.search);


  const isReady = provider && Object.keys(provider).length > 0 &&
    campaignContract && Object.keys(campaignContract).length > 0;

  useEffect(() => {
    if (isReady && account) {
      LoadEvents(dispatch, provider, campaignContract, 'nonDecore', 'nonDonor');
    }
  }, [isReady, account]);


  useEffect(() => {
    if (Allcampaigns)
      setMyCampaign(Allcampaigns?.filter((campaign) => campaign?.creator.toString() === account?.address.toString()))
  }, [Allcampaigns])


  let campaigns
  if (myCampaign) {
    campaigns = myCampaign.filter((campaign) => campaign?.title.toLowerCase().includes(search.toLowerCase()))
  }


  const handelwithdraw = async (e, id) => {
    e.preventDefault();
    if (campaignContract && provider) {
      setLoading(id)
      toast('withdrawal pending...', {
        icon: '⏳',
      });
      const signer = await provider.getSigner();
      try {
        let transaction = await campaignContract.connect(signer).withdrawFund(id);
        let recipt = await transaction.wait();
        if (recipt.status !== 1) {
          toast.error("withdrawal failed!")
          setLoading(0)
          return;
        }
        else if (recipt.status === 1) {
          const event = recipt.events?.find(e => e.event === "Withdraw");
          if (event) {
            toast.success(`withdrawal successfully!`);
            setLoading(0)

          }
          else {
            toast.error("withdrawal failed!");
            setLoading(0)

          }
        }
      } catch (error) {
        let message = "Something went wrong";

        const data = error?.error?.data;

        message = errorconfig[data]?.message;
        if (message == undefined) {
          toast.error(`Transaction failed: Something went wrong`)
        }
        toast.error(`Transaction failed: ${message}`);
        setLoading(0)
      }

      LoadEvents(dispatch, provider, campaignContract, "nonDecore", "noDonor")
    }

  }

  return (
    account ?
      (<div className="min-h-screen bg-black py-10">
        <div className="sm:pl-10 pl-5 mb-6">
          <Banner title="Fund Withdrawal" />
        </div>
        {
          !campaigns || campaigns.length == 0
            ?
            (
              <Banner2 title={'No funds available for withdrawal yet.'}
                model={"Looks like there's nothing to withdraw at the moment."}
                active={'true'} />
            )
            :
            (

              <div className="bg-[#1e1f24] lg:max-w-6xl md:max-w-3xl mx-auto sm:max-w-xl xs:max-w-sm xxs:max-w-[240px] px-4 overflow-x-auto rounded-2xl md:mt-24 mt-20" >
                <div className="  rounded-2xl shadow-md p-6">
                  {/* Make table wide enough to cause scroll on smaller devices */}

                  <Table className=" overflow-x-hidden lg:min-w-[720px] md:min-w-[550px] sm:min-w-[400px]  rounded-2xl ">
                    <TableCaption className="text-zinc-400 text-sm mt-2">
                      {`Found ${campaigns?.length} Requests`}
                    </TableCaption>

                    <TableHeader className=" overflow-x-hidden ">
                      <TableRow className="text-zinc-300 text-sm  overflow-x-hidden">
                        <TableHead className="w-[80px] whitespace-nowrap">#</TableHead>
                        <TableHead className="whitespace-nowrap">Campaign Title</TableHead>
                        <TableHead className="whitespace-nowrap">Target (ETH)</TableHead>
                        <TableHead className="whitespace-nowrap">Raised (ETH)</TableHead>
                        <TableHead className="whitespace-nowrap">Claimable</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Withdraw Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody className=" overflow-x-hidden">
                      {campaigns.map((campaign, index) => {
                        const goal = ethers.utils.formatEther(campaign?.goal);
                        const raised = ethers.utils.formatEther(campaign?.raised);

                        return (
                          <TableRow className="text-zinc-300 hover:bg-[#2a2b31] transition overflow-x-hidden" key={index}>
                            <TableCell className="font-medium whitespace-nowrap">{index + 1}</TableCell>
                            <TableCell className="whitespace-nowrap">{campaign?.title}</TableCell>
                            <TableCell className="whitespace-nowrap">{goal}</TableCell>
                            <TableCell className="whitespace-nowrap">{raised}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <span className={`font-bold `}>{goal <= raised ? <ShieldCheck className="w-6 h-6 text-green-600 ml-4" /> : <ShieldX className="w-6 h-6 text-red-500 ml-4" />}</span>
                            </TableCell>

                            <TableCell className="text-right whitespace-nowrap">
                              {campaign?.withdrawn == true ? (
                                <button
                                  type="button"
                                  className="px-4 py-2 bg-gray-400 text-zinc-300 font-medium rounded-md cursor-not-allowed"
                                  disabled
                                >
                                  Already Claimed
                                </button>

                              ) : (
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-[#003b67] text-zinc-300 font-medium rounded-md hover:bg-[#002847] transition"
                                  onClick={(e) => { handelwithdraw(e, campaign?.id.toString()) }}
                                >
                                  {
                                    loading == campaign?.id.toString() ? (
                                      <div className="flex items-center justify-center gap-0.5 text-zinc-300 text-sm">
                                        <Loader2 className="animate-spin size-4" />
                                        <span >Pending</span>
                                      </div>
                                    ) : (
                                      <div >Withdraw</div>

                                    )
                                  }

                                </button>
                              )}

                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>


                </div>

              </div>


            )
        }
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </div>
      ) : (
        <Banner2 title={'Connect Wallet'} model={''} active={''} />
      )
  )
}

export default Page
