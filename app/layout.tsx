import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faceless Pro",
  description: "AI Video Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${interTight.variable} font-sans antialiased`}
      >
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <StoreProvider>
            {children}

            <Toaster richColors position="top-center" theme="dark" />
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
