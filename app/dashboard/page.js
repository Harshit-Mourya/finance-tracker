"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateTotalExpense,
  getCategoryTotals,
} from "@/lib/transactionUtils";
import Loader from "@/components/Loader";
import CategoryPieChart from "@/components/CategoryPieChart";
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalExpense = calculateTotalExpense(transactions);
  const categoryTotals = getCategoryTotals(transactions);
  const recentTransactions = transactions.slice(0, 5); // most recent 5

  if (loading) {
    return <Loader size={50} />;
  }

  return (
    <section className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Dashboard
      </h1>

      {/* Total Expense */}
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl text-green-400 font-semibold">
            ₹{totalExpense}
          </p>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <p key={category} className="text-gray-300">
              {category}: ₹{amount}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Category-wise Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart data={categoryTotals} />
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-400">No recent transactions.</p>
          ) : (
            recentTransactions.map((tx) => (
              <div
                key={tx._id}
                className="flex justify-between border-b border-gray-700 pb-2"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-gray-400">
                    {tx.category} •{" "}
                    {new Date(tx.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <p className="text-green-400 font-semibold">₹{tx.amount}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
