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

import { useMemo, useState, useEffect } from "react";
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  differenceInMonths,
  addMonths,
  parse,
} from "date-fns";
import toast from "react-hot-toast";

export default function ExpensesChart({ transactions }) {
  const [range, setRange] = useState("6");
  const [startDate, setStartDate] = useState(
    startOfMonth(subMonths(new Date(), 5))
  );
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));

  useEffect(() => {
    const diff = differenceInMonths(endDate, startDate);
    if (diff > 5) {
      const newStart = startOfMonth(subMonths(endDate, 5));
      setStartDate(newStart);
      toast.error("Max range is 6 months!");
    }
  }, [endDate]);

  useEffect(() => {
    const diff = differenceInMonths(endDate, startDate);
    if (diff > 5) {
      const newEnd = endOfMonth(addMonths(startDate, 5));
      setEndDate(newEnd);
      toast.error("Max range is 6 months!");
    }
  }, [startDate]);

  const filteredData = useMemo(() => {
    const months = eachMonthOfInterval({ start: startDate, end: endDate }).map(
      (date) => format(date, "yyyy-MM")
    );

    const monthlyMap = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const key = format(date, "yyyy-MM");
      if (months.includes(key)) {
        monthlyMap[key] = (monthlyMap[key] || 0) + tx.amount;
      }
    });

    return months.map((month) => ({
      key: month,
      month: format(parse(month, "yyyy-MM", new Date()), "MMM yyyy"),
      total: monthlyMap[month] || 0,
    }));
  }, [transactions, startDate, endDate]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-5 w-full">
      <h2 className="text-xl text-center font-semibold mb-4 text-white">
        Monthly Expenses
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <select
          value={range}
          onChange={(e) => {
            const val = e.target.value;
            setRange(val);
            if (val !== "custom") {
              const monthsBack = parseInt(val);
              const now = new Date();
              setStartDate(startOfMonth(subMonths(now, monthsBack - 1)));
              setEndDate(endOfMonth(now));
            }
          }}
          className="bg-gray-700 text-white text-sm px-3 py-1 rounded"
        >
          <option value="1">Last 1 Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="custom">Custom Period</option>
        </select>

        {range === "custom" && (
          <>
            <div>
              <label className="text-sm text-gray-300 block mb-1">Start:</label>
              <input
                type="month"
                value={format(startDate, "yyyy-MM")}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 block mb-1">End:</label>
              <input
                type="month"
                value={format(endDate, "yyyy-MM")}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
            </div>
          </>
        )}
      </div>

      {/* Chart or Empty */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-400 italic py-6">
          No transaction data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={filteredData}
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
