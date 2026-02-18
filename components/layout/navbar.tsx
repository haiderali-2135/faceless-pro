"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-6 lg:px-10 py-2 z-50 bg-background">
      <Link href="/">
        <Image
          src={logo || "/placeholder.svg"}
          alt="Faceless-Logo"
          height={54}
          width={207}
          className="w-36 sm:w-[207px] h-auto object-contain"
        />
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Button
          asChild
          className="rounded-lg bg-white text-[#0a0a0a] font-medium hover:bg-gray-300 px-6 h-9"
        >
          <Link href="/signup">View Subscription</Link>
        </Button>

        <div className="h-9 w-[1.83px] bg-white hidden sm:block" />

        <Button
          asChild
          className="rounded-lg bg-[#00BFCD] text-[#0a0a0a] font-medium hover:bg-[#00B3C1] px-6 h-9"
        >
          <Link href="/login">Start Free Now</Link>
        </Button>
      </div>

      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="text-foreground p-1 focus:outline-none">
              <Menu className="h-7 w-7" />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[80%] max-w-[300px] bg-[#111] border-l border-[#333] p-6"
          >
            <SheetHeader className="mb-8 text-left">
              <SheetTitle className="text-lg font-bold text-white">
                Menu
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4">
              <Button
                asChild
                className="w-full justify-center rounded-lg bg-white text-[#0a0a0a] font-medium hover:bg-gray-300 h-11"
              >
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  View Subscription
                </Link>
              </Button>

              <Button
                asChild
                className="w-full justify-center rounded-lg bg-[#00BFCD] text-[#0a0a0a] font-medium hover:bg-[#00B3C1] h-11"
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Start Free Now
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
