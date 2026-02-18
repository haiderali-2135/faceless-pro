"use client";

import React from "react";

import { useState } from "react";

import { Trash2, LayoutGrid, Heart, Search, MonitorPlay } from "lucide-react";

import heart from "@/assets/my-videos/heart-1.svg";
import trash from "@/assets/my-videos/trash-2.svg";
import search from "@/assets/my-videos/magnifier.svg";

import VideoCard from "@/components/videoCard";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type AspectFilter = "9:16" | "16:9" | "all";

interface VideoGroup {
  id: string;
  prompt: string;
  aspectRatio: string;
  date: string;
  thumbnails: { src: string; alt: string }[];
}

const videoGroups: VideoGroup[] = [
  {
    id: "1",
    prompt:
      "Floating island with a crystal waterfall, ethereal glow, hyper-realistic, Ghibli style.",
    aspectRatio: "16:9",
    date: "Today",
    thumbnails: [
      { src: "/videos/v-1.mp4", alt: "Floating island 1" },
      { src: "/videos/v-2.mp4", alt: "Floating island 2" },
      { src: "/videos/v-3.mp4", alt: "Floating island 3" },
    ],
  },
  {
    id: "2",
    prompt:
      "Floating island with a crystal waterfall, ethereal glow, hyper-realistic, Ghibli style.",
    aspectRatio: "9:16",
    date: "Today",
    thumbnails: [
      { src: "/videos/shorts/s-1.mp4", alt: "Floating island wide 1" },
      { src: "/videos/shorts/s-1.mp4", alt: "Floating island wide 2" },
      { src: "/videos/shorts/s-1.mp4", alt: "Floating island wide 3" },
    ],
  },
];

export default function MyVideosPage() {
  const [activeFilter, setActiveFilter] = useState<AspectFilter>("all");

  const filteredGroups =
    activeFilter === "all"
      ? videoGroups
      : videoGroups.filter((g) => g.aspectRatio === activeFilter);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-[1.5px] border-[#525252] pb-4 mb-4 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold text-foreground">My Videos</h1>

        <div className="flex items-center gap-2">
          <FilterToggle
            label="9:16"
            isActive={activeFilter === "9:16"}
            onClick={() =>
              setActiveFilter(activeFilter === "9:16" ? "all" : "9:16")
            }
          />
          <FilterToggle
            label="16:9"
            isActive={activeFilter === "16:9"}
            onClick={() =>
              setActiveFilter(activeFilter === "16:9" ? "all" : "16:9")
            }
          />
          <FilterToggle
            label="All"
            isActive={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          />

          <div className="h-6 w-px bg-[#737373] mx-1" />

          <IconButton icon={trash} label="Delete" />

          <IconButton icon={heart} label="Favorites" />
          <IconButton icon={search} label="Search" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="rounded-xl ] bg-[#262626] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#ccc] flex-1 mr-4 line-clamp-1">
                {group.prompt}
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MonitorPlay className="h-3.5 w-3.5" />
                  {group.aspectRatio}
                </div>
                <div className="h-4 w-px bg-[#333]" />
                <span className="text-xs text-muted-foreground">
                  {group.date}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {group.thumbnails.map((thumb, idx) => {
                const aspectClass =
                  group.aspectRatio === "9:16"
                    ? "aspect-[9/16]"
                    : "aspect-[16/9]";

                return (
                  <VideoCard
                    key={idx}
                    src={thumb.src}
                    alt={thumb.alt}
                    aspectRatio={aspectClass}
                    options={true}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterToggle({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
        isActive
          ? "bg-foreground text-background border-foreground bg-[#404040]"
          : "bg-transparent text-muted-foreground border-[#333] hover:text-foreground hover:border-[#555]"
      }`}
    >
      {label !== "All" && <MonitorPlay className="h-3 w-3" />}
      {label}
    </button>
  );
}

function IconButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      className="h-8 w-8 flex items-center border border-px border-[#404040] justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-[#1A1A1A] transition-colors"
      aria-label={label}
    >
      <div className="relative w-5 h-5 ">
        <Image src={icon} alt={label} fill className="object-contain" />
      </div>
    </button>
  );
}
