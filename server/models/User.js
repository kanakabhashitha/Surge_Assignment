import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    lastName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      default: "Last Name",
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
      unique: true,
    },

    password: {
      type: String,
      minlength: 3,
      select: false,
      required: [true, "Please provide  password"],
    },

    dateOfBirth: {
      type: Date,
      default: Date.now(),
      trim: true,
    },

    mobile: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide valid phone",
      },
      maxlength: 10,
      trim: true,
    },

    accountType: {
      type: String,
      enum: ["Admin", "Student"],
      default: "Student",
    },

    status: {
      type: Boolean,
      default: false,
    },

    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
