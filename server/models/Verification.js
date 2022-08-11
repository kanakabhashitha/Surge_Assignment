import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const VerificationSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  temporaryPassword: {
    type: String,
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

VerificationSchema.pre("save", async function () {
  if (!this.isModified("temporaryPassword")) return;
  const salt = await bcrypt.genSalt(10);
  this.temporaryPassword = await bcrypt.hash(this.temporaryPassword, salt);
});

VerificationSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

VerificationSchema.methods.compareTemporaryPassword = async function (
  candidatePassword
) {
  const isMatch = await bcrypt.compare(
    candidatePassword,
    this.temporaryPassword
  );
  return isMatch;
};
export default mongoose.model("VerificationAccount", VerificationSchema);
