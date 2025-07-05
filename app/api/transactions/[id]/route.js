import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const params = await context.params;

  await connectDB();
  try {
    const transaction = await Transaction.findById(params.id);
    if (!transaction) {
      return NextResponse.json({ error: "Not found!" }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (err) {
    return NextResponse.json({ error: "Invalid ID!" }, { status: 400 });
  }
}

export async function DELETE(req, context) {
  const params = await context.params;

  await connectDB();
  try {
    await Transaction.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted!" });
  } catch (err) {
    return NextResponse.json({ error: "Error deleting!" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  const params = await context.params;

  await connectDB();
  try {
    const data = await req.json();
    if (!data.category) data.category = "Other";

    const updated = await Transaction.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
