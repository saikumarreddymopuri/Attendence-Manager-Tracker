import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createSemester, getSemesters, getSemesterById } from "../controllers/semester.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createSemester);
router.get("/", getSemesters);
router.get("/:semesterId", getSemesterById);

export default router;
