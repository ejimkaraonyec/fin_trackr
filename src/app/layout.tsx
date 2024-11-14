import type { Metadata } from "next";
import Script from "next/script";

import { Header } from "@/components/layout/header";
import { fontMono, fontSans } from "@/lib/font";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "FinTrack Pro",
  description:
    "A comprehensive financial management platform for budgeting, expense tracking, and project financial planning. Manage personal finances, track expenses, plan budgets, and monitor project costs all in one place.",
  keywords: [
    "financial management",
    "budget planning",
    "expense tracking",
    "project finance",
    "dependent accounts",
    "bill payments",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={cn(
          "grid grid-rows-[1fr_auto] min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
        <Header />
      </body>
    </html>
  );
}
