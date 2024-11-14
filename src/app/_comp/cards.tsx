import { BudgetOverview } from "@/app/_comp/budget";
import { DependentChart } from "@/app/_comp/pie";
import { SavingsOverview } from "@/app/_comp/savings";
import { layoutVariants } from "@/components/shell";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {};
const Cards = ({ className, ...props }: Props) => {
  return (
    <section
      className={cn(layoutVariants({ variant: "card" }), className)}
      {...props}
    >
      <DependentChart />
      <BudgetOverview />
      <SavingsOverview />
    </section>
  );
};

export { Cards };
