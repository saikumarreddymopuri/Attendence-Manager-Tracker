import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },

    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },

    subjects: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// one timetable per day PER semester
timetableSchema.index({ semesterId: 1, day: 1 }, { unique: true });

export default mongoose.model("Timetable", timetableSchema);
