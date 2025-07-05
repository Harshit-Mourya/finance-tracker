"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  LabelList,
} from "recharts";

export default function ExpensesChart({ transactions }) {
  // Group data by month
  const monthlyData = transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // ✅ Sort transactions by date
    .reduce((acc, tx) => {
      const date = new Date(tx.date);
      const monthKey = date.toISOString().slice(0, 7); // YYYY-MM format for stable sorting
      const label = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      const existing = acc.find((item) => item.key === monthKey);
      if (existing) {
        existing.total += tx.amount;
      } else {
        acc.push({ key: monthKey, month: label, total: tx.amount });
      }
      return acc;
    }, [])
    .sort((a, b) => a.key.localeCompare(b.key)); // ✅ Sort grouped months by key (YYYY-MM)

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-10 w-full">
      <h2 className="text-xl text-center font-semibold mb-4 text-white">
        Monthly Expenses
      </h2>

      {monthlyData.length === 0 ? (
        <p className="text-center text-gray-400 italic py-6">
          No transaction data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc">
              <Label
                value="Month"
                position="insideBottom"
                offset={-20}
                fill="#ccc"
              />
            </XAxis>
            <YAxis stroke="#ccc">
              <Label
                value="Expenses (₹)"
                angle={-90}
                offset={0}
                position="insideLeft"
                fill="#ccc"
              />
            </YAxis>
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "#ccc" }}
              formatter={(value) => [`₹${value}`, "Total Spent"]}
            />
            <Bar dataKey="total" fill="#22c55e" radius={[6, 6, 0, 0]}>
              <LabelList
                dataKey="total"
                position="top"
                fill="#fff"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
