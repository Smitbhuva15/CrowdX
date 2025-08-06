"use client"
import { Banner } from "@/components/Banner/Banner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useActiveAccount } from "thirdweb/react";
import { LoadEvents } from "@/lib/LoadDatas";
import { MyCart } from "@/components/Cart/MyCart";
import Banner2 from "@/components/Banner/Banner2";


function CampaignList() {

  const dispatch = useDispatch();
  const account = useActiveAccount();

  const campaignContract = useSelector((state) => state?.campaign?.campaignContract)
  const Allcampaigns = useSelector((state) => state?.campaign?.Allcampaigns)
  const provider = useSelector((state) => state?.campaign?.provider);

  const isReady = provider && Object.keys(provider).length > 0 &&
    campaignContract && Object.keys(campaignContract).length > 0;

  useEffect(() => {
    if (isReady && account) {
      LoadEvents(dispatch, provider, campaignContract, 'Decore', 'nonDonor');
    }
  }, [isReady, account]);



  return (
    account ?
      (<div className="bg-black min-h-screen">
        <div className="sm:pl-10 pl-5">
          <Banner title={`Active Campaigns (${Allcampaigns?.length})`} />
        </div>
        <div>
          <MyCart Allcampaigns={Allcampaigns} />
        </div>

      </div>) : (
        <div >
          <Banner2 title={'Hey there! Connect your wallet to join the campaign experience.'} model={""} active={''} />
        </div>
      )
  );
}

export default CampaignList;
