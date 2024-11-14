"use client";

// import { Dot, Eye } from "lucide-react";
import { GanttChart, Smartphone, UserRoundPlus } from "lucide-react";
import { useEffect } from "react";

import { Cards } from "@/app/_comp/cards";
import { VirtualAccount } from "@/app/_comp/virtual-account";
import { layoutVariants } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { useTelegramWebApp } from "@/hooks/use-telegram-web-app";
import { cn } from "@/lib/utils";

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
    <main className={cn(layoutVariants(), "space-y-3 sm:space-y-4")}>
      {/* User Welcome Section */}
      {userData && (
        <h1 className="text-xl font-semibold">
          Welcome, {userData.first_name}!
        </h1>
      )}

      {/* Quick Actions */}
      {/* <section
        className={cn(
          layoutVariants({ variant: "card" }),
          "grid-cols-3 md:grid-cols-3"
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Premier</CardTitle>
            <CardDescription className="inline-flex items-center">
              0546854587 <Dot className="size-4" /> Virtual Account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-1.5 items-end justify-between">
            <div className="inline-flex gap-1.5">
              <Button
                size={"icon"}
                className="size-8 bg-chart-1/20 hover:bg-chart-1/40 rounded-full"
              >
                <Eye className="text-chart-1" />
              </Button>
              <Button size={"sm"} className="h-8" variant={"outline"}>
                Fund
              </Button>
            </div>
            <div>
              <small className="text-xs text-muted-foreground">
                Available Balance
              </small>
              <p className="font-medium">{formatNaira(200000)}</p>
            </div>
          </CardContent>
        </Card>
      </section> */}

      <section className={cn(layoutVariants({ variant: "card" }))}>
        {/* Virtual Account Card */}
        <VirtualAccount />

        {/* Quick Action Grid */}
        <div className="md:col-span-2 grid grid-cols-3 items-center gap-3 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <Button
            // variant="outline"
            className="bg-chart-1/20 hover:bg-chart-1/40 text-chart-1 [&_svg]:size-7 py-4 h-auto flex-col"
            onClick={() => {
              /* handle airtime/data */
            }}
          >
            <Smartphone />
            Airtime / Data
          </Button>

          <Button
            className="bg-chart-5/20 hover:bg-chart-5/40 text-chart-5 [&_svg]:size-7 py-4 h-auto flex-col"
            onClick={() => {
              /* handle new dependent */
            }}
          >
            <UserRoundPlus />
            New Dependent
          </Button>

          <Button
            className="bg-chart-2/20 hover:bg-chart-2/40 text-chart-2 [&_svg]:size-7 py-4 h-auto flex-col"
            onClick={() => {
              /* handle new venture */
            }}
          >
            <GanttChart />
            New Venture
          </Button>
        </div>
      </section>

      {/* Overview from the other pages/core features*/}
      <Cards />
    </main>
  );
}
