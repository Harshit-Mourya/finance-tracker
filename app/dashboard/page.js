"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateTotalExpense,
  getCategoryTotals,
} from "@/lib/transactionUtils";
import Loader from "@/components/Loader";
import CategoryPieChart from "@/components/CategoryPieChart";
import ExpensesChart from "@/components/ExpensesChart";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [txRes, budgetRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/budgets"),
      ]);
      const [txData, budgetData] = await Promise.all([
        txRes.json(),
        budgetRes.json(),
      ]);

      setTransactions(txData);
      setBudgets(budgetData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalExpense = calculateTotalExpense(transactions);
  const categoryTotals = getCategoryTotals(transactions);
  const recentTransactions = transactions.slice(0, 5);

  if (loading) {
    return <Loader size={50} />;
  }

  return (
    <section className="max-w-5xl mx-auto p-4 space-y-6">
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

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Insights Through Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-2">
            <ExpensesChart transactions={transactions} />
            <CategoryPieChart data={categoryTotals} />
          </div>
          <div>
            <BudgetComparisonChart
              budgets={budgets}
              transactions={transactions}
            />
          </div>
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
