import Attendance from "../models/attendance.model.js";
import Timetable from "../models/timetable.model.js";

// Get today's subjects + existing attendance
export const getTodayAttendance = async (req, res) => {
  const { semesterId } = req.params;

  const today = new Date();
  const date = today.toLocaleDateString("en-CA");
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

  // Get today's timetable
  const timetable = await Timetable.findOne({
    semesterId,
    day: dayName,
  });

  const subjects = timetable ? timetable.subjects : [];

  // Get already marked attendance
  const marked = await Attendance.find({
    semesterId,
    date,
  });

  res.json({
    date,
    day: dayName,
    subjects,
    marked,
  });
};

// Mark attendance (present/absent)
export const markAttendance = async (req, res) => {
  try {
    const { semesterId } = req.params;
    const { subject, status, date } = req.body;

    const record = await Attendance.findOneAndUpdate(
      { semesterId, date, subject },
      { status },
      { upsert: true, new: true }
    );

    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Get absent history (day-wise) for a semester
export const getAbsentHistory = async (req, res) => {
  try {
    const { semesterId } = req.params;

    const absents = await Attendance.find({
      semesterId,
      status: "Absent",
    }).sort({ date: -1 });

    // Group by date
    const grouped = {};

    absents.forEach((a) => {
      if (!grouped[a.date]) {
        grouped[a.date] = [];
      }
      grouped[a.date].push(a.subject);
    });

    // Convert to array for frontend
    const result = Object.keys(grouped).map((date) => ({
      date,
      subjects: grouped[date],
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
