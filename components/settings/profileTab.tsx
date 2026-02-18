"use client";

import React from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info } from "lucide-react";
import placholderImage from "@/assets/icon-placeholder.jpg";
import google from "@/assets/google-symbol 1.svg";

interface ConnectedAccount {
  provider: string;
  icon: string;
  status: "Connected" | "Disconnected";
}

interface DeviceSession {
  os: string;
  browser: string;
  location: string;
  lastSession: string;
  isCurrentDevice?: boolean;
}

const connectedAccounts: ConnectedAccount[] = [
  {
    provider: "Google",
    icon: google,
    status: "Connected",
  },
];

const deviceSessions: DeviceSession[] = [
  {
    os: "Windows",
    browser: "Chrome Here",
    location: "119.73.780.103",
    lastSession: "This device",
    isCurrentDevice: true,
  },
];

export function ProfileTab() {
  return (
    <div className="flex-1 max-w-2xl mt-2">
      <h2 className="text-lg font-semibold text-foreground mb-2">Profile</h2>

      <div className="mb-6">
        <label className="text-sm font-semibold text-foreground block mb-2">
          Avatar
        </label>
        <div className="h-12 w-12 relative rounded-full overflow-hidden ">
          <Image
            src={placholderImage}
            alt="name"
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="text-sm font-semibold text-foreground block mb-2">
          Name
        </label>
        <Input
          defaultValue="Ayush Bhattarai"
          className="bg-[#303030] border-[#FFFFFF26]  text-foreground max-w-xs h-10"
        />
      </div>

      <div className="mb-5">
        <label className="text-sm font-semibold text-foreground block mb-2">
          Username
        </label>
        <Input
          defaultValue="user55296629"
          className="bg-[#303030] border-[#FFFFFF26] text-foreground max-w-xs h-10"
        />
      </div>

      <div className="mb-8">
        <label className="text-sm font-semibold text-foreground block mb-2">
          Email
        </label>
        <p className="text-sm text-muted-foreground">Exemple@gmail.com</p>
      </div>

      <Separator className="bg-[#FFFFFF1A] mb-8" />

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Connected accounts
        </h3>
        <p className="text-sm text-[#B0B0B0] mb-5">
          Manage the social media accounts connected to your profile for easy
          login.
        </p>

        {connectedAccounts.map((account) => (
          <div key={account.provider} className="flex items-center gap-4 mb-4">
            <div className="h-4 w-4 relative rounded-full overflow-hidden ">
              <Image src={account.icon} alt="name" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              {account.provider}
            </span>
            <span className="text-sm text-muted-foreground ml-4">
              {account.status}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto  text-xs border-[#FFFFFF33] text-[#B0B0B0]  hover:text-white"
            >
              Disconnect
            </Button>
          </div>
        ))}

        <p className="text-xs text-[#C7C7C7] mt-3">
          <span className="font-semibold text-foreground">Note:</span> This
          account is needed for login and can{"'"}t be disconnected.{" "}
          <a href="#" className="text-[#00BFCD] hover:underline">
            Contact us
          </a>{" "}
          for more info. We are working on improving this experience
        </p>
      </div>

      <Separator className="bg-[#FFFFFF1A] mb-8" />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-foreground">
            Sessions & devices
          </h3>
          <Badge
            variant="secondary"
            className="bg-[#303030] rounded-full text-muted-foreground text-xs "
          >
            1/3 devices
          </Badge>
        </div>
        <p className="text-sm text-[#B0B0B0] mb-5">
          For security reasons, each account is limited to three connected
          devices.
        </p>

        <div className=" overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-[#222]  hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs font-medium">
                  OS
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">
                  Browser
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">
                  <span className="flex items-center gap-1">
                    Location <Info className="h-3 w-3" />
                  </span>
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">
                  Last session
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deviceSessions.map((session, idx) => (
                <TableRow
                  key={idx}
                  className="border-[#222] hover:bg-[#1A1A1A]"
                >
                  <TableCell className="text-xs ">{session.os}</TableCell>
                  <TableCell className="text-xs text-[#B0B0B0]">
                    {session.browser}
                  </TableCell>
                  <TableCell className="text-xs text-[#B0B0B0]">
                    {session.location}
                  </TableCell>
                  <TableCell className="text-xs text-[#B0B0B0]">
                    {session.isCurrentDevice && (
                      <span className="inline-block h-2 w-2 rounded-full bg-[#FFF] mr-2" />
                    )}
                    {session.lastSession}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Separator className="bg-[#FFFFFF1A] mb-8" />

      <div>
        <Button
          variant="outline"
          className="text-xs border-[#FFFFFF33] text-[#B0B0B0]  hover:text-white"
        >
          Delete account
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          <span className="font-semibold text-foreground">Note:</span>{" "}
          <span className="text-[#C7C7C7]">
            Since you
            {"'"}re on an active paid plan, account deletion isn{"'"}t
            available. Please contact support to proceed.
          </span>
        </p>
      </div>
    </div>
  );
}
