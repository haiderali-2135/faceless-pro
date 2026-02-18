"use client";

import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import placholderImage from "@/assets/icon-placeholder.jpg";
import goldenCrown from "@/assets/goldenCrown.svg";
import { Button } from "./ui/button";
import Link from "next/link";
import Stack from "@/assets/coin-stack.svg";

import UserProfile from "./userProfileInfo";

interface UserProfilePopoverPropes {
  name?: string;
  email?: string;
  plan?: string;
  spent?: number;
  limit?: number;
  avatarUrl?: string | null;
  pro?: boolean;
}

export function UserProfilePopover({
  name = "John Doe",
  email = "example@gmail.com",
  plan = "Pro",
  spent = 1500,
  limit = 3500,
  avatarUrl,
  pro = true,
}: UserProfilePopoverPropes) {
  const usagePercent = Math.round((spent / limit) * 100);
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button className="relative h-[50px] w-[50px] outline-none group cursor-pointer">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(#FFF 0% 50%, #00BFCD 50% 100%)",
            }}
          />
          <div className="relative z-10 h-full w-full rounded-full overflow-hidden border-2 border-transparent">
            <Image
              src={avatarUrl || placholderImage}
              alt={name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>

          {pro && (
            <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 z-20 ">
              <Image
                src={goldenCrown}
                alt="Pro User"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-72 rounded-xl bg-[#262626] overflow-hidden flex-shrink-0 border border-[1px] border-[#404040] shadow-[0_0_0_2000px_rgba(0,0,0,0.8)]"
      >
        <UserProfile
          name={name}
          email={email}
          plan={plan}
          avatarUrl={avatarUrl}
        />
        <div className="h-px bg-[#525252] my-4" />
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Image src={Stack} alt="Stack" width={15} height={15} />
            <span className="text-xs text-[#F5F5F5] text-foreground font-medium">
              Credit Usage
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>
              Spent{" "}
              <span className="text-foreground font-semibold">
                {formatNumber(spent)}
              </span>
            </span>
            <span>
              Limit{" "}
              <span className="text-foreground font-semibold">
                {formatNumber(limit)}
              </span>
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[#333] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#00BFCD] transition-all"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
        <Button
          asChild
          className="w-full h-10 text-base rounded-xl bg-[#00BFCD] text-[#0a0a0a] font-semibold hover:bg-[#00B3C1]"
        >
          <Link href="/dashboard/pricing">Buy Credits</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num.toString();
}
