"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNaira } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Dot, Eye, EyeOff, PiggyBank, Send } from "lucide-react";
import { useEffect, useState } from "react";

const BALANCE_VISIBILITY_COOKIE = "balance_visibility";
const ACCOUNTBALANCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

type Props = React.HTMLAttributes<HTMLElement> & {};

const VirtualAccount = ({ className, ...props }: Props) => {
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const cookieValue = getCookieValue(BALANCE_VISIBILITY_COOKIE);
    if (cookieValue !== null) {
      setShowBalance(cookieValue === "true");
    }
  }, []);

  const toggleBalanceVisibility = () => {
    const newVisibility = !showBalance;
    setShowBalance(newVisibility);
    setCookie(
      BALANCE_VISIBILITY_COOKIE,
      String(newVisibility),
      ACCOUNTBALANCE_COOKIE_MAX_AGE
    );
  };

  const getCookieValue = (name: string) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  const setCookie = (name: string, value: string, maxAge: number) => {
    document.cookie = `${name}=${value};max-age=${maxAge};path=/`;
  };

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Premier</CardTitle>
        <CardDescription className="inline-flex items-center">
          0546854587 <Dot className="size-4" /> Virtual Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 items-end justify-between">
        <div className="inline-flex gap-1.5">
          <Button
            size="icon"
            className="size-8 bg-chart-1/20 hover:bg-chart-1/40 text-chart-1 rounded-full"
            onClick={toggleBalanceVisibility}
          >
            {showBalance ? <Eye /> : <EyeOff />}
          </Button>
          <Button
            size="icon"
            className="size-8 bg-chart-3/20 hover:bg-chart-3/40 text-chart-3 rounded-full"
          >
            <Send />
          </Button>
          <Button
            size="icon"
            className="size-8 bg-chart-2/20 hover:bg-chart-2/40 text-chart-2 rounded-full"
          >
            <PiggyBank />
          </Button>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Available Balance</p>
          <p className="font-medium">
            {showBalance ? formatNaira(200000) : "***"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { VirtualAccount };
