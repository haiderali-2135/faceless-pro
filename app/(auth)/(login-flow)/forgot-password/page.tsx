"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      console.log("Form submitted with:", email);

      router.push(`/reset-verification?email=${encodeURIComponent(email)}`);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-foreground mb-6">
        Reset Password
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
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
          Verfiy Email
        </Button>

        <p className="text-center text-sm ">
          <Link
            href="/login"
            className="text-foreground font-semibold underline  "
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Page;
