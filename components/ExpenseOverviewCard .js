import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ExpenseOverviewCard({ totalExpense, categoryTotals }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Expense Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-around sm:items-start gap-6">
          {/* Total Expense Section */}
          <div className="flex-1 text-center ">
            <h3 className="text-lg font-medium mb-2 text-white">
              Total Expenses
            </h3>
            {typeof totalExpense === "number" ? (
              <p className="text-2xl text-green-400 font-semibold">
                ₹{totalExpense}
              </p>
            ) : (
              <p className="text-gray-400">N/A</p>
            )}
          </div>

          {/* Category Breakdown Section */}
          <div className="flex-1 text-center">
            <h3 className="text-lg font-medium mb-2 text-white">
              Category Breakdown
            </h3>
            {categoryTotals && Object.keys(categoryTotals).length > 0 ? (
              <div className="space-y-1">
                {Object.entries(categoryTotals).map(([category, amount]) => (
                  <p key={category} className="text-gray-300">
                    {category}: ₹{amount}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No categories available</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
