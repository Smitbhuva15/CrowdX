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
    title: "Claim Refund",
    url: "/refund",
    icon: HandCoins,
  },
   {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "More Info",
    url: "/info",
    icon: Info,
  },
];

export function SideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl font-extrabold mb-5 mt-2 text-[#8b5cf6]">
            Crowd<span className="text-white font-extrabold text-5xl">X</span>
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
                        <Icon className="w-5 h-5 text-[#8b5cf6]" />
                        <span className="text-[#8b5cf6] font-medium">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
