import { TriangleAlert } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { set, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import { LoadEvents } from '@/lib/LoadDatas';
import  errorconfig from '@/config/errorconfig.json';


const RightSection = ({ currentCampaign, raised, account }) => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const provider = useSelector((state) => state?.campaign?.provider);


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
    try {
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
    }
    catch (error) {
      let message = "Something went wrong";

      const data = error?.error?.data;
      message = errorconfig[data]?.message;
      if(message==undefined){
          toast.error(`Transaction failed: Something went wrong`)
        }
      toast.error(`Transaction failed: ${message}`);
      setLoading(false)

    }
    if (campaignContract && account && provider) {
      LoadEvents(dispatch, provider, campaignContract, "nonDecore", "Donor")
    }
    reset();

  }

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      <div className="p-6 bg-[#1e1f24] rounded-2xl">
        <p className="text-gray-400 text-xl font-semibold">Campaign Balance</p>
        <p className="text-[#f87171] text-lg">{raised} ETH</p>
      </div>

      <div className="p-6 bg-[#1e1f24] rounded-2xl space-y-4">
        <h2 className="text-[#003b67] font-semibold text-lg">Contribute Now!</h2>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm text-gray-300">Amount you want to contribute</label>
          <div className="relative w-full">
            <input
              type="number"
              step="0.001"
              placeholder="e.g. 0.1"
              {...register("donationAmount", { required: "Donation Amount is required" })}
              className="w-full pr-14 px-3 py-2 bg-black border border-[#003b67] text-zinc-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-[#003b67]
                      appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none 
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-moz-appearance]:textfield"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#003b67] font-medium text-sm">
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
                    <div className="flex items-center justify-center gap-2  w-full bg-[#003b67] transition-colors text-zinc-300 py-2 rounded-md font-semibold">
                      <Loader2 className="animate-spin " />
                      <span >Pending...</span>
                    </div>
                  )
                  :
                  (<button
                    type="submit"
                    className="w-full bg-[#003b67] hover:bg-[#002847] transition-colors text-zinc-300 py-2 rounded-md font-semibold"
                  >
                    Donate
                  </button>
                  )

              )
          }

        </form>
      </div>
    </div>
  )
}

export default RightSection