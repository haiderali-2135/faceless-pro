"use client";
import { AuthFooter, SocialAuthButtons } from "@/components/authButtons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      console.log("Form submitted with:", email);

      router.push(`/email-verification?email=${encodeURIComponent(email)}`);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-foreground mb-6">
        Create Your FacelessPRO Account
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl  font-normal text-foreground  border-[#9F9FA9] focus-visible:ring-[#9F9FA9]/20"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-lg rounded-xl bg-[#00BFCD] text-[#0a0a0a] font-medium text-base hover:bg-[#00B3C1] transition-colors cursor-pointer"
        >
          Let&apos;s Get Started
        </Button>
      </form>

      <p className="text-center text-sm mt-4 mb-1">
        {"Already have an account? "}
        <Link
          href="/login"
          className="text-foreground font-semibold underline italic "
        >
          Login
        </Link>
      </p>

      <SocialAuthButtons />
      <div className="flex flex-col items-center gap-1 mt-6">
        <p className="text-xs italic">By signing up, you agree to our</p>
        <AuthFooter />
      </div>
    </div>
  );
}

export default Page;
