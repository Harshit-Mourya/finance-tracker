"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect, useMemo } from "react";
import { format, subMonths, isBefore, isAfter } from "date-fns";
import toast from "react-hot-toast";
import { getBudgetComparison } from "@/lib/budgetUtils";

export default function BudgetComparisonChart({ budgets, transactions }) {
  console.log(budgets);

  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "yyyy-MM")
  );

  const chartData = useMemo(() => {
    if (!budgets || !transactions) return [];
    return getBudgetComparison(budgets, transactions, selectedMonth);
  }, [budgets, transactions, selectedMonth]);

  // Restrict to last 6 months
  useEffect(() => {
    const selected = new Date(`${selectedMonth}-01`);
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 6);

    if (isBefore(selected, sixMonthsAgo) || isAfter(selected, now)) {
      toast.error("Only last 6 months are allowed!");
      const corrected = format(now, "yyyy-MM");
      if (corrected !== selectedMonth) {
        setSelectedMonth(corrected);
      }
    }
  }, [selectedMonth]);

  const formattedMonth = new Date(`${selectedMonth}-01`).toLocaleString(
    "en-GB",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="w-full bg-gray-800 p-6 rounded-xl mt-5">
      {" "}
      {/* Heading */}
      <h2 className="text-xl text-center font-semibold mb-4 text-white">
        Budget vs Actual Spending ({formattedMonth})
      </h2>
      {/* Month Selector */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <label className="text-white text-sm">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-gray-700 text-white px-3 py-1 rounded"
        />
      </div>
      {/* Chart */}
      {chartData.length === 0 ? (
        <p className="text-center text-gray-400 italic py-6">
          No data available for this month.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="category" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "#ccc" }}
              formatter={(value, name) => [
                `₹${value}`,
                name === "budget" ? "Budget" : "Spent",
              ]}
            />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
            <Bar dataKey="actual" fill="#82ca9d" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
