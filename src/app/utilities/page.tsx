import { layoutVariants } from "@/components/shell";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ``,
};

export default function Page() {
  return (
    <main className={cn(layoutVariants())}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Pay Bills</h1>
        <button className="btn btn-primary">Payment History</button>
      </div>
    </main>
  );
}
