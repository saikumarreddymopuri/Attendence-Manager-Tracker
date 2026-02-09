import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    isSetupComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// prevent duplicate semester names per user
semesterSchema.index(
  { userId: 1, name: 1 },
  { unique: true }
);

export default mongoose.model("Semester", semesterSchema);
