"use client";

import { useEffect, useState } from "react";
import {
  calculateTotalExpense,
  getCategoryTotals,
} from "@/lib/transactionUtils";
import Loader from "@/components/Loader";
import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardPage() {
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
    <Dashboard
      totalExpense={totalExpense}
      categoryTotals={categoryTotals}
      transactions={transactions}
      budgets={budgets}
      recentTransactions={recentTransactions}
    />
  );
}
