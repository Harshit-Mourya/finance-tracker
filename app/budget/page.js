"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import SetBudgetForm from "@/components/budget/SetBudgetForm";
import BudgetList from "@/components/budget/BudgetList";

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

      <SetBudgetForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        categories={categories}
      />

      <BudgetList budgets={budgets} />
    </section>
  );
}
