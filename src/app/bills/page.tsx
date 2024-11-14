import { layoutVariants } from "@/components/shell";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Bills`,
};

export default function Page() {
  return (
    <main className={cn(layoutVariants())}>
      <h1 className="text-xl font-semibold">Bills</h1>
    </main>
  );
}
