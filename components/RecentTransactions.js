"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RecentTransactions({ recentTransactions }) {
  return (
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
  );
}
