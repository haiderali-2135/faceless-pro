import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute opacity-50 scale-x-[-1] "
        >
          <source src="/signup-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 w-full p-1 lg:p-10 flex items-center justify-center">
        <div className="relative z-10 w-full max-w-md mx-4 lg:mr-0 lg:ml-auto">
          <div className="rounded-2xl bg-[#171717] p-8 lg:p-10 border border-[#404040] border-2 min-h-[85vh]">
            <div className="flex justify-center mb-2">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Faceless-Logo"
                height={54}
                width={207}
              />
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
