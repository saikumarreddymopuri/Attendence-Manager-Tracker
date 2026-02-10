import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  },
  { timestamps: true }
);

// One attendance per subject per day per semester
attendanceSchema.index(
  { semesterId: 1, date: 1, subject: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);
