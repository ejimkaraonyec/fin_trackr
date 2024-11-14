"use client";

import { useState } from "react";

import { layoutVariants } from "@/components/shell";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNaira } from "@/lib/currency";
import { cn } from "@/lib/utils";

type CategoryItem = {
  name: string;
  key: string;
};

type Categories = {
  fundamentals: CategoryItem[];
  fun: CategoryItem[];
  future: CategoryItem[];
};

type Income = {
  primary: number;
  secondary: number;
  freelance: number;
};

type Expenses = {
  fundamentals: Record<string, number>;
  fun: Record<string, number>;
  future: Record<string, number>;
};

type Allocations = {
  fundamentals: number;
  fun: number;
  future: number;
};

type CategoryTotals = {
  fundamentals: number;
  fun: number;
  future: number;
};

const categories: Categories = {
  fundamentals: [
    { name: "Housing (Rent/Mortgage)", key: "housing" },
    { name: "Utilities", key: "utilities" },
    { name: "Transportation", key: "transportation" },
    { name: "Groceries", key: "groceries" },
    { name: "Insurance", key: "insurance" },
    { name: "Minimum Debt Payments", key: "debt" },
  ],
  fun: [
    { name: "Subscriptions", key: "subscriptions" },
    { name: "Entertainment", key: "entertainment" },
    { name: "Shopping", key: "shopping" },
    { name: "Dining Out", key: "dining" },
    { name: "Self-care", key: "selfcare" },
    { name: "Travel", key: "travel" },
  ],
  future: [
    { name: "Emergency Fund", key: "emergency" },
    { name: "Investments", key: "investments" },
    { name: "Retirement", key: "retirement" },
    { name: "Savings Goals", key: "savings" },
  ],
};

const DEFAULT_ALLOCATIONS: Allocations = {
  fundamentals: 50,
  fun: 30,
  future: 20,
};

export default function FinTracker() {
  const [income, setIncome] = useState<Income>({
    primary: 0,
    secondary: 0,
    freelance: 0,
  });

  const [expenses, setExpenses] = useState<Expenses>({
    fundamentals: {},
    fun: {},
    future: {},
  });

  const [allocations] = useState<Allocations>(DEFAULT_ALLOCATIONS);

  const totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);

  const calculateTotalsByCategory = (): CategoryTotals => {
    return {
      fundamentals: Object.values(expenses.fundamentals).reduce(
        (sum, val) => sum + (Number(val) || 0),
        0
      ),
      fun: Object.values(expenses.fun).reduce(
        (sum, val) => sum + (Number(val) || 0),
        0
      ),
      future: Object.values(expenses.future).reduce(
        (sum, val) => sum + (Number(val) || 0),
        0
      ),
    };
  };

  const totals = calculateTotalsByCategory();

  const getStatusColor = (category: keyof Allocations): string => {
    const percentage = (totals[category] / totalIncome) * 100;
    const target = allocations[category];

    if (category === "future") {
      return percentage >= target ? "bg-green-100" : "bg-red-100";
    }
    return percentage <= target ? "bg-green-100" : "bg-red-100";
  };

  const handleExpenseChange = (
    category: keyof Expenses,
    key: string,
    value: string
  ) => {
    setExpenses((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: Number(value) || 0,
      },
    }));
  };

  const handleIncomeChange = (field: keyof Income, value: string) => {
    setIncome((prev) => ({
      ...prev,
      [field]: Number(value) || 0,
    }));
  };

  return (
    <main className={cn(layoutVariants({ className: "space-y-4" }))}>
      {/* Income Section */}
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle>Monthly Income</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-2.5">
          {Object.keys(income).map((field) => (
            <div key={field}>
              <Label className="capitalize">
                {field.replace(/([A-Z])/g, " $1").trim()} Income
              </Label>
              <Input
                type="number"
                value={income[field as keyof Income] || ""}
                onChange={(e) =>
                  handleIncomeChange(field as keyof Income, e.target.value)
                }
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <p className="text-lg font-semibold">
            Total Monthly Income: {formatNaira(totalIncome)}
          </p>
        </CardFooter>
      </Card>

      {/* Expense Categories */}
      <section className="grid md:grid-cols-3 gap-4">
        {(Object.keys(categories) as Array<keyof Categories>).map(
          (categoryType) => (
            <Card
              key={categoryType}
              className={cn(getStatusColor(categoryType))}
            >
              <CardHeader>
                <CardTitle className="">
                  {categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}{" "}
                  ({allocations[categoryType]}%)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {categories[categoryType].map(({ name, key }) => (
                  <div key={key}>
                    <Label>{name}</Label>
                    <Input
                      type="number"
                      value={expenses[categoryType][key] || ""}
                      onChange={(e) =>
                        handleExpenseChange(categoryType, key, e.target.value)
                      }
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <p className="text-lg font-semibold">
                  Total: {formatNaira(totals[categoryType])} (
                  {((totals[categoryType] / totalIncome) * 100).toFixed(1)}%)
                </p>
              </CardFooter>
            </Card>
          )
        )}
      </section>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <p>Total Income: {formatNaira(totalIncome)}</p>
              <p>
                Total Expenses:{" "}
                {formatNaira(
                  Object.values(totals).reduce((sum, val) => sum + val, 0)
                )}
              </p>
            </div>
            <div>
              <p>
                Remaining:{" "}
                {formatNaira(
                  totalIncome -
                    Object.values(totals).reduce((sum, val) => sum + val, 0)
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
