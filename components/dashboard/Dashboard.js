"use client";

import ExpenseOverviewCard from "../ExpenseOverviewCard ";
import ChartViewer from "@/components/ChartViewer";
import RecentTransactions from "@/components/RecentTransactions";

export default function Dashboard({
  totalExpense,
  categoryTotals,
  transactions,
  budgets,
  recentTransactions,
}) {
  return (
    <section className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Dashboard
      </h1>

      <ExpenseOverviewCard
        totalExpense={totalExpense}
        categoryTotals={categoryTotals}
      />

      <ChartViewer
        transactions={transactions}
        categoryTotals={categoryTotals}
        budgets={budgets}
      />

      <RecentTransactions recentTransactions={recentTransactions} />
    </section>
  );
}
