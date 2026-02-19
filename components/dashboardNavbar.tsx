"use client";

import React from "react";
import logo from "@/assets/logo.png";
import Stack from "@/assets/coin-stack.svg";
import { Crown, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfilePopover } from "./userProfilePopover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import dashboardLogo from "@/assets/film-sparkle.svg";
import videosLogo from "@/assets/video-queue-1.svg";
import creditsLogo from "@/assets/coin-stack.svg";
import pricingLogo from "@/assets/crown.svg";
import settingLogo from "@/assets/gear.svg";

interface DashboardNavbarProps {
  variant?: "upgrade" | "credits";
  credits?: number;
}

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

function DashboardNavbar({
  variant = "credits",
  credits = 1500,
}: DashboardNavbarProps) {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-3 pt-1 bg-transparent z-30 border-b-[1px] md:border-b-0 ">
      <div className="flex items-center gap-1">
        <Link href="/dashboard">
          <Image
            src={logo || "/placeholder.svg"}
            alt="Faceless-Logo"
            height={54}
            width={180}
            className="object-contain"
          />
        </Link>

        <SidebarTrigger className="hidden md:flex text-[#FFF]/80 hover:text-white w-[24px] h-[24px] m-4 cursor-pointer" />
      </div>

      <div className="hidden md:flex items-center gap-4">
        {variant === "upgrade" ? (
          <Button
            variant="outline"
            className="rounded-lg border-[#FFF] text-foreground border-[1.5px] hover:bg-[#FFF]/10 gap-2 px-5"
          >
            <Crown className="h-4 w-4 mr-2" /> Upgrade
          </Button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-[#FFF] border-[1.5px] hover:bg-[#FFF]/10 px-4 py-1.5">
            <Image src={Stack} alt="Stack" width={20} height={20} />
            <span className="text-sm font-medium text-foreground">
              {credits} Credits
            </span>
          </div>
        )}
        <div className="h-10 w-[1.8px] bg-[#D9D9D9]" />
        <UserProfilePopover />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[80%] max-w-[300px] bg-[#111] border-l border-[#333] p-6 overflow-y-auto"
          >
            <SheetHeader className=""></SheetHeader>

            <div className="flex flex-col gap-6 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">
                  Account
                </span>
                <UserProfilePopover />
              </div>

              <div className="h-px w-full bg-[#333]" />

              {variant === "upgrade" ? (
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-lg border-[#FFF] text-foreground border-[1.5px] hover:bg-[#FFF]/10 gap-2 h-11"
                >
                  <Crown className="h-4 w-4 mr-2" /> Upgrade
                </Button>
              ) : (
                <div className="w-full justify-center flex items-center gap-2 rounded-lg border border-[#FFF] border-[1.5px] hover:bg-[#FFF]/10 px-4 h-11">
                  <Image src={Stack} alt="Stack" width={20} height={20} />
                  <span className="text-sm font-medium text-foreground">
                    {credits} Credits
                  </span>
                </div>
              )}

              <div className="h-px w-full bg-[#333]" />

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-[#525252] text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-[#525252]/30"
                      }`}
                    >
                      <div className="relative h-5 w-5 shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          className={`object-contain ${isActive ? "opacity-100" : "opacity-70"}`}
                        />
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  );
                })}

                <Link
                  href="/dashboard/settings"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mt-2 ${
                    pathname.startsWith("/dashboard/settings")
                      ? "bg-[#525252] text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#525252]/30"
                  }`}
                >
                  <div className="relative h-5 w-5 shrink-0">
                    <Image
                      src={settingLogo}
                      alt="settings"
                      fill
                      className="object-contain opacity-70"
                    />
                  </div>
                  <span className="font-medium text-sm">Settings</span>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default DashboardNavbar;
