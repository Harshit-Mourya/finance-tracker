import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (err) {
    console.error("GET /api/transactions error:", err);
    return NextResponse.json(
      { error: "Failed to fetch transactions!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    console.log(data);

    if (!data.amount || !data.description || !data.date || !data.category) {
      return NextResponse.json({ error: "Missing fields!" }, { status: 400 });
    }

    const created = await Transaction.create(data);

    console.log(created);

    return NextResponse.json(created);
  } catch (err) {
    console.error("POST /api/transactions error:", err);
    return NextResponse.json(
      { error: "Failed to add transaction!" },
      { status: 500 }
    );
  }
}
