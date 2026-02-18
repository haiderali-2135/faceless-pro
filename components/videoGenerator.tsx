"use client";

import { useEffect, useState } from "react";
import vector from "@/assets/Vector.svg";
import filmLogo from "@/assets/film-sparkle-1.svg";
import Image from "next/image";

export function VideoGenerator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 65) return 0;
        return prev + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="relative w-[220px] h-[320px] gap-12">
        <div
          className="absolute inset-0 mr-10"
          style={{
            transform: "rotate(-18.15deg)",
            transformOrigin: "bottom center",
          }}
        >
          <div className="absolute inset-0  rounded-4xl rounded-tr-[120px] border-[2.5px] border-[#525252] blur-[2px]" />

          <div className="absolute inset-0  rounded-4xl rounded-tr-[120px]   bg-[#171717]" />
        </div>
        <div
          className="absolute inset-0 mr-10  rounded-4xl rounded-tr-[120px]  border border-[2.5px] border-[#525252] bg-[#171717]"
          style={{
            transform: "rotate(-8.15deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          className="absolute inset-0 ml-10"
          style={{
            transform: "rotate(18.15deg)",
            transformOrigin: "bottom center",
          }}
        >
          <div className="absolute inset-0  rounded-4xl rounded-tl-[120px] border-[2.5px] border-[#525252] blur-[2px]" />
          <div className="absolute inset-0  rounded-4xl rounded-tl-[120px]   bg-[#171717]" />
        </div>
        <div
          className="absolute inset-0 ml-10 rounded-4xl rounded-tl-[120px] border border-[2.5px] border-[#525252] bg-[#171717] "
          style={{
            transform: "rotate(8.15deg)",
            transformOrigin: "bottom center",
          }}
        />

        <div className="absolute inset-0  rounded-4xl border border-[2.5px] border-[#737373] bg-[#171717] flex flex-col items-center justify-center gap-4 z-10 ">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-end gap-2">
            <div className="relative w-25 h-25  ">
              <Image src={vector} alt="Theme" fill className="object-contain" />
            </div>
          </div>

          <div className="relative w-14 h-14  ">
            <Image src={filmLogo} alt="Theme" fill className="object-contain" />
          </div>

          <p className="text-[#FFFFFF94] text-base">Generating video....</p>

          <div className="w-4/5 h-1.5 rounded-full bg-[#2a2a2a] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#00BFCD] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
