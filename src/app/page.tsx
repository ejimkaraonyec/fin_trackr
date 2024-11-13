"use client";

import { layoutVariants } from "@/components/shell";
import { useTelegramWebApp } from "@/hooks/use-telegram-web-app";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

// const userData = { first_name: "RD", username: "ritchmont", photo_url: "" };
export default function Home() {
  const webApp = useTelegramWebApp();
  const userData = webApp?.initDataUnsafe.user;

  useEffect(() => {
    if (webApp) {
      // Configure initial Telegram WebApp settings
      webApp.expand(); // Expand the app by default for better visibility
      webApp.MainButton.hide(); // Hide the MainButton since we're using custom navigation
    }
  }, [webApp]);

  return (
    <main className={cn(layoutVariants())}>
      {/* User Welcome Section */}
      {userData && (
        <div className="mb-6">
          <h1 className="text-xl font-semibold">
            Welcome back, {userData.first_name}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s your financial overview
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <QuickActionCard title="Monthly Goal" value="₦50,000" progress={65} />
        <QuickActionCard
          title="Available Balance"
          value="₦123,456"
          subtext="Virtual Account"
        />
      </div>

      {/* Activity Overview */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        {/* <ActivityChart /> */}
      </section>
    </main>
  );
}

interface QuickActionCardProps {
  title: string;
  value: string;
  progress?: number;
  subtext?: string;
}

const QuickActionCard = ({
  title,
  value,
  progress,
  subtext,
}: QuickActionCardProps) => {
  return (
    <div className="p-4 rounded-lg bg-card border shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {progress !== undefined && (
        <div className="mt-2">
          <div className="h-2 bg-muted rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {progress}% achieved
          </p>
        </div>
      )}
      {subtext && (
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      )}
    </div>
  );
};
