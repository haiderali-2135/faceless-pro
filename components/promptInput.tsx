"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, Settings2, XIcon } from "lucide-react";

// Assets
import fileLogo from "@/assets/diagonal-rounded-link-1.svg";
import filterLogo from "@/assets/filter-2.svg";
import videoLogo from "@/assets/video-library.svg";
import voiceLogo from "@/assets/voice-chat-bubble-circle.svg";
import landscapeLogo from "@/assets/film-play-horizontal.svg";
import portraitLogo from "@/assets/film-verticaly-play.svg";
import enhanceLogo from "@/assets/prompt-sparkle.svg";
import infoLogo from "@/assets/info-circle.svg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PromptInputProps {
  onSubmit?: (prompt: string, files?: File[]) => void;
  hideInfo?: boolean;
  inChat?: boolean;
}

export function PromptInput({ onSubmit, hideInfo = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9">("9:16");

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if ((prompt.trim() || attachedFiles.length > 0) && onSubmit) {
      onSubmit(prompt, attachedFiles);
      setPrompt("");
      setAttachedFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/"),
      );
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
    // Reset input so the same file can be re-uploaded if removed
    if (e.target) e.target.value = "";
  };

  const removeFile = (indexToRemove: number) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/"),
      );
      setAttachedFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-2xl border border-[2px] transition-colors duration-200 py-3 px-4 ${
          isDragging
            ? "border-[#00BFCD] bg-[#1A1A1A]/80"
            : "border-[#C5C5C5] bg-[#1A1A1A]"
        }`}
      >
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {attachedFiles.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="relative h-16 w-16 rounded-lg overflow-hidden border border-[#404040] group bg-black"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Attachment preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Tell us what the video is about, your perspective, and how you want it made."
          className="w-full bg-transparent text-foreground placeholder:text-[#FFFFFF94] text-sm resize-none outline-none min-h-[60px] leading-relaxed"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <div className="mt-2">
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ToolbarIconButton
                icon={fileLogo}
                label="Attach file"
                onClick={triggerFileInput}
              />
              <ToolbarIconButton icon={filterLogo} label="Settings" />

              <div className="h-5 w-px bg-[#D4D4D4] mx-2" />

              <button className="flex items-center gap-1.5 hover:text-foreground text-sm px-2 py-1.5 rounded-lg hover:bg-[#222] transition-colors">
                <div className="relative w-5 h-5">
                  <Image
                    src={videoLogo}
                    alt="Theme"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>Video Theme</span>
                {!hideInfo && (
                  <div className="relative w-3 h-3">
                    <Image
                      src={infoLogo}
                      alt="Theme"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </button>

              <button className="flex items-center gap-1.5 hover:text-foreground text-sm px-2 py-1.5 rounded-lg hover:bg-[#222] transition-colors">
                <div className="relative w-5 h-5">
                  <Image
                    src={voiceLogo}
                    alt="Voice"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>Voice</span>
              </button>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAspectRatio("9:16")}
                  className={`flex items-center gap-1 text-xs px-2 py-1.5 border border-[#404040] rounded-md transition-colors ${
                    aspectRatio === "9:16"
                      ? "bg-[#525252] text-foreground border-[#D4D4D4]"
                      : " hover:text-foreground"
                  }`}
                >
                  <div className="relative w-4 h-4">
                    <Image
                      src={portraitLogo}
                      alt=" "
                      fill
                      className="object-contain"
                    />
                  </div>
                  9:16
                </button>
                <button
                  onClick={() => setAspectRatio("16:9")}
                  className={`flex items-center gap-1 text-xs px-2 py-1.5 border border-[#404040] rounded-md transition-colors ${
                    aspectRatio === "16:9"
                      ? "bg-[#525252] text-foreground border-[#D4D4D4]"
                      : " hover:text-foreground"
                  }`}
                >
                  <div className="relative w-4 h-4">
                    <Image
                      src={landscapeLogo}
                      alt=" "
                      fill
                      className="object-contain"
                    />
                  </div>
                  16:9
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#262626] transition-colors group relative"
                  aria-label="enhance prompt"
                >
                  <div className="relative w-6 h-6">
                    <Image
                      src={enhanceLogo}
                      alt="16:9"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {!hideInfo && (
                    <div className="relative w-3 h-3">
                      <Image
                        src={infoLogo}
                        alt="Theme"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </button>

                <button
                  onClick={handleSubmit}
                  className="h-9 w-9 rounded-lg bg-[#404040] border border-[#737373] flex items-center justify-center text-foreground hover:border-2 cursor-pointer"
                  aria-label="Send prompt"
                >
                  <ArrowUp className="h-4 w-4 " />
                </button>
              </div>
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#262626] border border-transparent hover:border-[#404040] transition-colors text-muted-foreground hover:text-foreground">
                  <Settings2 className="h-5 w-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={10}
                className="w-auto bg-[#1A1A1A] border-[#333] p-4 text-foreground shadow-xl rounded-xl"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-[#333] pb-3">
                    <ToolbarIconButton
                      icon={fileLogo}
                      label="Attach file"
                      onClick={triggerFileInput}
                    />
                    <ToolbarIconButton icon={filterLogo} label="Settings" />
                    <div className="h-5 w-px bg-[#D4D4D4] mx-2" />
                    <button
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#262626] transition-colors group relative"
                      aria-label="enhance prompt"
                    >
                      <div className="relative w-5 h-5">
                        <Image
                          src={enhanceLogo}
                          alt="enhance"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 hover:text-foreground text-sm px-2 py-2 rounded-lg hover:bg-[#222] transition-colors w-full text-left">
                      <div className="relative w-5 h-5">
                        <Image
                          src={videoLogo}
                          alt="Theme"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="flex-1">Video Theme</span>
                    </button>

                    <button className="flex items-center gap-3 hover:text-foreground text-sm px-2 py-2 rounded-lg hover:bg-[#222] transition-colors w-full text-left">
                      <div className="relative w-5 h-5">
                        <Image
                          src={voiceLogo}
                          alt="Voice"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>Voice</span>
                    </button>
                  </div>

                  <div className="border-t border-[#333] pt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAspectRatio("9:16")}
                        className={`flex items-center gap-1 text-xs px-2 py-1.5 border border-[#404040] rounded-md transition-colors ${
                          aspectRatio === "9:16"
                            ? "bg-[#525252] text-foreground border-[#D4D4D4]"
                            : " hover:text-foreground"
                        }`}
                      >
                        <div className="relative w-4 h-4">
                          <Image
                            src={portraitLogo}
                            alt=" "
                            fill
                            className="object-contain"
                          />
                        </div>
                        9:16
                      </button>
                      <button
                        onClick={() => setAspectRatio("16:9")}
                        className={`flex items-center gap-1 text-xs px-2 py-1.5 border border-[#404040] rounded-md transition-colors ${
                          aspectRatio === "16:9"
                            ? "bg-[#525252] text-foreground border-[#D4D4D4]"
                            : " hover:text-foreground"
                        }`}
                      >
                        <div className="relative w-4 h-4">
                          <Image
                            src={landscapeLogo}
                            alt=" "
                            fill
                            className="object-contain"
                          />
                        </div>
                        16:9
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <button
              onClick={handleSubmit}
              className="h-9 w-9 rounded-lg bg-[#404040] border border-[#737373] flex items-center justify-center text-foreground"
              aria-label="Send prompt"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarIconButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#262626] transition-colors group relative"
      aria-label={label}
      title={label}
    >
      <div className="relative w-5 h-5">
        <Image src={icon} alt={label} fill className="object-contain" />
      </div>
    </button>
  );
}
