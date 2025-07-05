"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

export default function CategoryPieChart({ data }) {
  const formattedData = Object.entries(data).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="w-full flex justify-center">
      <PieChart width={300} height={300}>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
