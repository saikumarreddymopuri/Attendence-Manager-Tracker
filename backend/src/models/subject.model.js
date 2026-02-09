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

    attendedClasses: {
      type: Number,
      default: 0,
    },

    missedClasses: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// prevent duplicate subject names PER semester
subjectSchema.index({ semesterId: 1, name: 1 }, { unique: true });

export default mongoose.model("Subject", subjectSchema);
