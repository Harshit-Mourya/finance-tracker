"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TransactionList from "@/components/TransactionList";
import ExpensesChart from "@/components/ExpensesChart";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions!");

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load transactions!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className=" flex flex-col mx-auto px-4 md:px-10 my-10 space-y-6">
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

      {loading ? (
        <Loader size={50} />
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl lg:max-w-7xl">
            <TransactionList
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </div>
        </div>
      )}
    </main>
  );
}
