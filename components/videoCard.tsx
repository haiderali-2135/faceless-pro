"use client";
import { cn } from "@/lib/utils";
import { Download, Heart, LayoutGrid, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import heart from "@/assets/my-videos/heart-1.svg";
import download from "@/assets/my-videos/download.svg";
import filmStar from "@/assets/my-videos/film-star-wand.svg";
import trash from "@/assets/my-videos/trash-2.svg";
import Image from "next/image";

interface VideoCardProps {
  src: string;
  aspectRatio: string;
  alt?: string;
  options?: boolean;
}

export default function VideoCard({
  src,
  aspectRatio,
  alt,
  options = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay blocking if necessary
      });
      setIsPlaying(true);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsHovered(false);
    }
  };

  return (
    <div
      title={alt}
      className={cn(
        "relative rounded-xl overflow-hidden group cursor-pointer bg-[#1A1A1A] border border-[#333]",
        aspectRatio,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {!isHovered && (
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      )}

      {options && isHovered && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10 animate-in fade-in duration-200">
          <ActionButton icon={trash} label="Delete" />
          <ActionButton icon={filmStar} label="Storyboard" />
          <ActionButton icon={download} label="Download" />
          <ActionButton icon={heart} label="Favorite" />
        </div>
      )}
    </div>
  );
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      className="h-6 w-6 rounded-md   flex items-center justify-center  hover:text-foreground  "
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        // Add specific handlers here if needed
      }}
    >
      <div className="relative w-5 h-5 ">
        <Image src={icon} alt={label} fill className="object-contain" />
      </div>
    </button>
  );
}
