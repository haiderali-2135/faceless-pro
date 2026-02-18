"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import appleLogo from "@/assets/Icon - Apple.svg";
import googleLogo from "@/assets/google-symbol 1.svg";
import Link from "next/link";

export function SocialAuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-[#737373]" />
        <span className="text-sm text-[#D4D4D4]">OR</span>
        <div className="flex-1 h-px bg-[#737373]" />
      </div>

      <Button
        variant="outline"
        className="w-full h-12 rounded-xl border-[#71717B] border-[1.5px] bg-[#18181B] cursor-pointer text-foreground hover:bg-[#222] justify-start gap-3 px-5"
      >
        <Image src={appleLogo || "/placeholder.svg"} alt="Faceless-Logo" />
        Continue with Apple
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 rounded-xl border-[#71717B] border-[1.5px] bg-[#18181B] cursor-pointer text-foreground hover:bg-[#222] justify-start gap-3 px-5"
      >
        <Image src={googleLogo || "/placeholder.svg"} alt="Google-Logo" />
        Continue with Google
      </Button>
    </div>
  );
}

export function AuthFooter() {
  return (
    <div className="flex items-center gap-3 text-xs">
      <Link href="#" className="text-[#ccc] underline hover:text-foreground">
        Term of Use
      </Link>
      <span className="text-[#555]">|</span>
      <Link href="#" className="text-[#ccc] underline hover:text-foreground">
        Privacy Policy
      </Link>
    </div>
  );
}
