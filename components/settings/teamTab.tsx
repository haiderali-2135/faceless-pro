"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import placholderImage from "@/assets/icon-placeholder.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TeamMember {
  name: string;
  email: string;
  avatar: string;
  role: "Owner" | "Member";
  status: "Active" | "Inactive";
}

const teamMembers: TeamMember[] = [
  {
    name: "Ayush Bhattarai",
    email: "Example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Owner",
    status: "Active",
  },
  {
    name: "Ayush Bhattarai",
    email: "Example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Member",
    status: "Active",
  },
  {
    name: "Ayush Bhattarai",
    email: "Example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Member",
    status: "Active",
  },
  {
    name: "Ayush Bhattarai",
    email: "Example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Member",
    status: "Active",
  },
];

export function TeamTab() {
  return (
    <div className="flex-1 mt-2 pb-20">
      <h2 className="text-lg font-semibold text-foreground mb-2">My Team</h2>

      <div className="border border-[#262626] overflow-hidden bg-[#171717] px-2">
        <Table>
          <TableHeader>
            <TableRow className="border-[#262626] hover:bg-transparent">
              <TableHead className="text-[#A1A1A1] text-xs font-medium">
                Members
              </TableHead>
              <TableHead className="text-[#A1A1A1] text-xs font-medium">
                Role
              </TableHead>
              <TableHead className="text-[#A1A1A1] text-xs font-medium">
                Status
              </TableHead>
              <TableHead className="text-[#A1A1A1] text-xs font-medium text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member, idx) => (
              <TableRow
                key={idx}
                className="border-[#262626] hover:bg-[#1A1A1A]"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={placholderImage}
                        alt={member.name}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {member.name}
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-foreground">
                  {member.role}
                </TableCell>
                <TableCell>
                  <Badge className="bg-[#032E15] text-[#05DF72] font-normal text-xs">
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-[#222]"
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#1A1A1A] border-[#333] text-foreground min-w-[120px]"
                    >
                      <DropdownMenuItem className="hover:bg-[#262626] focus:bg-[#262626] focus:text-foreground cursor-pointer text-sm">
                        Pause
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 hover:bg-[#262626] hover:text-red-400 focus:bg-[#262626] focus:text-red-400 cursor-pointer text-sm">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
