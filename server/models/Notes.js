import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Please provide subject"],
      maxlength: 50,
    },

    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 1000,
    },

    deadline: {
      type: Date,
      default: Date.now(),
      trim: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
