import type { Metadata } from "next";
import Script from "next/script";

import { Header } from "@/components/layout/header";
import { fontMono, fontSans } from "@/lib/font";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mini",
  description: "Telegram Mini App created with Next.js",
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
          "font-sans antialiased",
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
