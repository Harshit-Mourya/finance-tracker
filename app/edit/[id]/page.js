"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditTransaction() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ amount: "", description: "", date: "" });

  // Fetch existing transaction data
  useEffect(() => {
    const fetchTransaction = async () => {
      const res = await fetch(`/api/transactions/${id}`);
      const data = await res.json();
      setForm({
        amount: data.amount,
        description: data.description,
        date: data.date.split("T")[0], // Format for <input type="date" />
      });
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
      }),
    });

    router.push("/");
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
            />
            <Input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
