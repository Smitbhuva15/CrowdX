"use client"
import React from 'react'
import { ethers } from "ethers";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { User } from "lucide-react";
import { useSelector } from 'react-redux';
import Banner2 from '../Banner/Banner2';
import { Link } from 'lucide-react';

export const MyCart = () => {

    const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns)


    function getDaysLeft(deadline) {
        if (!deadline || !deadline._isBigNumber) return "N/A";

        const deadlineInSeconds = deadline.toNumber();
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);

        const secondsLeft = deadlineInSeconds - currentTimeInSeconds;

        if (secondsLeft <= 0) return "Expired";

        const daysLeft = Math.ceil(secondsLeft / (60 * 60 * 24));
        return `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
    }

    return (
        !Allcampaigns || Allcampaigns.length == 0 ? (
            <div>
                <Banner2 title={'There are currently no live campaigns.'} model={""} active={'true'} />
            </div>
        ) : (

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Allcampaigns.map((campaign, index) => {
                        const goal = ethers.utils.formatEther(campaign?.args?.goal);
                        const raised = ethers.utils.formatEther(campaign?.args?.raised);


                        return (
                            <a href={`/${campaign?.args?.id}`}>
                                <Card key={index} className="w-[85%] mx-auto shadow-md  my-3 ">
                                    <CardHeader className="p-0">
                                        <Image
                                            src={campaign?.args?.imageUrl}
                                            alt={campaign?.args?.title}
                                            width={4000}
                                            height={400}
                                            quality={100}
                                            className="rounded-t-lg  w-full xs:h-56"
                                        />
                                    </CardHeader>

                                    <CardContent className="pb-1">
                                        <h2 className="xs:text-lg text-md font-bold text-white mb-1">{campaign?.args?.title}</h2>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <User className="w-4 h-4 text-[#8b5cf6]" />

                                            {`by ${campaign?.args?.creator.slice(0, 9)}...${campaign?.args?.creator.slice(-9)}`}

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
                                                <p className="font-semibold"> {getDaysLeft(campaign?.args?.deadline)}</p>
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
                                </Card>
                            </a>
                        )
                    })}
                </div>
            </div>

        )


    )
}
