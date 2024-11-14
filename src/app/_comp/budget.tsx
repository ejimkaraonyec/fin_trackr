"use client";

import { Bar, BarChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", fundamentals: 186, fun: 80, future: 60 },
  { month: "February", fundamentals: 305, fun: 200, future: 150 },
  { month: "March", fundamentals: 237, fun: 120, future: 130 },
  { month: "April", fundamentals: 73, fun: 190, future: 200 },
  { month: "May", fundamentals: 209, fun: 130, future: 140 },
  { month: "June", fundamentals: 214, fun: 140, future: 100 },
];

const chartConfig = {
  fundamentals: {
    label: "Fundamentals",
    color: "hsl(var(--chart-1))",
  },
  fun: {
    label: "Fun",
    color: "hsl(var(--chart-2))",
  },
  future: {
    label: "Future",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function BudgetOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-52 w-full">
          <BarChart accessibilityLayer data={chartData}>
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="fundamentals"
              stackId="a"
              fill="var(--color-fundamentals)"
              radius={[0, 0, 3, 3]}
            />
            <Bar
              dataKey="fun"
              stackId="a"
              fill="var(--color-fun)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="future"
              stackId="a"
              fill="var(--color-future)"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
