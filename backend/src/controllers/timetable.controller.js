import Timetable from "../models/timetable.model.js";

// SET timetable for a DAY of a semester
export const setTimetable = async (req, res) => {
  try {
    const { semesterId } = req.params;     // ✅ take from URL
    const { day, subjects } = req.body;

    const timetable = await Timetable.findOneAndUpdate(
      { semesterId, day },                 // ✅ FIXED
      { subjects },
      { upsert: true, new: true }
    );

    res.json(timetable);
  } catch (err) {
  console.log("❌ TIMETABLE SAVE ERROR:", err);
  res.status(400).json({
    message: err.message,
    details: err.errors || err,
  });
}
};

// GET timetable for a DAY of a semester
export const getTimetableByDay = async (req, res) => {
  const { semesterId, day } = req.params;

  const timetable = await Timetable.findOne({ semesterId, day });
  res.json(timetable);
};

// GET FULL timetable of a semester
export const getFullTimetable = async (req, res) => {
  try {
    const { semesterId } = req.params;

    const timetable = await Timetable.find({ semesterId });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
