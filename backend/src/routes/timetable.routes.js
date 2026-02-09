import express from "express";
import {
  setTimetable,
  getTimetableByDay,
  getFullTimetable,
} from "../controllers/timetable.controller.js";

const router = express.Router();

router.post("/", setTimetable);
router.get("/", getFullTimetable);
router.get("/:day", getTimetableByDay);



export default router;
