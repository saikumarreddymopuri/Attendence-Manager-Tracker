import express from "express";
import {
  setTimetable,
  getTimetableByDay,
  getFullTimetable,
} from "../controllers/timetable.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// semester-specific routes
router.post("/:semesterId", protect, setTimetable);
router.get("/:semesterId", protect, getFullTimetable);
router.get("/:semesterId/:day", protect, getTimetableByDay);

export default router;
