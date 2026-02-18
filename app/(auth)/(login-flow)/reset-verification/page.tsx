"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      console.log("Form submitted with:", email, "and OTP:", otp);
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center text-foreground ">
          Verify your Email
        </h1>
        <p className="text-center text-xs text-[#FFFFFFD4]">
          A 6-digit code has been sent to{" "}
          <span className="font-bold text-white">{email}</span>. Please enter it
          within the next 30 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="h-12 rounded-xl font-normal text-foreground  border-[#9F9FA9] focus-visible:ring-[#9F9FA9]/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full h-12 text-lg rounded-xl bg-[#00BFCD] text-[#0a0a0a] font-medium text-base hover:bg-[#00B3C1] transition-colors cursor-pointer"
          >
            Verify Email
          </Button>
          <p className="text-center text-sm text-[#FFFFFFD4]">
            {"Didn't receive the code? "}
            <Button
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                console.log("button clicked");
              }}
              className="text-foreground font-semibold underline italic text-white p-0 cursor-pointer"
            >
              Resend
            </Button>
          </p>
        </div>

        <p className="text-center text-sm ">
          <Link
            href="/forgot-password"
            className="text-foreground font-semibold underline  text-lg"
          >
            Change Email
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Page;
