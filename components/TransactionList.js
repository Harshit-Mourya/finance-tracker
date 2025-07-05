"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, setTransactions }) {
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!ok) return;

    try {
      await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Your Transactions
      </h2>

      {!transactions || transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        transactions.map((tx) => (
          <Card key={tx._id} className="bg-gray-900">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-green-500 text-xl font-semibold">
                ₹{tx.amount}
              </CardTitle>
              <span className="text-sm text-gray-400">
                {new Date(tx.date).toLocaleDateString()}
              </span>
            </CardHeader>

            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <p className="text-gray-300">{tx.description}</p>

              <div className="flex gap-2">
                <Link href={`/edit/${tx._id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(tx._id)}
                  className="cursor-pointer"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </section>
  );
}
