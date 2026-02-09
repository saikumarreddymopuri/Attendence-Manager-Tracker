import Attendance from "../models/attendance.model.js";
import Subject from "../models/subject.model.js";

/* -------------------------------------------
   1) MARK ATTENDANCE (LOCKED)
-------------------------------------------- */
export const markAttendance = async (req, res) => {
  try {
    const { date, subject, status } = req.body;

    // 🔒 check if already marked
    const exists = await Attendance.findOne({ date, subject });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Attendance already marked" });
    }

    // save attendance
    await Attendance.create({ date, subject, status });

    // update subject counts
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

    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------------------------
   2) GET TODAY'S ATTENDANCE (LOCK UI)
-------------------------------------------- */
export const getTodayAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    const records = await Attendance.find(
      { date },
      { _id: 0, subject: 1, status: 1 }
    );

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------------------------
   3) GET ABSENT HISTORY (ONLY ABSENT)
-------------------------------------------- */
export const getAbsentHistory = async (req, res) => {
  try {
    const absents = await Attendance.find(
      { status: "Absent" },
      { _id: 0, date: 1, subject: 1 }
    ).sort({ date: -1 });

    res.json(absents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
