"use client"
import { createThirdwebClient, defineChain } from "thirdweb";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";


const client = createThirdwebClient({ clientId: process.env.NEXT_PUBLIC_CLIENT_ID });


export default function Home() {
  const account = useActiveAccount();

 
  return (
    <ConnectButton
      client={client}
      chain={sepolia}

      wallets={[
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),

      ]}
    />

  );
}
