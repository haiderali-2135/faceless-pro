"use client";

import React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye } from "lucide-react";

interface PasswordInputProps {
  placeholder?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({
  placeholder = "**********",
  id,
  name,
  value,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="h-12 rounded-xl  font-normal text-foreground  border-[#9F9FA9] focus-visible:ring-[#9F9FA9]/20"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-foreground transition-colors"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <Eye className="h-5 w-5" />
        ) : (
          <EyeOff className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
