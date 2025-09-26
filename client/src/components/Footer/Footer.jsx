import { Github, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  Home,
  PlusCircle,
  Megaphone,
  Banknote,
  HandCoins,
  Info,
} from "lucide-react";
import Image from 'next/image';

export const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Create Campaign",
    url: "/CreatCampaign",
    icon: PlusCircle,
  },

  {
    title: "Launchpad",
    url: "/lanchpad",
    icon: Megaphone,
  },
  {
    title: "Withdraw Funds",
    url: "/withdraw",
    icon: Banknote,
  },
  {
    title: "Refund Donation",
    url: "/refund",
    icon: HandCoins,
  },
  {
    title: "More Info",
    url: "/info",
    icon: Info,
  },
];

const Footer = () => {
    return (
    <footer className="bg-black text-zinc-300">
      <div className="bg-[#1e1f24] px-4 py-6">

        {/* Logo */}
        <div className="text-center py-6">
          <Link href="/" className="flex justify-center">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={192}
              height={64}
              className="sm:w-48 w-36 transition-colors"
            />
          </Link>
        </div>

        {/* Static Nav Links */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-10 mb-4">
          <Link href="/" className="transition-colors">Home</Link>
          <a
            href="https://github.com/Smitbhuva15/CrowdX"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
          >
            GitHub
          </a>
          <Link href="/info" className="transition-colors">About</Link>
        </div>

        {/* Dynamic Nav Links */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-7 pb-6">
          {items.map(item => (
            <Link key={item.id} href={item.url} className="transition-colors">
              {item.title}
            </Link>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4 sm:w-[90%] sm:mx-auto">
          <p className="text-sm text-zinc-400 text-center sm:text-left">
            Designed & Developed by <span className="font-extrabold">Smit Bhuva</span>
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/Smitbhuva15"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#003b67] hover:bg-[#002847] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/smit-bhuva-1007ba314/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#003b67] hover:bg-[#002847] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <Link
              href="/"
              className="p-2 rounded-full bg-[#003b67] hover:bg-[#002847] transition-colors"
            >
              <Globe className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
