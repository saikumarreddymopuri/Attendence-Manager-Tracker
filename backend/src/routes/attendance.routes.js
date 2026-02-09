import express from "express";
import {
  markAttendance,
  getTodayAttendance,
  getAbsentHistory,
} from "../controllers/attendance.controller.js";

const router = express.Router();

// mark attendance
router.post("/", markAttendance);

// get today's attendance (LOCK UI)
router.get("/today", getTodayAttendance);

// get absent history
router.get("/absent", getAbsentHistory);

export default router;
