"use client"
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, DollarSign } from "lucide-react";
import { Banner } from "@/components/Banner/Banner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useActiveAccount } from "thirdweb/react";
import { LoadEvents } from "@/lib/LoadData";
import { ethers } from "ethers";
import { BigNumber } from "ethers"
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";

function CampaignList() {
  const dispatch = useDispatch();
  const account = useActiveAccount();

  const campaignContract = useSelector((state) => state?.campaign?.champaignContract)
  const Allchampaigns = useSelector((state) => state?.campaign?.Allchampaigns)
  console.log(Allchampaigns)

  useEffect(() => {
    LoadEvents(dispatch, campaignContract)
  }, [account])

    ;

  function getDaysLeft(deadline) {
    if (!deadline || !deadline._isBigNumber) return "N/A";

    const deadlineInSeconds = deadline.toNumber(); // or use .toString() and parseInt
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    const secondsLeft = deadlineInSeconds - currentTimeInSeconds;

    if (secondsLeft <= 0) return "Expired";

    const daysLeft = Math.ceil(secondsLeft / (60 * 60 * 24));
    return `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
  }

  return (

    <div className="bg-black min-h-screen">
      <div className="sm:pl-10 pl-5">
        <Banner title={'Open Campaigns'} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Allchampaigns.map((champaign, index) => {
            const goal = ethers.utils.formatEther(champaign?.args?.goal);
            const raised = ethers.utils.formatEther(champaign?.args?.raised);


            return (<Card key={index} className="w-[85%] mx-auto shadow-md  my-3 ">
              <CardHeader className="p-0">
                <Image
                  src={`https://a01a34bca6f20e122e10f1d5e8fd009c.ipfscdn.io/ipfs/bafybeie563y2anqb32x4uzkugbsvkmro5gpryfo7gnratxpqo6g4apiwxm/images2.jfif`}
                  alt={champaign?.args?.title}
                  width={4000}
                  height={400}

                  className="rounded-t-lg  w-full xs:h-48"
                />
              </CardHeader>

              <CardContent className="pb-1">
                <h2 className="xs:text-lg text-md font-bold text-white mb-1">{champaign?.args?.title}</h2>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <User className="w-4 h-4 text-[#8b5cf6]" />

                  {`by ${champaign?.args?.creator.slice(0, 9)}...${champaign?.args?.creator.slice(-9)}`}

                </p>
                <div className="mt-4 flex justify-between text-sm text-gray-300">
                  <div>
                    <p className="font-bold text-[#8b5cf6]">Target</p>
                    <p className="font-semibold"> {goal} ETH</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold flex items-center gap-1 justify-end text-[#8b5cf6]">
                      Raised
                    </p>
                    <p className="font-semibold">{raised} ETH</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-300">
                  <div>
                    <p className="font-bold text-[#8b5cf6]">Deadline</p>
                    <p className="font-semibold"> {getDaysLeft(champaign?.args?.deadline)}</p>
                  </div>
                  <div className="text-right mt-3">
                    {goal <= raised ? (
                      <div className="inline-flex flex-col items-end text-green-600">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="inline-flex flex-col items-end text-red-600">
                        <XCircle className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>)
          })}
        </div>
      </div>
    </div>
  );
}

export default CampaignList;
