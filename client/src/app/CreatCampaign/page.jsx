"use client"
import { useForm } from 'react-hook-form';
import { Banner } from '@/components/Banner/Banner'
import React, { useState } from 'react'
import { useActiveAccount } from 'thirdweb/react';
import { Loader2, TriangleAlert } from 'lucide-react';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import Banner2 from '@/components/Banner/Banner2';



const page = () => {

  const account = useActiveAccount();

  const [loading, setLoading] = useState(false);
  const storage = new ThirdwebStorage({ clientId: process.env.NEXT_PUBLIC_CLIENT_ID });

  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const provider = useSelector((state) => state?.campaign?.provider)

  // use form submit form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {

    setLoading(true);

    toast.loading("Preparing campaign creation...", {
      id: "createCampaignTx",
    });

    try {
      const signer = await provider.getSigner();

      // Upload image to IPFS
      toast.loading("Uploading campaign image...", {
        id: "createCampaignTx",
      });
      const cid = await storage.upload(data?.file[0]);
      const ipfsUrl = storage.resolveScheme(cid);

      // Send transaction
      const goal = ethers.utils.parseEther(data?.amount.toString());

      toast.loading("Creating campaign... Please confirm the transaction in your wallet.", {
        id: "createCampaignTx",
      });
      const transaction = await campaignContract
        .connect(signer)
        .createCampaign(
          data?.name,
          data?.description,
          ipfsUrl,
          goal,
          data?.duration
        );

      toast.loading("Transaction submitted. Waiting for confirmation...", {
        id: "createCampaignTx",
      });

      // Wait for confirmation
      const receipt = await transaction.wait();

      if (receipt.status !== 1) {
        toast.error("Campaign creation failed. Please try again.", {
          id: "createCampaignTx",
        });
        setLoading(false);
        return;
      }

      const event = receipt.events?.find((e) => e.event === "CampaignCreated");
      if (event) {
        toast.success("Campaign created successfully!", {
          id: "createCampaignTx",
        });
      } else {
        toast.error("Transaction confirmed but no CampaignCreated event found.", {
          id: "createCampaignTx",
        });
      }
    } catch (error) {
      toast.error("Transaction failed. Please try again.", {
        id: "createCampaignTx",
      });
    } finally {
      setLoading(false);
      reset();
    }
  };



  return (

    account ? (
      <div className="w-full max-w-3xl mx-auto px-4 py-8 ">
        <div className="mb-8">
          <Banner title="Create a New Campaign" />
        </div>

        <form className="space-y-6 bg-[#0a0a0a] p-6 rounded-2xl  border border-[#1f1f1f] shadow-[#002847] shadow-xl" onSubmit={handleSubmit(onSubmit)}>
          {/* Campaign Name */}

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Campaign Name</label>
            <input
              type="text"
              placeholder="e.g. Education for All"
              {...register("name", {
                required: "Campaign name is required",
                minLength: {
                  value: 15,
                  message: "Minimum length is 15 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                }
              })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#003b67]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>


          {/* Campaign Description */}
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Campaign Description</label>
            <textarea
              id="description"
              placeholder="Describe the purpose of the campaign..."
              {...register("description", {
                required: "Campaign description is required",
                minLength: {
                  value: 30,
                  message: "Minimum length is 30 characters",
                },
              })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-zinc-300 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#003b67]"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Campaign Image */}
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Campaign Image</label>
            <input
              type="file"
              {...register("file", { required: "Campaign image is required" })}
              accept=".jpg, .jpeg, .png, .jfif"
              className="w-full text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#003b67] file:text-zinc-300 hover:file:bg-[#002847]"
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
            )}
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Target Amount (in ETH)</label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 100"
              {...register("amount",
                {
                  required: "Campaign target amount required",
                  min: {
                    value: 0.01,
                    message: "Target amount must be greater than 0.01 ETH"
                  }
                })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#003b67]
              appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none 
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-moz-appearance]:textfield"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-semibold text-zinc-300 mb-1">
              Duration (in Days)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min={1}
              max={150}
              {...register("duration", { required: "Campaign duration is required" })}
              placeholder="e.g. 30"
              className="w-full px-4 py-2 rounded-md border text-zinc-300 border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#003b67]
              appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none 
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-moz-appearance]:textfield"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
            )}
          </div>

          {/* Submit Button */}
          {account ? (<div className="text-center pt-4">
            <button
              type="submit"
              className="bg-[#003b67] hover:bg-[#002847] text-zinc-300 font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 w-full "
            >
              {
                loading ? (
                  <div className="flex items-center justify-center gap-2 text-zinc-300 ">
                    <Loader2 className="animate-spin " />
                    <span >Pending...</span>
                  </div>
                ) : (
                  <div >Create Campaign</div>
                )
              }
            </button>
          </div>) : (<div className="text-center pt-4">
            <button
              disabled
              className="bg-[#003b67] hover:bg-[#002847] text-zinc-300 font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 w-full "
            >
              Connect Wallet
            </button>
            <div className="mt-4 flex items-start gap-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
              <TriangleAlert className="mt-0.5 w-5 h-5 text-yellow-600" />
              <p className="text-sm font-medium">
                Please connect your wallet first to create a campaign.
              </p>
            </div>
          </div>)}
        </form>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </div>
    ) : (
      <div>
        <Banner2 title={'Connect Your Wallet to Continue.'} model={'You must connect your wallet to launch a new campaign.'} active={'false'} />
      </div>
    )


  )
}

export default page