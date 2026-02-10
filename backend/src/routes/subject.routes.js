import express from "express";
import { saveSubjects } from "../controllers/subject.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:semesterId", protect, saveSubjects);

export default router;
