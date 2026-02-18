"use client";

import Image from "next/image";

import coinStack from "@/assets/coin-stack.svg";
import filmVerticalLogo from "@/assets/film-verticaly-play.svg";
import filmHorizontalLogo from "@/assets/film-play-horizontal.svg";
import { VideoGenerator } from "./videoGenerator";
import sparkles from "@/assets/sparkles-2.svg";
import placholderImage from "@/assets/icon-placeholder.jpg";
import { useRef, useState } from "react";

interface ChatThreadProps {
  prompt: string;
  videoSrc?: string;
  aspectRatio?: string;
  isGenerating?: boolean;
  coinsUsed?: number;
}

export function ChatThread({
  prompt,
  videoSrc = "/videos/v-1.mp4",
  aspectRatio = "16:9",
  isGenerating = false,
  coinsUsed = 50,
}: ChatThreadProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to start
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* User message */}
      <div className="flex items-start gap-3 mb-8">
        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-[#FFFFFF] border[1.39px]">
          <Image
            src={placholderImage}
            alt="User avatar"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pt-2">
          <p className="text-sm text-foreground leading-relaxed">{prompt}</p>
        </div>
      </div>

      {/* AI response */}
      <div className="flex items-start gap-3 mb-6">
        {!isGenerating && (
          <div className="h-10 w-10 rounded-full bg-[#262626] border border-[1.39px] border-[#A1A1A1]  flex items-center justify-center flex-shrink-0">
            <div className="relative w-8 h-8 ">
              <Image
                src={sparkles}
                alt=""
                fill
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          {/* Generated image */}
          {isGenerating ? (
            /* Show Generator if generating */
            <div className="w-full flex justify-center">
              <VideoGenerator />
            </div>
          ) : (
            /* Show Result if done */
            <>
              {/* Generated image */}
              <div
                className="relative rounded-xl overflow-hidden max-w-lg mb-4 bg-black border border-[#333] group cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Optional: Dark overlay that fades out on hover */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                )}
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Image
                    src={filmVerticalLogo}
                    alt="Stack"
                    width={20}
                    height={20}
                  />
                  <span>{aspectRatio}</span>
                </div>
                <div className="h-4 w-px bg-[#333]" />
                <div className="flex items-center gap-1.5">
                  <Image src={coinStack} alt="Stack" width={20} height={20} />
                  <span> {coinsUsed} Coins Used</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
