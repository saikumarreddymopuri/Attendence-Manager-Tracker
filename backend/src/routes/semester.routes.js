import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createSemester, getSemesters, getSemesterById, completeSemesterSetup, } from "../controllers/semester.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createSemester);
router.get("/", getSemesters);
router.get("/:semesterId", getSemesterById);

router.patch(
  "/:semesterId/complete-setup",
  protect,
  completeSemesterSetup
);

export default router;
