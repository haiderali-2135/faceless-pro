"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import stars from "@/assets/pricing/stars.svg";
import frame from "@/assets/pricing/Frame.svg";
import Image from "next/image";

interface PricingCardProps {
  badge: string;

  price: string;
  priceLabel?: string;
  buttonLabel: string;
  features: string[];
  isPopular?: boolean;
  onSelect?: () => void;
}

export function PricingCard({
  badge,

  price,
  priceLabel = "per month",
  buttonLabel,
  features,
  isPopular = false,
  onSelect,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col w-[280px] shrink-0 h-auto transition-all duration-200 rounded-3xl",
        isPopular
          ? " border-[1.5px] border-[#00BFCD] bg-gradient-to-br from-[#2DD4BF]/40 from-0% via-[#0D1116] via-20% to-[#171717]"
          : " border-px border-[#4B4C5C] bg-[#171717] ",
      )}
    >
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <Badge className="bg-[#00BFCD] text-[#000000] font-semibold px-2 py-0.5  flex items-center gap-1 text-xs border-px border-[#FFFFFF5C] rounded-full">
            <div className="relative w-3 h-3 ">
              <Image src={stars} alt="spk" fill className="object-contain" />
            </div>
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="flex flex-col gap-4 items-center">
        <div>
          <Badge className="text-xs px-3 py-1 bg-[#00BFCD21] text-[#00BFCD] font-normal">
            {badge}
          </Badge>
        </div>

        <div className="flex items-baseline gap-2">
          <CardTitle className="text-4xl font-semibold">{price}</CardTitle>
          {priceLabel && (
            <CardDescription className="text-sm text-[#A1A1A1] font-medium">
              {priceLabel}
            </CardDescription>
          )}
        </div>

        <Button
          onClick={onSelect}
          className={cn(
            "w-full rounded-lg font-normal h-10 mt-2 transition-all duration-200 cursor-pointer",
            isPopular ? "bg-[#00BFCD] text-[#0a0a0a] " : "bg-[#314158]  ",
          )}
        >
          {buttonLabel}
        </Button>
      </CardHeader>

      <CardContent className="flex-1 ">
        <p className="text-sm font-medium tracking-wider mb-2">Key Features:</p>
        <ul className="flex flex-col gap-1">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs font-normal text-[#A1A1A1]"
            >
              <div className="mt-1 min-w-[18px]">
                <div className="relative w-3 h-3 ">
                  <Image
                    src={frame}
                    alt="spk"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
