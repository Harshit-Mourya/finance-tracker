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

export default function BudgetComparisonChart({ data, month }) {
  console.log("Received chart data:", data);

  const formattedMonth = new Date(`${month}-01`).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full bg-gray-800 p-6 rounded-xl mt-5">
      <h2 className="text-xl text-center font-semibold mb-4 text-white">
        Budget vs Actual Spending ({formattedMonth})
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#82ca9d" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
