"use client";

import React from "react";

import { cn } from "@/lib/utils";

import logo1 from "@/assets/settings/1.svg";
import logo2 from "@/assets/settings/2.svg";
import logo3 from "@/assets/settings/3.svg";
import logo4 from "@/assets/settings/4.svg";
import Image from "next/image";

export type SettingsTab = "profile" | "my-team" | "people" | "plan-billing";

interface SettingsNavItem {
  id: SettingsTab;
  label: string;
  icon: string;
}

const settingsNavItems: SettingsNavItem[] = [
  { id: "profile", label: "Profile", icon: logo1 },
  { id: "my-team", label: "My Team", icon: logo2 },
  { id: "people", label: "People", icon: logo3 },
  {
    id: "plan-billing",
    label: "Plan & billing",
    icon: logo4,
  },
];

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  return (
    <div className="md-w-auto w-[180px] flex-shrink-0 px-2 py-4">
      <p className="text-xs text-muted-foreground mb-3 px-3">Account</p>
      <nav className="flex flex-col gap-0.5">
        {settingsNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left w-full cursor-pointer",
              activeTab === item.id
                ? "bg-[#1A1A1A] text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-[#1A1A1A]/50",
            )}
          >
            <div className="relative w-5 h-5">
              <Image
                src={item.icon}
                alt="icon"
                fill
                className="object-contain"
              />
            </div>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
