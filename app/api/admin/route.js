import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

// GET all donations for the admin list
export async function GET() {
  try {
    await dbConnect();
    const donations = await Donation.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, donations });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// PATCH to approve a donation
export async function PATCH(req) {
  try {
    await dbConnect();
    const { id } = await req.json();
    await Donation.findByIdAndUpdate(id, { approved: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// DELETE to remove a fake donation
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();
    await Donation.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
