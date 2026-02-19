"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import paypal from "@/assets/billing/paypal.svg";
import Image from "next/image";

interface BillingRecord {
  cardLast4: string;
  cardMask: string;
  date: string;
  amount: string;
  provider: "paypal" | "card";
}

const billingRecords: BillingRecord[] = [
  {
    cardLast4: "0354",
    cardMask: "1452 xxxx xxxx 0354",
    date: "2 Jan, 24 - 12:00",
    amount: "$55.00",
    provider: "paypal",
  },
  {
    cardLast4: "0354",
    cardMask: "1452 xxxx xxxx 0354",
    date: "2 Jan, 24 - 12:00",
    amount: "$55.00",
    provider: "paypal",
  },
  {
    cardLast4: "0354",
    cardMask: "1452 xxxx xxxx 0354",
    date: "2 Jan, 24 - 12:00",
    amount: "$55.00",
    provider: "paypal",
  },
  {
    cardLast4: "0354",
    cardMask: "1452 xxxx xxxx 0354",
    date: "2 Jan, 24 - 12:00",
    amount: "$55.00",
    provider: "paypal",
  },
];

interface BillingHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BillingHistoryModal({
  open,
  onOpenChange,
}: BillingHistoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-[#262626] border-[#525252] rounded-3xl p-8  gap-0 [&>button]:hidden ">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <DialogTitle className="text-3xl font-bold text-foreground mb-2">
              Billing History
            </DialogTitle>
            <DialogDescription className=" text-sm">
              Check Credits Before Generating
              <br />
              Your Video.
            </DialogDescription>
          </div>

          <div className="w-full flex flex-col gap-3 max-h-[50vh] overflow-y-auto px-2">
            {billingRecords.map((record, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl bg-[#404040] border border-[#333] px-4 py-3"
              >
                <div className="relative w-6 h-6">
                  <Image
                    src={paypal}
                    alt="spk"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {record.cardMask}
                  </p>
                  <p className="text-[8px] text-[#AFAFAF]">{record.date}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {record.amount}
                </span>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full h-12 rounded-2xl border-[#9F9FA9] border-2 bg-transparent  font-normal text-sm cursor-pointer hover:text-shadow-md hover:font-semibold"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
