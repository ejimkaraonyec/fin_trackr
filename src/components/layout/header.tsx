"use client";

import { Activity, FileText, Home, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { layoutVariants } from "@/components/shell";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {};

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "Tracker", href: "/tracker", icon: Activity },
  { label: "Accounts", href: "/accounts", icon: Users },
  { label: "Utilities", href: "/utilities", icon: FileText },
];

const Header = ({ className, ...props }: Props) => {
  const pathname = usePathname();
  return (
    <header
      className={cn(
        layoutVariants({
          className: "sticky bottom-0 inset-x-0 z-50 pt-0 sm:pt-0",
        }),
        className
      )}
      {...props}
    >
      <nav className="grid grid-cols-4 rounded-lg bg-muted p-1 text-muted-foreground min-h-12">
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex flex-col gap-1.5 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              pathname === href
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
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

export { Header };
