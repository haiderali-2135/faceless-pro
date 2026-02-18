"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import VideoCard from "./videoCard";

const regularVideos = [
  { id: 1, src: "/videos/v-1.mp4", alt: "Cinematic Showcase" },
  { id: 2, src: "/videos/v-2.mp4", alt: "Landscape Drone Shot" },
  { id: 3, src: "/videos/v-3.mp4", alt: "Tech Review Intro" },
  { id: 4, src: "/videos/v-4.mp4", alt: "Nature Documentary" },
  { id: 5, src: "/videos/v-5.mp4", alt: "Lifestyle Vlog" },
  { id: 6, src: "/videos/v-6.mp4", alt: "Commercial Ad" },
];

const shortsVideos = [
  { id: 1, src: "/videos/shorts/s-1.mp4", alt: "Viral TikTok Trend" },
  { id: 2, src: "/videos/shorts/s-1.mp4", alt: "Quick Recipe" },
  { id: 3, src: "/videos/shorts/s-1.mp4", alt: "Fitness Tips" },
  { id: 4, src: "/videos/shorts/s-1.mp4", alt: "Behind the Scenes" },
  { id: 5, src: "/videos/shorts/s-1.mp4", alt: "Travel Highlight" },
  { id: 6, src: "/videos/shorts/s-1.mp4", alt: "Funny Skit" },
];

type GalleryTab = "video" | "shorts";

export function VideoGallery() {
  const [activeTab, setActiveTab] = useState<GalleryTab>("video");

  const activeItems = activeTab === "video" ? regularVideos : shortsVideos;

  return (
    <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Anything to Video
      </h2>

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setActiveTab("video")}
          className={cn(
            "text-sm font-medium pb-0.5 transition-colors",
            activeTab === "video"
              ? "text-foreground underline underline-offset-4 "
              : "text-[#FFFFFFB0] hover:text-foreground",
          )}
        >
          Video
        </button>
        <div className="h-4 w-px bg-[#D4D4D4]" />
        <button
          onClick={() => setActiveTab("shorts")}
          className={cn(
            "text-sm font-medium pb-0.5 transition-colors",
            activeTab === "shorts"
              ? "text-foreground underline underline-offset-4 "
              : "text-[#FFFFFFB0] hover:text-foreground",
          )}
        >
          Shorts
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {activeItems.map((item) => (
          <VideoCard
            key={item.id}
            src={item.src}
            aspectRatio={
              activeTab === "shorts" ? "aspect-[9/16]" : "aspect-[4/3]"
            }
          />
        ))}
      </div>
    </div>
  );
}
