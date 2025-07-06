import { connectDB } from "@/lib/db";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find();
    return NextResponse.json(budgets);
  } catch (err) {
    console.error("GET /api/budgets error:", err);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { category, month, amount } = await req.json();

    if (!category || !month || !amount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await Budget.findOneAndUpdate(
      { category, month },
      { amount },
      { upsert: true, new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error("POST /api/budgets error:", err);
    return NextResponse.json(
      { error: "Failed to save budget" },
      { status: 500 }
    );
  }
}
