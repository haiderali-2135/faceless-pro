"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import calendar from "@/assets/credits/calendar-2.svg";
import { CreditDonut } from "@/components/creditDonut";
import Image from "next/image";
import Link from "next/link";

interface CreditUsageRow {
  label: string;
  cost: string;
}

interface ActivityRow {
  date: string;
  action: string;
  credits: string;
  status: "Success" | "Failed";
}

const creditUsage: CreditUsageRow[] = [
  { label: "Short Videos (5s)", cost: "1 Credit" },
  { label: "Long Video (30s+)", cost: "5+ Credit" },
  { label: "Motion Enhancement", cost: "2+ Credit" },
  { label: "Premium Voice", cost: "1+ Credit" },
];

const activityLog: ActivityRow[] = [
  {
    date: "Oct 10, 2:15 PM",
    action: 'Generated: "Cyberpunk city dusk"',
    credits: "-8",
    status: "Success",
  },
  {
    date: "Oct 10, 2:15 PM",
    action: "Monthly Top-up (Pro Plan)",
    credits: "-100",
    status: "Success",
  },
  {
    date: "Oct 10, 2:15 PM",
    action: 'Generated: "Cyberpunk city dusk"',
    credits: "-8",
    status: "Success",
  },
  {
    date: "Oct 10, 2:15 PM",
    action: 'Generated: "Cyberpunk city dusk"',
    credits: "-8",
    status: "Success",
  },
];

export default function CreditsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Credits</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your credit usage and remaining balance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-[1.5px] border-[#404040] bg-[#171717] p-5 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xl font-normal mb-1">Credits remaining</p>
              <p className="text-4xl font-semibold text-foreground">500</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                <div className="relative w-3.5 h-3.5 ">
                  <Image
                    src={calendar}
                    alt="date"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs">
                  Renewing on{" "}
                  <span className="font-semibold text-foreground italic">
                    Oct 12, 2026
                  </span>
                </span>
              </div>
            </div>
            <CreditDonut used={500} total={1600} size={50} />
          </div>
          <Link href="/dashboard/pricing">
            <Button
              variant="outline"
              className="w-full mt-4 rounded-lg border-[1.5px] border-[#525252] bg-[#525252] text-foreground hover:bg-[#222]"
            >
              Add credits
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-[1.5px] border-[#404040] bg-[#171717] p-5 flex flex-col justify-between h-full">
          <div>
            <p className="text-xl font-normal mb-1">Current Plan</p>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-3xl font-semibold text-foreground">
                Pro Monthly
              </p>
              <Badge className="bg-[#00BFCD2B] text-[#00BFCD] rounded-sm ">
                Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Next billing:{" "}
              <span className="font-semibold text-foreground">$79.99</span>
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 rounded-lg border-[1.5px] border-[#525252] bg-[#171717] text-foreground hover:bg-[#525252]"
          >
            Manage Plan
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-[1.5px] border-[#404040]  p-5 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          How credits are used
        </h2>
        <div className="flex flex-col gap-2">
          {creditUsage.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg bg-[#262626] border border-[#222] px-4 py-2"
            >
              <span className="text-sm text-foreground">{row.label}</span>
              <span className="text-xs text-muted-foreground">{row.cost}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Credit Activity
        </h2>
        <div className="rounded-xl border border-[1.5px] border-[#404040] bg-[#171717] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#262626] ">
              <TableRow className="border-[#404040] text-xs font-base text-muted-foreground text-[#A1A1A1] ">
                <TableHead className="">Date</TableHead>
                <TableHead className="">Action</TableHead>
                <TableHead className="">Credits used</TableHead>
                <TableHead className="">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((row, idx) => (
                <TableRow key={idx} className="border-[#262626]  ">
                  <TableCell className="text-xs font-base text-foreground">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-xs font-base text-foreground">
                    {row.action}
                  </TableCell>
                  <TableCell className="text-xs font-base text-red-400 ">
                    {row.credits}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/20 text-[#05DF72] hover:bg-green-500/20 ">
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
