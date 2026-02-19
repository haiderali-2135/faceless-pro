"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="absolute inset-0 z-0">
        {!isVideoLoaded && (
          <div className="absolute inset-0">
            <Image
              src="/images/home_image.jpg"
              alt="Background placeholder"
              fill
              priority
              className="object-cover opacity-60"
            />
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isVideoLoaded ? "opacity-60" : "opacity-0"
          }`}
        >
          <source src="/home-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground ">
            From Idea To Video In Minutes
          </h1>
          <p className="text-xl text-white w-full font-medium leading-relaxed px-12">
            Enter a prompt or script and let AI generate visuals, voiceover,
            motion, and captions automatically.
          </p>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="rounded-full bg-[#00BFCD] text-[#0a0a0a] font-medium text-base hover:bg-[#00838D] hover:text-shadow-md h-10 px-4 py-4"
            >
              <Link href="/login">Start Free Now</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
