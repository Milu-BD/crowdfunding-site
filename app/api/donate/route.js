import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const donation = await Donation.create({
      name: body.name,
      amount: body.amount,
      trxId: body.trxId,
    });

    return NextResponse.json({
      success: true,
      donation,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
