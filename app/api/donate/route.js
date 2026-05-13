import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

// Submit Donation
export async function POST(req) {

  try {

    await dbConnect();

    const body = await req.json();

    const donation = await Donation.create({
      name: body.name,
      amount: body.amount,
      trxId: body.trxId,
      approved: false,
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

// Get Approved Donation Total
export async function GET() {

  try {

    await dbConnect();

    const donations = await Donation.find({
      approved: true,
    });

    const total = donations.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return NextResponse.json({
      success: true,
      total,
      donations,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message,
    });

  }
}
