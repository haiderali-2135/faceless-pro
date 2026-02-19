"use client";

import React from "react";

import { useState } from "react";
import {
  SettingsNav,
  type SettingsTab,
} from "@/components/settings/settingsNav";
import { ProfileTab } from "@/components/settings/profileTab";
import { TeamTab } from "@/components/settings/teamTab";
import { PeopleTab } from "@/components/settings/peopleTab";
import { PlanBillingTab } from "@/components/settings/planBilling-tab";

const tabComponents: Record<SettingsTab, React.ComponentType> = {
  profile: ProfileTab,
  "my-team": TeamTab,
  people: PeopleTab,
  "plan-billing": PlanBillingTab,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="p-6 flex flex-col h-auto md:h-[calc(100vh-80px)]">
      <div className="mb-8 flex-shrink-0">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile information, team members, and billing
          preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 border-t border-b border-px border-[#FFFFFF1A] flex-1 min-h-0 ">
        <div className="flex-shrink-0 md:overflow-y-auto">
          <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="h-auto md:w-px bg-[#FFFFFF1A] " />

        <div className="flex-1 p-1 mb-2 md:overflow-y-auto md:pr-4 custom-scrollbar">
          <ActiveTabComponent />
        </div>
      </div>
    </div>
  );
}
