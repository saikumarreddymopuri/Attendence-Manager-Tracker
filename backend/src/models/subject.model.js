import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    totalPlannedClasses: {
      type: Number,
      required: true,
    },

    requiredPercentage: {
      type: Number,
      default: 75,
    },
  },
  { timestamps: true }
);

// One subject per semester
subjectSchema.index(
  { semesterId: 1, name: 1 },
  { unique: true }
);

export default mongoose.model("Subject", subjectSchema);
