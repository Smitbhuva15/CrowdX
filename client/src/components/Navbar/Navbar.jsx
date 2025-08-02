"use client";
import React, { useEffect } from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { Search, TextSearch } from 'lucide-react';
import { LoadallData } from "@/lib/LoadData";
import { useDispatch } from "react-redux";


const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});

const Navbar = () => {
  const dipatch = useDispatch();

  const account = useActiveAccount();

  useEffect(() => {
    LoadallData(dipatch);
  }, [account])

  return (
    <div className="mt-8 text-white px-4 w-full">
    
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
      
        <h2 className="text-white font-extrabold xs:text-3xl whitespace-nowrap text-xl">CrowdX</h2>

       
        <div className="hidden md:block w-full  lg:max-w-md max-w-sm">
          <div className="relative">
            <input
              type="text"
              className="lg:w-full w-xs pl-12 pr-4 py-3 rounded-2xl text-black border-2 border-amber-50 focus:outline-none focus:border-[#8b5cf6] transition-all duration-300"
              placeholder="Search..."
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
              <Search />
            </div>
          </div>
        </div>

        {/* Connect Button */}
        <div>
          <ConnectButton
            client={client}
            chain={sepolia}
            wallets={[
              createWallet("io.metamask"),
              createWallet("com.coinbase.wallet"),
              createWallet("me.rainbow"),
            ]}
          />
        </div>
      </div>

     
      {/* <div className="mt-4 md:hidden w-full sm:w-80">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-2xl text-black border-2 border-amber-50 focus:outline-none focus:border-[#8b5cf6] transition-all duration-300"
            placeholder="Search..."
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
            <Search />
          </div>
        </div>
      </div> */}

    </div>

  );
};

export default Navbar;
