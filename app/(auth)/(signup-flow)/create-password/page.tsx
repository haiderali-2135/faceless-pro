"use client";
import { PasswordInput } from "@/components/passwordInput";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";

function Page() {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password1 && password === password1) {
      console.log("Form submitted ");
      router.push(`/dashboard`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-foreground mb-6">
        Create a Password
      </h1>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col gap-1 mb-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <PasswordInput
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-lg rounded-xl bg-[#00BFCD] text-[#0a0a0a] font-medium text-base hover:bg-[#00B3C1] transition-colors cursor-pointer"
        >
          Complete
        </Button>
      </form>
    </div>
  );
}

export default Page;
