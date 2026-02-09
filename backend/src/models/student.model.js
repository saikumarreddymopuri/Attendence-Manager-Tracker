import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    eligibilityPercentage: {
      type: Number,
      default: 75,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
