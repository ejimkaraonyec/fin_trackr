"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCompactNaira } from "@/lib/currency";

const balanceData = [
  { name: "richmond", amount: 20000, fill: "var(--color-richmond)" },
  { name: "irene", amount: 22000, fill: "var(--color-irene)" },
  { name: "sonia", amount: 12000, fill: "var(--color-sonia)" },
  { name: "cherish", amount: 10000, fill: "var(--color-cherish)" },
  { name: "amanda", amount: 5000, fill: "var(--color-amanda)" },
];

const chartConfig = {
  balance: {
    label: "Balance",
  },
  amount: {
    label: "Amount",
  },
  total: {
    label: "Total",
  },
  richmond: {
    label: "Richmond",
    color: "hsl(var(--chart-1))",
  },
  irene: {
    label: "Irene",
    color: "hsl(var(--chart-2))",
  },
  sonia: {
    label: "Sonia",
    color: "hsl(var(--chart-3))",
  },
  cherish: {
    label: "Cherish",
    color: "hsl(var(--chart-4))",
  },
  amanda: {
    label: "Amanda",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function DependentChart() {
  const id = "pie-interactive";
  const [activeName, setActiveName] = React.useState(balanceData[0].name);

  const activeIndex = React.useMemo(
    () => balanceData.findIndex((item) => item.name === activeName),
    [activeName]
  );
  const names = React.useMemo(() => balanceData.map((item) => item.name), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-center">
        <CardTitle>Dependents</CardTitle>
        <Select value={activeName} onValueChange={setActiveName}>
          <SelectTrigger
            className="ml-auto h-7 w-[120px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-lg min-w-52">
            {names.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <span
                      className="flex h-4 w-1 shrink-0 rounded-full"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-52"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="line" />}
            />
            <Pie
              data={balanceData}
              dataKey="amount"
              nameKey="name"
              innerRadius={50}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 22}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {formatCompactNaira(balanceData[activeIndex].amount)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Balance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
