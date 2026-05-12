import { NextResponse } from "next/server";
export async function GET() {
  try {
    await dbConnect();
    // Change this line to filter for approved: true
    const donations = await Donation.find({ approved: true }); 

    const total = donations.reduce((sum, item) => sum + item.amount, 0);
    return NextResponse.json({ success: true, total });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
