"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Shopping",
  "Other",
];

export default function BudgetPage() {
  const [form, setForm] = useState({
    category: "",
    month: new Date().toISOString().slice(0, 7), // current YYYY-MM
    amount: "",
  });
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await fetch("/api/budgets");
      const data = await res.json();
      setBudgets(data);
    } catch (err) {
      console.error("Failed to load budgets:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save budget");

      toast.success("Budget saved!");
      setForm({
        category: "",
        month: new Date().toISOString().slice(0, 7),
        amount: "",
      });
      fetchBudgets();
    } catch (err) {
      toast.error("Error saving budget!");
      console.error(err);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Monthly Budget
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Set Monthly Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Month</Label>
              <Input
                type="month"
                name="month"
                value={form.month}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 7)}
              />
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Save Budget
            </Button>
          </form>
        </CardContent>
      </Card>

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
                <span className="text-green-400 font-semibold">
                  ₹{b.amount}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
