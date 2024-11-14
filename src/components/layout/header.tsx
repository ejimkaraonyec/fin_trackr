"use client";

import {
  ClipboardList,
  // GanttChart,
  Home,
  PieChart,
  Receipt,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { layoutVariants } from "@/components/shell";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {};

const links = [
  {
    label: "Budgeting",
    href: "/budgeting",
    icon: PieChart,
    description:
      "Track income and plan spending across fundamentals, fun, and future",
  },
  {
    label: "Accounts",
    href: "/accounts",
    icon: Wallet,
    description: "Manage your virtual account and dependent accounts",
  },
  {
    label: "Home",
    href: "/",
    icon: Home,
    description: "Overview of your finances and recent activities",
  },
  {
    label: "Bills",
    href: "/bills",
    icon: Receipt,
    description: "Track and manage utility payments and recurring expenses",
  },
  {
    label: "Ventures",
    href: "/ventures",
    icon: ClipboardList,
    description: "Document and track financial aspects of your projects",
  },
];

const Header = ({ className, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        layoutVariants({
          className:
            "sticky bottom-0 inset-x-0 z-50 pt-0 sm:pt-0 bg-background",
        }),
        className
      )}
      {...props}
    >
      <nav className="grid grid-cols-5 gap-1.5 rounded-lg bg-muted p-2 text-muted-foreground min-h-12 border shadow-sm">
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex flex-col gap-1.5 items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              pathname === href
                ? "bg-background text-foreground shadow-sm"
                : "hover:bg-background/50 text-muted-foreground"
            )}
          >
            <Icon className="size-5 sm:size-6" />
            <span className="text-xs sm:text-sm hidden sm:block">{label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
};
export { Header, type Props };
