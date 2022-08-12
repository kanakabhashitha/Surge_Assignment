import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const VerificationSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  verify: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    expiresIn: 3600,
    default: Date.now(),
  },
});

export default mongoose.model("VerificationAccount", VerificationSchema);
