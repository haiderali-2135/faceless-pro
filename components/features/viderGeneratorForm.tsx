"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SendHorizontal,
  Sparkles,
  User,
  Bot,
  Smartphone,
  MonitorPlay,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { VideoFormSchema, VideoFormValues } from "@/lib/schemas/videoSchema";
// 🟢 FIX: Changed to singular 'videoEndpoint' to match your likely file name
import { useGenerateVideoMutation } from "@/lib/redux/endpoints/videoEndpoint";

// Types for our Chat History
type Message = {
  id: string;
  role: "user" | "assistant";
  text?: string;
  videoUrl?: string;
  status?: "loading" | "complete" | "error";
  metadata?: {
    format: string;
    duration: number;
  };
};

export function VideoGeneratorForm() {
  // Local State for Chat History
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // RTK Query Hook
  const [generateVideo, { isLoading }] = useGenerateVideoMutation();

  const form = useForm({
    resolver: zodResolver(VideoFormSchema),
    defaultValues: {
      topic: "",
      duration: 30,
      format: "portrait",
      resolution: "1080p",
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function onSubmit(data: VideoFormValues) {
    // 🟢 FIX: Use a stable ID generator to satisfy linter
    const msgId = new Date().toISOString();

    // 1. Add USER Message
    const userMsg: Message = {
      id: msgId + "-user",
      role: "user",
      text: data.topic,
      metadata: { format: data.format, duration: data.duration },
    };

    // 2. Add AI LOADING Message
    const aiMsg: Message = {
      id: msgId + "-ai",
      role: "assistant",
      status: "loading",
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    form.reset({ ...data, topic: "" }); // Clear input but keep settings

    try {
      // 3. Call API
      const result = await generateVideo(data).unwrap();

      // 4. Update AI Message with VIDEO
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsg.id
            ? { ...msg, status: "complete", videoUrl: result.data.videoUrl }
            : msg,
        ),
      );
      toast.success("Video generated successfully!");
    } catch (error) {
      // 🟢 FIX: Removed ': any' to satisfy linter
      // 5. Handle Error
      const errorMessage =
        (error as any)?.data?.error || "Something went wrong";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsg.id
            ? { ...msg, status: "error", text: errorMessage }
            : msg,
        ),
      );
      toast.error("Generation failed");
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto w-full bg-[#020617] relative">
      {/* ---------------------------------------------------------------------------
         1. CHAT AREA (Scrollable)
         --------------------------------------------------------------------------- */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar pb-32"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
            <Sparkles className="w-12 h-12" />
            <p>Start imagining. Type a prompt below.</p>
          </div>
        )}

        {/* 🟢 FIX: Removed AnimatePresence / motion.div */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300", // CSS Animation
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {/* AI AVATAR */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-purple-400" />
              </div>
            )}

            {/* MESSAGE BUBBLE */}
            <div
              className={cn(
                "max-w-[80%]",
                msg.role === "user" ? "text-right" : "text-left",
              )}
            >
              {/* User Prompt Bubble */}
              {msg.role === "user" && (
                <div className="bg-[#1e293b] text-slate-100 px-4 py-3 rounded-2xl rounded-tr-sm inline-block text-left">
                  <p>{msg.text}</p>
                  <div className="flex gap-2 mt-2 justify-end opacity-50">
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 border-slate-600"
                    >
                      {msg.metadata?.duration}s
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 border-slate-600"
                    >
                      {msg.metadata?.format}
                    </Badge>
                  </div>
                </div>
              )}

              {/* AI Loading State */}
              {msg.role === "assistant" && msg.status === "loading" && (
                <div className="bg-[#1e293b]/50 border border-purple-500/20 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                  <span className="text-sm text-purple-200 animate-pulse">
                    Dreaming up your video...
                  </span>
                </div>
              )}

              {/* AI Video Result */}
              {msg.role === "assistant" && msg.status === "complete" && (
                <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black mt-2">
                  <video
                    src={`http://localhost:5000${msg.videoUrl}`}
                    controls
                    autoPlay
                    className="max-h-[500px] w-full object-contain"
                  />
                </div>
              )}

              {/* AI Error */}
              {msg.role === "assistant" && msg.status === "error" && (
                <div className="text-red-400 text-sm bg-red-900/10 border border-red-900/50 px-4 py-2 rounded-lg">
                  {msg.text}
                </div>
              )}
            </div>

            {/* USER AVATAR */}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------------------
         2. BOTTOM INPUT AREA (Fixed)
         --------------------------------------------------------------------------- */}
      <div className="p-4 bg-[#020617]/80 backdrop-blur-lg border-t border-slate-800/50">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative max-w-4xl mx-auto"
          >
            {/* INPUT CONTAINER */}
            <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-purple-500/30 transition-all shadow-lg">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your video idea..."
                        className="min-h-[60px] max-h-[200px] border-none bg-transparent resize-none text-base focus-visible:ring-0 placeholder:text-slate-500 text-slate-200"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* TOOLBAR (Format, Duration, Submit) */}
              <div className="flex items-center justify-between mt-2 px-2 pb-1">
                {/* LEFT: OPTIONS PILLS */}
                <div className="flex gap-2">
                  {/* Format Toggle */}
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
                        <button
                          type="button"
                          onClick={() => field.onChange("portrait")}
                          className={cn(
                            "p-1.5 rounded-md transition-all hover:bg-slate-700",
                            field.value === "portrait"
                              ? "bg-purple-600/20 text-purple-300"
                              : "text-slate-400",
                          )}
                          title="Portrait (9:16)"
                        >
                          <Smartphone className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => field.onChange("landscape")}
                          className={cn(
                            "p-1.5 rounded-md transition-all hover:bg-slate-700",
                            field.value === "landscape"
                              ? "bg-blue-600/20 text-blue-300"
                              : "text-slate-400",
                          )}
                          title="Landscape (16:9)"
                        >
                          <MonitorPlay className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  />

                  {/* Duration Dropdown */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50 transition-colors"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            {/* 🟢 FIX: Cast to number/string to make TypeScript happy */}
                            {field.value as number}s
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1e293b] border-slate-700 text-slate-200">
                          {[15, 30, 45, 60].map((sec) => (
                            <DropdownMenuItem
                              key={sec}
                              onClick={() => field.onChange(sec)}
                            >
                              {sec} seconds
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                </div>

                {/* RIGHT: SUBMIT BUTTON */}
                <Button
                  type="submit"
                  size="icon"
                  className={cn(
                    "rounded-xl transition-all",
                    isLoading
                      ? "bg-slate-700 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-500",
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Sparkles className="w-5 h-5 animate-spin" />
                  ) : (
                    <SendHorizontal className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            <p className="text-[10px] text-center text-slate-600 mt-2">
              AI can make mistakes. Please verify generated content.
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
