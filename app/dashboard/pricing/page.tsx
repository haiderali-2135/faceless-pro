"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckoutModal } from "@/components/checkoutModal";
import { PricingCard } from "@/components/pricingCard";

interface PricingTier {
  name: string;
  badge: string;
  badgeColor: string;
  price: string;
  priceLabel: string;
  buttonLabel: string;
  features: string[];
  isPopular?: boolean;
  monthlyPrice: number;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    badge: "Best for creators",
    badgeColor: "#2DD4BF",
    price: "FREE",
    priceLabel: "Limited access",
    buttonLabel: "Get started",
    monthlyPrice: 0,
    features: [
      "15 credits per reset",
      "Shorts: 3 no-motion or 1 with motion (12h)",
      "Longform: Not included",
      "Audio: Not included",
      "Motion effects: Limited",
      "Captions: Not available",
      "Standard AI voices only",
      "Watermark applied",
    ],
  },
  {
    name: "Trial Boost",
    badge: "Trial Boost",
    badgeColor: "#2DD4BF",
    price: "$9.99",
    priceLabel: "per month",
    buttonLabel: "Upgrade to Starter",
    monthlyPrice: 9.99,
    features: [
      "250 credits per month",
      "Shorts: 30 per month",
      "Longform: Up to 20 minutes",
      "Audio: Up to 15 minutes",
      "Motion effects enabled",
      "Captions enabled",
      "Premium AI voices",
      "Priority rendering",
    ],
  },
  {
    name: "Starter",
    badge: "STARTER",
    badgeColor: "#ef4444",
    price: "$19.99",
    priceLabel: "per month",
    buttonLabel: "Upgrade to Starter",
    monthlyPrice: 19.99,
    features: [
      "500 credits per month",
      "Shorts: 100 per month",
      "Longform: Up to 30 minutes",
      "Audio: Up to 20 minutes",
      "Motion effects enabled",
      "Captions enabled",
      "Premium AI voices",
      "Monthly reset",
    ],
  },
  {
    name: "Pro",
    badge: "PRO",
    badgeColor: "#2DD4BF",
    price: "$79.99",
    priceLabel: "per month",
    buttonLabel: "Upgrade to Pro",
    isPopular: true,
    monthlyPrice: 79.99,
    features: [
      "1,600 credits per month",
      "Shorts: 600 per month",
      "Longform: Up to 180 minutes",
      "Audio: Up to 120 minutes",
      "Motion effects enabled",
      "Captions enabled",
      "Premium AI voices",
      "Priority rendering",
    ],
  },
  {
    name: "Agency",
    badge: "AGENCY",
    badgeColor: "#2DD4BF",
    price: "$149.99",
    priceLabel: "per month",
    buttonLabel: "Get started",
    monthlyPrice: 149.99,
    features: [
      "4,200 credits per month",
      "Shorts: 1,500 per month",
      "Longform: Up to 360 minutes",
      "Audio: Up to 240 minutes",
      "Motion effects enabled",
      "Captions enabled",
      "Premium AI voices",
      "Team & white-label support",
    ],
  },
];

const faqItems = [
  {
    question: "How Are Credits Used?",
    answer:
      "Credits are used when you generate a video. The number of credits depends on the video type, duration, and selected features.",
  },
  {
    question: "Do Credits Reset Every Month?",
    answer:
      "Yes, your credit allocation resets at the start of each billing cycle based on your subscription plan.",
  },
  {
    question: "Do Unused Credits Roll Over?",
    answer:
      "No, unused credits do not roll over to the next month. They reset with each billing cycle.",
  },
  {
    question: "Can I Upgrade Or Downgrade My Plan Anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "What Happens If I Run Out Of Credits?",
    answer:
      "If you run out of credits, you can purchase additional credit packs or upgrade your plan to continue generating videos.",
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  function handleSelectPlan(tier: PricingTier) {
    setSelectedPlan(tier);
    setCheckoutOpen(true);
  }

  return (
    <div className="p-6 lg:p-8 w-full mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-semibold text-foreground mb-2">Pricing</h1>
        <p className="text-xs text-[#E5E7EB]">
          Choose a plan that fits your content needs.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {pricingTiers.map((tier) => (
          <PricingCard
            key={tier.name}
            badge={tier.badge}
            price={tier.price}
            priceLabel={tier.priceLabel}
            buttonLabel={tier.buttonLabel}
            features={tier.features}
            isPopular={tier.isPopular}
            onSelect={() => handleSelectPlan(tier)}
          />
        ))}
      </div>

      <p className="text-center text-sm  mb-16">
        <span className="font-normal text-foreground">Note:</span>{" "}
        <span className="italic text-[#FFFFFFBA]">
          Credits Reset Monthly, Are Used Per Video, And Do Not Roll Over.
        </span>
      </p>

      <div className="max-w-full mx-auto mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold ">
            Frequently
            <br />
            Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqItems.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="rounded-xl border border-px border-[#373737] bg-[#0F0F0F] px-5 last:border-b"
            >
              <AccordionTrigger className="text-xl font-medium text-foreground hover:no-underline cursor-pointer">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-normal text-[#D4D4D4] leading-relaxed max-w-xl">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {selectedPlan && (
        <CheckoutModal
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          planName={selectedPlan.name}
          features={selectedPlan.features}
          monthlyPrice={selectedPlan.monthlyPrice}
          annualPrice={Number(
            (selectedPlan.monthlyPrice * 12 * 0.9).toFixed(2),
          )}
        />
      )}
    </div>
  );
}
