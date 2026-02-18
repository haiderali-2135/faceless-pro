"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import placeholder from "@/assets/icon-placeholder.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Owner" | "Member";
  creditsSpend: number;
  creditsLimit: number;
}

const mockPeople: TeamMember[] = [
  {
    id: "1",
    name: "Ayush Bhattarai",
    email: "example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Owner",
    creditsSpend: 150000,
    creditsLimit: 350000,
  },
  {
    id: "2",
    name: "Ayush Bhattarai",
    email: "example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Member",
    creditsSpend: 150000,
    creditsLimit: 350000,
  },
  {
    id: "3",
    name: "Ayush Bhattarai",
    email: "example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Member",
    creditsSpend: 150000,
    creditsLimit: 350000,
  },
  {
    id: "4",
    name: "Ayush Bhattarai",
    email: "example@gmail.com",
    avatar: "/images/avatar.jpg",
    role: "Member",
    creditsSpend: 150000,
    creditsLimit: 350000,
  },
];

export function PeopleTab() {
  return (
    <div className="flex-1 w-full max-w-4xl px-4 sm:px-0 py-2 mb-12">
      <h2 className="text-lg font-semibold text-foreground mb-2">People</h2>

      <Table className=" bg-[#171717] overflow-hidden ">
        <TableHeader className="h-14">
          <TableRow className="border-[#262626] ">
            <TableHead className="text-[#A1A1A1] font-normal p-3">
              Members
            </TableHead>
            <TableHead className="text-[#A1A1A1] font-normal p-3">
              Role
            </TableHead>
            <TableHead className="text-[#A1A1A1] font-normal p-3">
              Credits used
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPeople.map((person) => {
            const creditPercentage =
              (person.creditsSpend / person.creditsLimit) * 100;
            return (
              <TableRow
                key={person.id}
                className=" border-px  border-[#262626] hover:bg-[[#262626]/10 transition-colors"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={placeholder}
                      alt={person.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-normal text-foreground truncate">
                        {person.name}
                      </p>
                      <p className="text-xs text-[#D4D4D4] truncate">
                        {person.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-normal py-4">
                  {person.role}
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs w-full">
                      <span className="font-normal">
                        Spend{" "}
                        <span className="font-semibold">
                          {person.creditsSpend.toLocaleString()}{" "}
                        </span>
                      </span>

                      <span className="font-normal">
                        Limit{" "}
                        <span className="font-bold">
                          {person.creditsLimit.toLocaleString()}
                        </span>
                      </span>
                    </div>
                    <Progress
                      value={creditPercentage}
                      className="h-1.5 bg-[#404040] [&>*]:bg-[#00BFCD]"
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
