"use client";

import React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { X, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import card from "@/assets/pricing/Card.svg";
import paypal from "@/assets/pricing/PayPal.svg";
import google from "@/assets/pricing/G-pay.svg";
import apple from "@/assets/pricing/A-pay.svg";
import Image from "next/image";
import tick from "@/assets/pricing/Frame.svg";
import { Switch } from "./ui/switch";

type PaymentMethod = "card" | "paypal" | "gpay" | "applepay";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  features: string[];
  monthlyPrice: number;
  annualPrice: number;
}

function PaymentMethodButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 px-4 py-2 bg-[#FFFFFF1A] rounded-lg text-sm font-medium transition-colors",
      )}
    >
      <span
        className={cn(
          "h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
        )}
      >
        {active && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
      <span className="text-[12px]">{label}</span>

      <div className="relative w-10 h-10 ">
        <Image src={icon} alt="spk" fill className="object-contain" />
      </div>
    </button>
  );
}

export function CheckoutModal({
  open,
  onOpenChange,
  planName,
  features,
  monthlyPrice,
  annualPrice,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isAnnual, setIsAnnual] = useState(true);
  const currentPrice = isAnnual ? annualPrice : monthlyPrice * 12;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl h-[90vh] bg-[#262626] border-[#525252] rounded-2xl p-0 gap-0 overflow-y-auto [&>button]:hidden">
        <div className=" px-8 pt-8 pb-6 relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 h-8 w-8 rounded-full border border-2 border-white flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[#222] transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <DialogTitle className="text-2xl font-bold text-foreground text-center mb-1">
            Ready To Go Pro?
          </DialogTitle>
          <DialogDescription className="text-[#999] text-center text-sm">
            Unlock Premium Features And Start Creating
            <br />
            Watermark-Free Videos Today.
          </DialogDescription>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-8 ">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-foreground mb-5">
              Get <span className="uppercase">{planName}</span> Plan
            </h3>

            <div className="mb-5">
              <Label className="text-md font-semibold text-foreground mb-3 block">
                Payment method
              </Label>
              <div className="flex flex-wrap gap-2">
                <PaymentMethodButton
                  label="Card"
                  icon={card}
                  active={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                />
                <PaymentMethodButton
                  label=""
                  icon={paypal}
                  active={paymentMethod === "paypal"}
                  onClick={() => setPaymentMethod("paypal")}
                />
                <PaymentMethodButton
                  label=""
                  icon={google}
                  active={paymentMethod === "gpay"}
                  onClick={() => setPaymentMethod("gpay")}
                />
                <PaymentMethodButton
                  label=""
                  icon={apple}
                  active={paymentMethod === "applepay"}
                  onClick={() => setPaymentMethod("applepay")}
                />
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="flex flex-col gap-4">
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-2 block">
                    Cardholder
                  </Label>
                  <Input
                    placeholder="Name on card"
                    className="bg-[#FFFFFF1A] border-[#FFFFFF1A] text-foreground h-10"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-2 block">
                    Card number
                  </Label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Input
                        placeholder="0000 0000 0000 0000"
                        className="bg-[#FFFFFF1A] border-[#FFFFFF1A]  text-foreground h-10 pr-10"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      placeholder="MM/YY"
                      className="bg-[#FFFFFF1A] border-[#FFFFFF1A]  text-foreground h-10 w-24"
                    />
                    <Input
                      placeholder="CVV"
                      className="bg-[#FFFFFF1A] border-[#FFFFFF1A]  text-foreground h-10 w-20"
                    />
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === "paypal" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-2 block">
                    PayPal Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="bg-[#FFFFFF1A] border-[#FFFFFF1A] text-foreground h-10 placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "gpay" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-2 block">
                    Google Pay Email or Phone
                  </Label>
                  <Input
                    placeholder="name@gmail.com"
                    className="bg-[#FFFFFF1A] border-[#FFFFFF1A] text-foreground h-10 placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "applepay" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-2 block">
                    Apple ID
                  </Label>
                  <Input
                    placeholder="name@icloud.com"
                    className="bg-[#FFFFFF1A] border-[#FFFFFF1A] text-foreground h-10 placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="md:w-[400px] flex flex-col gap-5 rounded-xl p-5  border border-[#525252] overflow-y-auto">
            <div className=" ">
              <p className="text-sm font-semibold text-foreground mb-2">
                With {planName} Plan Get
              </p>
              <ul className="flex flex-col gap-1">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-[#A1A1A1]"
                  >
                    <div className="relative w-4 h-4">
                      <Image
                        src={tick}
                        alt="spk"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t-[1.5px] border-b-[1.5px] border-[#555555] py-4 ">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Billing
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Monthly</span>
                  <Switch
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                    className="bg-[#404040] border-0 data-[state=checked]:bg-[#2DD4BF] [&_span]:bg-white [&_span]:shadow-none"
                  />
                  <span className="text-sm text-muted-foreground">Annual</span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  ${currentPrice.toFixed(2)}/Year
                </span>
              </div>
              {isAnnual && (
                <p className="text-xs text-[#A1A1A1] mt-1">
                  Save 10% compared to monthly billing
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">
                Charged Today
              </span>
              <span className="text-xl font-semibold ">
                ${currentPrice.toFixed(2)}
              </span>
            </div>

            <Button className="w-full h-12 rounded-xl bg-[#00BFCD]  text-[#0a0a0a] font-semibold text-base ">
              Confirm and Pay
            </Button>

            <div className="text-[8px] text-[#D4D4D4] flex flex-col gap-1">
              <p>
                {'By clicking "Confirm and pay" you agree to our Terms of use.'}
              </p>
              <p>
                Automatic renewal: Your subscription will renew at the selected
                billing cycle rate.
              </p>
              <p>
                {
                  "Cancel: You can cancel your renewal anytime from Subscription > Plan."
                }
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
