"use client";
import React from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { Search, TextSearch } from 'lucide-react';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});

const Navbar = () => {
  return (
 <div className="mt-8 text-white px-4 w-full">

  <div className="flex justify-between items-center gap-4 flex-wrap md:flex-nowrap">
    
   
    <div className="w-full flex justify-between items-center md:hidden">
      <TextSearch />

      <ConnectButton
        client={client}
        chain={sepolia}
         modalTitle="Pixels"
        wallets={[
          createWallet("io.metamask"),
          createWallet("com.coinbase.wallet"),
          createWallet("me.rainbow"),
        ]}
      
      />
    </div>

  
    <div className="w-full md:hidden mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-extrabold text-2xl whitespace-nowrap">CrowdX</h2>

        <div className="relative w-3/5">
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-2xl text-black border-2 border-amber-50 focus:outline-none focus:border-[#8b5cf6] transition-all duration-300"
            placeholder="Search..."
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
            <Search />
          </div>
        </div>
      </div>
    </div>


    <div className="hidden md:flex w-full justify-between items-center">
      {/* CrowdX */}
      <h2 className="text-white font-extrabold text-3xl whitespace-nowrap">CrowdX</h2>

      {/* Desktop Search */}
      <div className="relative w-full max-w-md mx-4">
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3 rounded-2xl text-black border-2 border-amber-50 focus:outline-none focus:border-[#8b5cf6] transition-all duration-300"
          placeholder="Search..."
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
          <Search />
        </div>
      </div>

      {/* Connect Button */}
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
</div>




  );
};

export default Navbar;
