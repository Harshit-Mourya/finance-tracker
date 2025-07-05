import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const created = await Transaction.create(data);
  return NextResponse.json(created);
}
