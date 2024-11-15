import { layoutVariants } from "@/components/shell";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Accounts`,
};

export default function Page() {
  return (
    <main className={cn(layoutVariants())}>
      <h1 className="text-xl font-semibold">Accounts</h1>
    </main>
  );
}
