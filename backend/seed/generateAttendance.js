import mongoose from "mongoose";
import dotenv from "dotenv";

import Subject from "../src/models/subject.model.js";
import Timetable from "../src/models/timetable.model.js";
import Attendance from "../src/models/attendance.model.js";

dotenv.config();

/* ------------------ CONFIG ------------------ */

const SUBJECTS = [
  { name: "Anatomy", totalPlannedClasses: 120 },
  { name: "Physiology", totalPlannedClasses: 100 },
  { name: "Biochemistry", totalPlannedClasses: 90 },
];

const TIMETABLE = {
  Monday: ["Anatomy", "Physiology"],
  Tuesday: ["Anatomy", "Biochemistry"],
  Wednesday: ["Physiology"],
  Thursday: ["Anatomy"],
  Friday: ["Biochemistry"],
  Saturday: ["Physiology"],
};

const PRESENT_PROBABILITY = 0.8; // 80%

/* -------------------------------------------- */

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

const getDateRange = () => {
  const dates = [];

  const start = new Date();
  start.setMonth(start.getMonth() - 2);

  const end = new Date();
  end.setMonth(end.getMonth() + 1);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0) {
      dates.push(new Date(d));
    }
  }

  return dates;
};

const runSeed = async () => {
  await connectDB();

  console.log("Clearing old data...");
  await Subject.deleteMany();
  await Timetable.deleteMany();
  await Attendance.deleteMany();

  console.log("Inserting subjects...");
  await Subject.insertMany(SUBJECTS);

  console.log("Inserting timetable...");
  for (const day in TIMETABLE) {
    await Timetable.create({
      day,
      subjects: TIMETABLE[day],
    });
  }

  console.log("Generating attendance...");
  const dates = getDateRange();

  for (const date of dates) {
    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const subjects = TIMETABLE[dayName];
    if (!subjects) continue;

    for (const subject of subjects) {
      const status =
        Math.random() < PRESENT_PROBABILITY ? "Present" : "Absent";

      await Attendance.create({
        date: date.toISOString().split("T")[0],
        subject,
        status,
      });

      if (status === "Present") {
        await Subject.findOneAndUpdate(
          { name: subject },
          { $inc: { attendedClasses: 1 } }
        );
      } else {
        await Subject.findOneAndUpdate(
          { name: subject },
          { $inc: { missedClasses: 1 } }
        );
      }
    }
  }

  console.log("✅ Synthetic data generation completed");
  process.exit();
};

runSeed();
