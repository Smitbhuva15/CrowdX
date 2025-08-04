"use client"
import Banner2 from '@/components/Banner/Banner2';
import { LoadEvents } from '@/lib/LoadData';
import { ethers } from 'ethers';
import { TriangleAlert } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useActiveAccount } from "thirdweb/react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';



const page = () => {
  const dispatch = useDispatch();
  const account = useActiveAccount();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState("0");
  const [raised, setRaised] = useState("0");

  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns);
  const provider = useSelector((state) => state?.campaign?.provider)


  const campaign = Allcampaigns?.filter((c) => c?.id.toString() === id.toString());
  const currentCampaign = campaign?.[0];


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {

    setLoading(true)
    toast('Donation pending...', {
      icon: '⏳',
    });

    const id = currentCampaign?.id.toString();
    const donationAmount = ethers.utils.parseEther(data?.donationAmount);


    const signer = await provider.getSigner();
    const transaction = await campaignContract.connect(signer).donate(id, { value: donationAmount });
    const recipt = await transaction.wait();

    if (recipt.status !== 1) {
      toast.error("Donation failed!")
      setLoading(false)
      return;
    }
    else if (recipt.status === 1) {
      const event = recipt.events?.find(e => e.event === "Donate");
      if (event) {
        toast.success(`Donate successfully!`);
        setLoading(false)

      }
      else {
        toast.error("Donation failed!");
        setLoading(false)

      }
    }
    LoadEvents(dispatch,campaignContract)
    reset();

  }

  useEffect(() => {
    if (currentCampaign?.goal) {
      try {
        const formattedGoal = ethers.utils.formatEther(currentCampaign?.goal);
        setGoal(formattedGoal);
        const formattedRaised = ethers.utils.formatEther(currentCampaign?.raised);
        setRaised(formattedRaised);
      } catch (err) {
        console.error("Invalid goal or raised value:", err);
      }
    }
  }, [currentCampaign]);

  useEffect(() => {
    if (campaignContract && account) {
      LoadEvents(dispatch, campaignContract);
    }
  }, [account]);




  return (
    account ? (
      goal === "0"
        ?
        (
          <div className="flex items-center justify-center h-[78vh]">
            <Loader2 className="h-10 w-10 text-[#8b5cf6] animate-spin" />
          </div>
        )
        :
        (
          <div className="w-full  text-white py-8 px-4 ">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

              {/* Section 1 */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h1 className="sm:text-3xl text-xl font-bold text-[#8b5cf6]">
                  {currentCampaign?.title}
                </h1>
                <p className="text-zinc-300 text-dm sm:text-md">{currentCampaign?.description}</p>
                <div className="text-[#8b5cf6] underline cursor-pointer">
                  etherScan link
                </div>

                <div className="p-4 bg-[#1e1f24] rounded-2xl">
                  <p className="text-gray-400">Target Amount</p>
                  <p className="text-[#b794f4] text-lg font-medium">{goal} ETH</p>
                </div>

                <div className="p-4 bg-[#1e1f24] rounded-2xl">
                  <p className="text-gray-400">Wallet Address of Campaign Creator</p>

                  <p className="hidden sm:block text-[#facc15] break-words">
                    {currentCampaign?.creator}
                  </p>

                  <p className="block sm:hidden text-[#facc15] break-words">
                    {`${currentCampaign?.creator.slice(0, 9)}...${currentCampaign?.creator.slice(-9)}`
                    }
                  </p>
                </div>

                <div className="p-4 bg-[#1e1f24] rounded-2xl">
                  <p className="text-gray-400">Number of Requests</p>
                  <p className="text-[#34d399]">5</p>
                </div>

                <div className="p-4 bg-[#1e1f24] rounded-2xl">
                  <p className="text-gray-400">Number of Donors</p>
                  <p className="text-[#60a5fa]">5</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="p-6 bg-[#1e1f24] rounded-2xl">
                  <p className="text-gray-400 text-xl font-semibold">Campaign Balance</p>
                  <p className="text-[#f87171] text-lg">{raised} ETH</p>
                </div>

                <div className="p-6 bg-[#1e1f24] rounded-2xl space-y-4">
                  <h2 className="text-[#8b5cf6] font-semibold text-lg">Contribute Now!</h2>
                  <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <label className="block text-sm text-gray-300">Amount you want to contribute</label>
                    <div className="relative w-full">
                      <input
                        type="number"
                        step="0.001"
                        placeholder="e.g. 0.1"
                        {...register("donationAmount", { required: "Donation Amount is required" })}
                        className="w-full pr-14 px-3 py-2 bg-black border border-[#8b5cf6] text-white rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]
                      appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none 
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-moz-appearance]:textfield"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-medium text-sm">
                        ETH
                      </span>

                    </div>
                    {errors.donationAmount && (
                      <p className="text-red-500 text-sm mt-1">{errors.donationAmount.message}</p>
                    )}

                    {
                      currentCampaign?.creator.toString() === account?.address.toString()
                        ?
                        (
                          <div className="mt-4 flex items-start gap-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                            <TriangleAlert className="mt-0.5 w-5 h-5 text-yellow-600" />
                            <p className="text-sm font-medium">
                              As the creator, you're not allowed to fund your own campaign.
                            </p>
                          </div>
                        )
                        :
                        (
                          loading
                            ?
                            (
                              <div className="flex items-center justify-center gap-2  w-full bg-[#7c3aed] transition-colors text-white py-2 rounded-md font-semibold">
                                <Loader2 className="animate-spin " />
                                <span >Pending...</span>
                              </div>
                            )
                            :
                            (<button
                              type="submit"
                              className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors text-white py-2 rounded-md font-semibold"
                            >
                              Donate
                            </button>
                            )


                        )
                    }

                  </form>
                </div>
              </div>
            </div>
             <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
          </div>
        )

    ) : (
      <div >
        <Banner2 title={'Hey there! Connect your wallet to join the campaign experience.'} model={""} active={''} />
      </div>
    )

  );
}

export default page