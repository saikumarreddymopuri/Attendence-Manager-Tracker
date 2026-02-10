import express from "express";
import {
  getTodayAttendance,
  markAttendance,
  getAbsentHistory,
} from "../controllers/attendance.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/today/:semesterId", protect, getTodayAttendance);
router.post("/mark/:semesterId", protect, markAttendance);

// 🔥 Absent history
router.get("/absent/:semesterId", protect, getAbsentHistory);

export default router;
