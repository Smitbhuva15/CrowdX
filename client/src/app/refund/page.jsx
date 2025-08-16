"use client"
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
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
import Banner2 from '@/components/Banner/Banner2'
import { Banner } from '@/components/Banner/Banner'
import { ShieldCheck } from 'lucide-react'
import { ShieldX } from 'lucide-react'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { LoadRefundWithDonation } from '@/lib/LoadDatas'
import errorconfig from '@/config/errorconfig.json';

const page = () => {
  const [myDonation, setMyDonation] = useState();
  const [loading, setLoading] = useState(-1);

  const dispatch = useDispatch();
  const account = useActiveAccount();
  const donations = useSelector((state) => state?.campaign?.donations)
  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const provider = useSelector((state) => state?.campaign?.provider);
  const search = useSelector((state) => state?.campaign?.search);

  const isReady = provider && Object.keys(provider).length > 0 &&
    campaignContract && Object.keys(campaignContract).length > 0;

  useEffect(() => {
    if (isReady && account && provider) {
      LoadRefundWithDonation(dispatch, provider, campaignContract)
    }
  }, [account, isReady])

  useEffect(() => {
    if (donations) {
      setMyDonation(donations.filter((donation) => donation?.args?.donor?.toString() === account?.address.toString()))
    }
  }, [donations])

  const handelrefund = async (e, id, index) => {
    e.preventDefault();

    if (campaignContract && provider) {
      setLoading(index)
      toast('Refund pending...', {
        icon: '⏳',
      });
      const signer = await provider.getSigner();
      try {
        const transaction = await campaignContract.connect(signer).refund(id);
        const recipt = await transaction.wait();
        if (recipt.status !== 1) {
          toast.error("Refund failed!")
          setLoading(-1)
          return;
        }
        else if (recipt.status === 1) {
          const event = recipt.events?.find(e => e.event === "Refund");
          if (event) {
            toast.success(`Refund successful!`);
            setLoading(-1)

          }
          else {
            toast.error("Refund failed!");
            setLoading(-1)

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
        setLoading(-1)
      }

      LoadRefundWithDonation(dispatch, provider, campaignContract)
    }
  }

  let searchMyDonation = [];

  if (myDonation?.length >= 1) {
    searchMyDonation = myDonation.filter((donation) =>
      donation?.args?.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }

  return (
    account ? ((<div className="min-h-screen bg-black py-10">
      <div className="sm:pl-10 pl-5 mb-6">
        <Banner title="Refund Donation" />
      </div>
      {
        !searchMyDonation || searchMyDonation.length == 0
          ?
          (
            <Banner2 title={'No funds available for Refund yet.'}
              model={"Looks like there are no donations to refund at the moment."}
              active={'true'} />
          )
          :
          (

            <div className="bg-[#1e1f24] lg:max-w-6xl md:lg-max-w-4xl mx-auto sm:max-w-xl xs:max-w-sm xxs:max-w-[240px] px-4 overflow-x-auto rounded-2xl md:mt-24 mt-20" >
              <div className="  rounded-2xl shadow-md p-6">
                {/* Make table wide enough to cause scroll on smaller devices */}

                <Table className=" overflow-x-hidden lg:min-w-[720px] md:min-w-[550px] sm:min-w-[400px]  rounded-2xl ">
                  <TableCaption className="text-zinc-400 text-sm mt-2">
                    {`Found ${searchMyDonation?.length} Requests`}
                  </TableCaption>

                  <TableHeader className=" overflow-x-hidden ">
                    <TableRow className="text-zinc-300 text-sm  overflow-x-hidden">
                      <TableHead className="w-[80px] whitespace-nowrap">#</TableHead>
                      <TableHead className="whitespace-nowrap">Campaign Title</TableHead>
                      <TableHead className="whitespace-nowrap">Creator</TableHead>
                      <TableHead className="whitespace-nowrap">Donation (ETH)</TableHead>
                      <TableHead className="whitespace-nowrap">Refundable</TableHead>
                      <TableHead className="text-right whitespace-nowrap">Refund Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className=" overflow-x-hidden">
                    {
                      searchMyDonation.map((donation, index) => {

                        const amount = ethers.utils.formatEther(donation?.args?.amount);


                        return (
                          <TableRow className="text-zinc-300 hover:bg-[#2a2b31] transition overflow-x-hidden" key={index}>
                            <TableCell className="font-medium whitespace-nowrap">{index + 1}</TableCell>

                            <TableCell className="whitespace-nowrap">{donation?.args?.title}</TableCell>
                            <TableCell className="whitespace-nowrap"> {`${donation?.args?.creator.slice(0, 11)}...${donation?.args?.creator.slice(-11)}`}</TableCell>
                            <TableCell className="whitespace-nowrap">{amount}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <span className={`font-bold `}>{donation?.readyForRefund ? <ShieldCheck className="w-6 h-6 text-green-600 ml-4" /> : <ShieldX className="w-6 h-6 text-red-500 ml-4" />}</span>
                            </TableCell>

                            <TableCell className="text-right whitespace-nowrap">
                              {donation?.refunded == true ? (
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
                                  onClick={(e) => { handelrefund(e, donation?.args?.id.toString(), index) }}
                                >
                                  {
                                    loading == index ? (
                                      <div className="flex items-center justify-center gap-0.5 text-zinc-300 text-sm">
                                        <Loader2 className="animate-spin size-4" />
                                        <span >Pending</span>
                                      </div>
                                    ) : (
                                      <div >Refund</div>

                                    )
                                  }

                                </button>
                              )}

                            </TableCell>
                          </TableRow>
                        )
                      })
                      
                      
                      }
                       
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
    )) : (<Banner2 title={'Connect Wallet'} model={''} active={''} />)
  )
}

export default page