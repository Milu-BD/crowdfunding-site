import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  trxId: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Donation ||
  mongoose.model("Donation", DonationSchema);
