"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ExpensesChart from "@/components/ExpensesChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";

export default function ChartViewer({ transactions, categoryTotals, budgets }) {
  return (
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
  );
}
