"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BillingHistoryModal } from "../billingHistoryModal";

export function PlanBillingTab() {
  const [billingHistoryOpen, setBillingHistoryOpen] = useState(false);

  return (
    <div className="flex-1 max-w-4xl mb-20 pt-2">
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Plan & billing
      </h2>

      <Separator className="bg-[#FFFFFF1A] mb-6" />

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Pro</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#FFFFFF33] bg-transparent text-foreground cursor-pointer text-xs"
          >
            Upgrade plan
          </Button>
        </div>
      </div>

      <Separator className="bg-[#222] mb-6" />

      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground mb-2">
          Credits
        </h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Spend <span className="font-semibold text-foreground">150k</span>
          </span>
          <span className="text-muted-foreground">
            Limit <span className="font-semibold text-foreground">350k</span>
          </span>
        </div>

        <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00BFCD] rounded-full transition-all"
            style={{ width: `${(150 / 350) * 100}%` }}
          />
        </div>
      </div>

      <Separator className="bg-[#222] mb-6" />

      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">
          Billing information
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Ayush Bhattarai
            </p>
            <p className="text-sm font-normal text-[#B0B0B0]">
              Example@gmail.com
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBillingHistoryOpen(true)}
            className="border-[#FFFFFF33] bg-transparent text-foreground  text-xs  cursor-pointer"
          >
            Billing history
          </Button>
        </div>
      </div>

      <BillingHistoryModal
        open={billingHistoryOpen}
        onOpenChange={setBillingHistoryOpen}
      />
    </div>
  );
}
