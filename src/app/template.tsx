import { ScrollArea } from "@/components/ui/scroll-area";

export default function Template({ children }: { children: React.ReactNode }) {
  return <ScrollArea className="min-h-screen ">{children}</ScrollArea>;
}
