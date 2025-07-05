"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import EditTransaction from "@/components/EditTransaction";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

export default function EditTransactionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
  });
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
          category: data.category || "Other",
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
        <EditTransaction
          categories={categories}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitting={submitting}
          form={form}
        />
      )}
    </main>
  );
}
