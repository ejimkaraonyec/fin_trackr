import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const layoutVariants = cva("", {
  variants: {
    variant: {
      // Base shell layouts
      container: "container",
      card: "grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4",
      centered: cn(
        "container flex max-w-2xl flex-col justify-center",
        "min-h-[100vh] min-h-[100dvh]"
      ),
      markdown: "container max-w-3xl py-8 md:py-10 lg:py-10",
      // Page-specific layouts
      default: "container max-w-screen-lg py-2.5 sm:py-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface LayoutProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof layoutVariants> {
  asChild?: boolean;
}

function Shell({
  className,
  variant = "container",
  asChild = false,
  ...props
}: LayoutProps) {
  const Comp = asChild ? Slot : "section";

  return (
    <Comp className={cn(layoutVariants({ variant }), className)} {...props} />
  );
}

const Page = React.forwardRef<HTMLElement, LayoutProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "main";

    return (
      <Comp
        ref={ref}
        className={cn(layoutVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Page.displayName = "Page";

export { layoutVariants, Page, Shell };
export type { LayoutProps };
