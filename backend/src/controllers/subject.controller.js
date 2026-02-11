import Subject from "../models/subject.model.js";

export const saveSubjects = async (req, res) => {
  try {
    const { semesterId } = req.params;
    const { subjects } = req.body;

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: "Subjects data required" });
    }

    // Clean & validate
    const prepared = subjects
      .filter(s => s.name && s.totalPlannedClasses)
      .map((s) => ({
        semesterId,
        name: s.name.trim(),
        totalPlannedClasses: Number(s.totalPlannedClasses),
        requiredPercentage: Number(s.requiredPercentage || 75),
      }));

    if (prepared.length === 0) {
      return res.status(400).json({ message: "Invalid subject data" });
    }

    // Remove old subjects (if re-setup)
    await Subject.deleteMany({ semesterId });

    const saved = await Subject.insertMany(prepared);

    res.status(201).json(saved);
  } catch (err) {
    console.error("Save subjects error:", err);
    res.status(400).json({ error: err.message });
  }
};
