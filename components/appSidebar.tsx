"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import dashboardLogo from "@/assets/film-sparkle.svg";
import videosLogo from "@/assets/video-queue-1.svg";
import creditsLogo from "@/assets/coin-stack.svg";
import pricingLogo from "@/assets/crown.svg";
import settingLogo from "@/assets/gear.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import UserProfile from "./userProfileInfo";

const navItems = [
  {
    label: "Create New Video",
    href: "/dashboard",
    icon: dashboardLogo,
  },
  {
    label: "My Videos",
    href: "/dashboard/my-videos",
    icon: videosLogo,
  },
  {
    label: "Credits",
    href: "/dashboard/credits",
    icon: creditsLogo,
  },
  {
    label: "Pricing / Upgrade",
    href: "/dashboard/pricing",
    icon: pricingLogo,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="hidden md:flex !h-full  border-r border-[#222]  bg-[#171717] p-1  overflow-hidden"
    >
      <SidebarHeader className="h-[75px] w-full bg-background mb-2" />

      <div className="py-2 px-4">
        <div className="h-[1.5px] bg-[#525252]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <div className="h-4" />
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={`h-11 transition-all duration-200 ${
                        isActive
                          ? "bg-[#525252]  "
                          : " hover:text-foreground hover:bg-[#525252]/30"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-5 w-5 shrink-0">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            fill
                            className="object-contain opacity-70"
                          />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="bg-[#262626] rounded-xl border border-[#404040] p-2 ">
          <UserProfile />
          <div className="pb-2 pt-3 px-2">
            <div className="h-[1px] bg-[#555555]" />
          </div>
          <SidebarMenuButton
            asChild
            isActive={true}
            tooltip={"Profile Settings"}
          >
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3"
            >
              <div className="relative h-5 w-5 shrink-0">
                <Image
                  src={settingLogo}
                  alt="settings"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium">Settings</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
