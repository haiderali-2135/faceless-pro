"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo.png";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Video load checker
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        {(!isMounted || isMobile || !isVideoLoaded) && (
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/login-image.jpg"
              alt="Background placeholder"
              fill
              priority
              className="object-cover opacity-60"
            />
          </div>
        )}

        {isMounted && !isMobile && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-1000 ease-in-out ${
              isVideoLoaded ? "opacity-60" : "opacity-0"
            }`}
          >
            <source src="/auth-bg.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full p-1 lg:p-6 flex items-center justify-center">
        <div className="relative z-10 w-full max-w-md mx-4 lg:mr-0 lg:ml-auto">
          <div className="rounded-2xl bg-[#171717] p-8 lg:p-10 border border-[#404040] border-2 min-h-[85vh] max-h-[90vh] overflow-y-auto">
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
