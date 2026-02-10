import Semester from "../models/semester.model.js";

export const createSemester = async (req, res) => {
  const { name, startDate, endDate } = req.body;

  const semester = await Semester.create({
    userId: req.user.id,
    name,
    startDate,
    endDate,
  });

  res.json(semester);
};


export const getSemesters = async (req, res) => {
  const semesters = await Semester.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(semesters);
};


export const getSemesterById = async (req, res) => {
  const { semesterId } = req.params;

  const semester = await Semester.findById(semesterId);

  if (!semester) {
    return res.status(404).json({ message: "Semester not found" });
  }

  res.json(semester);
};

export const completeSemesterSetup = async (req, res) => {
  const { semesterId } = req.params;

  const semester = await Semester.findByIdAndUpdate(
    semesterId,
    { isSetupComplete: true },
    { new: true }
  );

  if (!semester) {
    return res.status(404).json({ message: "Semester not found" });
  }

  res.json(semester);
};