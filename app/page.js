"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TransactionList from "@/components/TransactionList";
import ExpensesChart from "@/components/ExpensesChart";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className=" flex flex-col mx-auto p-4 mt-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white text-center sm:text-left">
          Personal Finance Tracker
        </h1>
        <Link href="/add">
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-gray-800"
          >
            Add Transaction
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <TransactionList
            transactions={transactions}
            setTransactions={setTransactions}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <ExpensesChart transactions={transactions} />
        </div>
      </div>
    </main>
  );
}
