import Timetable from "../models/timetable.model.js";

export const setTimetable = async (req, res) => {
  try {
    const { day, subjects } = req.body;

    const timetable = await Timetable.findOneAndUpdate(
      { day },
      { subjects },
      { upsert: true, new: true }
    );

    res.json(timetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTimetableByDay = async (req, res) => {
  const { day } = req.params;
  const timetable = await Timetable.findOne({ day });
  res.json(timetable);
};


export const getFullTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find();
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
