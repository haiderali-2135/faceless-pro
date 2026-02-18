"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/dashboardNavbar";
import AppSidebar from "@/components/appSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navVariant = "credits";

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col h-screen w-full bg-background">
        <DashboardNavbar variant={navVariant as "upgrade" | "credits"} />

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />

          <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
