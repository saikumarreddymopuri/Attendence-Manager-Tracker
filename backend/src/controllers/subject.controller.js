import Subject from "../models/subject.model.js";

export const saveSubjects = async (req, res) => {
  try {
    const { semesterId } = req.params;
    const { subjects } = req.body;

    // Remove old subjects if re-setup happens
    await Subject.deleteMany({ semesterId });

    const prepared = subjects.map((s) => ({
      semesterId,
      name: s.name,
      totalPlannedClasses: Number(s.totalPlannedClasses),
      requiredPercentage: Number(s.requiredPercentage),
    }));

    const saved = await Subject.insertMany(prepared);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
