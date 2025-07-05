"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function EditTransaction() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ amount: "", description: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/transactions/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch transaction!");
        }
        const data = await res.json();
        setForm({
          amount: data.amount,
          description: data.description,
          date: data.date.split("T")[0],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load transaction!");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
        }),
      });

      if (!res.ok) {
        throw new Error("Update failed!");
      }

      toast.success("Transaction updated!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Error updating transaction!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      {loading ? (
        <Loader size={50} />
      ) : (
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
              <Button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
