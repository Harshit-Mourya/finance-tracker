"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

export default function TransactionList({ transactions, setTransactions }) {
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!ok) return;

    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Delete failed!");

      setTransactions((prev) => prev.filter((t) => t._id !== id));
      toast.success("Transaction deleted!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete transaction!");
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Your Transactions
      </h2>
      {!transactions || transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transactions.map((tx) => (
            <Card key={tx._id} className="bg-gray-900">
              <CardHeader className="flex justify-between ">
                <CardTitle className="text-green-500 text-xl font-semibold">
                  ₹{tx.amount}
                </CardTitle>
                <span className="text-sm text-gray-400">
                  {new Date(tx.date).toLocaleDateString("en-GB")}
                </span>
              </CardHeader>

              <CardContent className="flex flex-row justify-between items-center gap-3">
                <div>
                  <p className="text-gray-300">{tx.description}</p>
                  <span className="text-xs text-blue-400 mt-1 inline-block">
                    Category: {tx.category || "Other"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/edit/${tx._id}`}>
                    <Button
                      size="sm"
                      className="cursor-pointer flex items-center gap-1 hover:bg-gray-700 transition"
                    >
                      <span className="hidden sm:inline">Edit</span>
                      <Pencil className="h-4 w-4 sm:hidden" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(tx._id)}
                    className="cursor-pointer flex items-center gap-1 hover:bg-gray-700 transition"
                  >
                    <span className="hidden sm:inline">Delete</span>
                    <Trash2 className="h-4 w-4 sm:hidden" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
