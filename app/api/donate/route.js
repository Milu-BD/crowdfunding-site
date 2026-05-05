import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const donation = await Donation.create({
    name: body.name,
    amount: body.amount,
    trxId: body.trxId
  });

  return Response.json({ success: true });
}

export async function GET() {
  await connectDB();

  const donations = await Donation.find({ approved: true });

  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  return Response.json({ total });
}
