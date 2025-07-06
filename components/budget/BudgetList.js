import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BudgetList({ budgets }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing Budgets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {budgets.length === 0 ? (
          <p className="text-gray-400">No budgets yet.</p>
        ) : (
          budgets.map((b) => (
            <div
              key={`${b.category}-${b.month}`}
              className="flex justify-between border-b border-gray-700 pb-1"
            >
              <span>
                {b.category} -{" "}
                {new Date(b.month + "-01").toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-green-400 font-semibold">₹{b.amount}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
