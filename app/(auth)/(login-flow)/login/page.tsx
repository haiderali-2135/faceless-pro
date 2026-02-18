"use client";
import { AuthFooter, SocialAuthButtons } from "@/components/authButtons";
import { PasswordInput } from "@/components/passwordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password) {
      console.log("Form submitted ");
      router.push(`/dashboard`);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-foreground mb-6">
        Welcome to FacelessPRO
      </h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
            className="h-12 rounded-xl  font-normal text-foreground  border-[#9F9FA9] focus-visible:ring-[#9F9FA9]/20"
          />
        </div>

        <div className="flex flex-col gap-2">
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
          <div className="flex justify-end mt-[-2px] mb-2">
            <Link
              href="/forgot-password"
              className="text-xs underline hover:text-foreground"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-lg rounded-xl bg-[#00BFCD] text-[#0a0a0a] font-medium text-base hover:bg-[#00B3C1] transition-colors cursor-pointer"
        >
          Login
        </Button>
      </form>

      <p className="text-center text-sm mt-4 mb-1">
        {"Don't have an account? "}
        <Link
          href="/signup"
          className="text-foreground font-semibold underline italic "
        >
          Sign up
        </Link>
      </p>

      <SocialAuthButtons />
      <div className="flex flex-col items-center gap-1 mt-6">
        <AuthFooter />
      </div>
    </div>
  );
}
