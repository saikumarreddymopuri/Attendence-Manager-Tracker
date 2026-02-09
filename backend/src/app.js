import express from "express";
import cors from "cors";

// import studentRoutes from "./routes/student.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import eligibilityRoutes from "./routes/eligibility.routes.js";
import authRoutes from "./routes/auth.routes.js";
import semesterRoutes from "./routes/semester.routes.js";


import dotenv from "dotenv";
dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/student", studentRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/eligibility", eligibilityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/semesters", semesterRoutes);

app.get("/", (req, res) => {
  res.send("MedAttend Backend Running");
});

export default app;
