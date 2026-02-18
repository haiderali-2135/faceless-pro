"use client";
import Image from "next/image";
import React from "react";
import placholderImage from "@/assets/icon-placeholder.jpg";
import crown from "@/assets/black-crown.svg";

interface UserProfileProps {
  name?: string;
  email?: string;
  plan?: string;
  avatarUrl?: string | null;
}

function UserProfile({
  name = "John Doe",
  email = "example@gmail.com",
  plan = "Pro",
  avatarUrl,
}: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 ">
      <div className="h-12 w-12 relative rounded-full overflow-hidden ">
        <Image
          src={avatarUrl || placholderImage}
          alt={name}
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">{name}</p>
        <p className="text-xs text-[#D4D4D4] text-muted-foreground truncate">
          {email}
        </p>
      </div>
      <span className="flex items-center gap-1 bg-[#d4a017] text-[#0a0a0a] text-xs font-bold px-2 py-1 rounded-full">
        <Image src={crown} alt="Stack" width={15} height={15} />
        {plan}
      </span>
    </div>
  );
}

export default UserProfile;
