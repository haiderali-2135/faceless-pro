"use client";
import { ChatThread } from "@/components/chatThread";
import { PromptInput } from "@/components/promptInput";
import { ReviewConfirmModal } from "@/components/reviewConfirmModal";
import { VideoGallery } from "@/components/videoGallery";
import React, { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  prompt: string;
  isGenerating: boolean;
  videoSrc?: string;
  coinsUsed?: number;
}

function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePromptSubmit = (prompt: string) => {
    setPendingPrompt(prompt);
    setShowReviewModal(true);
  };

  const handleConfirmGeneration = async () => {
    setShowReviewModal(false);

    const newMessageId = Date.now().toString();

    const newMessage: ChatMessage = {
      id: newMessageId,
      prompt: pendingPrompt,
      isGenerating: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    await new Promise((resolve) => setTimeout(resolve, 4000));
    const backendVideoUrl = "/videos/v-3.mp4";

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === newMessageId
          ? {
              ...msg,
              isGenerating: false,
              videoSrc: backendVideoUrl,
            }
          : msg,
      ),
    );
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10 text-balance">
              Build Your Ideas With FacelessPRO
            </h1>
            <div className="w-full max-w-3xl mb-16">
              <PromptInput onSubmit={handlePromptSubmit} hideInfo={false} />
            </div>
            <VideoGallery />
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((msg) => (
              <ChatThread
                key={msg.id}
                prompt={msg.prompt}
                isGenerating={msg.isGenerating}
                videoSrc={msg.videoSrc}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className=" bg-background">
          <PromptInput onSubmit={handlePromptSubmit} hideInfo={true} />
        </div>
      )}

      <ReviewConfirmModal
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
        creditsUsed={50}
        creditsRemaining={20}
        onConfirm={handleConfirmGeneration}
      />
    </div>
  );
}

export default Page;
