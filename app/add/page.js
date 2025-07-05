"use client";

import TransactionForm from "@/components/TransactionForm";

export default function AddTransactionPage() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Transaction</h1>
      <TransactionForm />
    </main>
  );
}
