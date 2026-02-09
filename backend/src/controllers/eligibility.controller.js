import Subject from "../models/subject.model.js";
import Student from "../models/student.model.js";

export const getEligibilityReport = async (req, res) => {
  try {
    const student = await Student.findOne();
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const subjects = await Subject.find();
    const P = student.eligibilityPercentage; // usually 75

    let overall = {
      totalPlanned: 0,
      totalAttended: 0,
      percentage: 0,
      status: "SAFE",
    };

    const report = subjects.map((sub) => {
      const T = sub.totalPlannedClasses;
      const A = sub.attendedClasses;
      const M = sub.missedClasses;

      const requiredAttend = Math.ceil((P / 100) * T);
      const maxMissAllowed = T - requiredAttend;
      const safeMissLeft = maxMissAllowed - M;
      const classesToAttendMore = Math.max(requiredAttend - A, 0);
      const remainingClasses = T - (A + M);


      // predictor simulations
const missOne = safeMissLeft - 1;
const missTwo = safeMissLeft - 2;

const predictStatus = (value) => {
  if (value > 2) return "SAFE";
  if (value >= 0) return "BORDER";
  return "DANGER";
};

const predictor = {
  miss1Class: {
    safeMissLeft: missOne,
    status: predictStatus(missOne),
  },
  miss2Classes: {
    safeMissLeft: missTwo,
    status: predictStatus(missTwo),
  },
  attendAllRemaining: {
    safeMissLeft: maxMissAllowed - M,
    status: predictStatus(maxMissAllowed - M),
  },
};


      let status = "SAFE";
      if (safeMissLeft <= 2 && safeMissLeft >= 0) status = "BORDER";
      if (safeMissLeft < 0) status = "DANGER";

      // overall calc
      overall.totalPlanned += T;
      overall.totalAttended += A;

      if (status === "DANGER") overall.status = "DANGER";
      else if (status === "BORDER" && overall.status !== "DANGER")
        overall.status = "BORDER";

      return {
        subject: sub.name,
        totalClasses: T,
        attended: A,
        missed: M,
        remaining: remainingClasses,

        requiredAttend,
        classesToAttendMore,
        maxMissAllowed,
        safeMissLeft,

        status,
        predictor,
      };
    });

    overall.percentage = overall.totalPlanned
      ? ((overall.totalAttended / overall.totalPlanned) * 100).toFixed(2)
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
