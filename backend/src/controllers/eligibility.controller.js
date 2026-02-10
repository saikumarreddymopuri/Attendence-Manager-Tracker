import Subject from "../models/subject.model.js";
import Attendance from "../models/attendance.model.js";

export const getEligibilityReport = async (req, res) => {
  try {
    const { semesterId } = req.query;

    if (!semesterId) {
      return res.status(400).json({ message: "semesterId required" });
    }

    const subjects = await Subject.find({ semesterId });

    const P = 75; // required attendance percentage

    let overall = {
      totalPlanned: 0,
      totalAttended: 0,
      percentage: 0,
      status: "SAFE",
    };

    const report = [];

    for (const sub of subjects) {
      const T = sub.totalPlannedClasses;

      const attendance = await Attendance.find({
        semesterId,
        subject: sub.name,
      });

      const A = attendance.filter(
        (a) => a.status === "Present"
      ).length;

      const M = attendance.filter(
        (a) => a.status === "Absent"
      ).length;

      // Core calculations
      const requiredAttend = Math.ceil((P / 100) * T);
      const classesToAttendMore = Math.max(requiredAttend - A, 0);
      const remaining = T - (A + M);

      // 🔥 FIXED SAFE MISS LOGIC (REALISTIC)
      const safeMissLeft = Math.max(
        remaining - classesToAttendMore,
        0
      );

      let status = "SAFE";
      if (safeMissLeft <= 2 && safeMissLeft >= 0) status = "BORDER";
      if (safeMissLeft < 0) status = "DANGER";

      // Overall aggregation
      overall.totalPlanned += T;
      overall.totalAttended += A;

      if (status === "DANGER") overall.status = "DANGER";
      else if (status === "BORDER" && overall.status !== "DANGER")
        overall.status = "BORDER";

      report.push({
        subject: sub.name,
        totalClasses: T,
        attended: A,
        missed: M,
        remaining,
        requiredAttend,
        classesToAttendMore,
        safeMissLeft,
        status,
      });
    }

    overall.percentage = overall.totalPlanned
      ? (
          (overall.totalAttended / overall.totalPlanned) *
          100
        ).toFixed(2)
      : 0;

    res.json({
      eligibilityRule: `${P}%`,
      overall,
      subjects: report,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
