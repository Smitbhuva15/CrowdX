"use client";

import {
  Home,
  PlusCircle,
  Search,
  Megaphone,
  Banknote,
  HandCoins,
  Info,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"; // Update path based on your project
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearch } from "@/store/slice/campaignSlice";

const items = [
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

export function SideBar() {
  const dipatch = useDispatch();

    const[search,setSearch]=useState("");

      useEffect(()=>{
       dipatch(getSearch(search));
      },[search])
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-10 mb-10 ">
             <Link href={'/'}> <h2 className="font-extrabold xs:text-3xl whitespace-nowrap text-xl text-[#003b67]"><img src='./logo2.png' className="sm:w-28 w-24 ml-8" /> </h2></Link>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#1a1a1a] transition-all"
                      >
                        <Icon className="w-5 h-5 text-zinc-300" />
                        <span className="text-zinc-300 font-medium">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
                 <div className="w-[240px]">
                        <div className="relative">
                          <input
                            type="text"
                            className="w-[240px] pl-12 pr-4 py-3 rounded-2xl text-zinc-300 border-2  focus:outline-none border-[#003b67] transition-all duration-300 shadow-lg shadow-[#003b67]"
                            placeholder="Search ..."
                            onChange={(e)=>setSearch(e.target.value)}
                          />
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
                            <Search className="text-[#003b67] "/>
                          </div>
                        </div>
                      </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}