import express from "express";
import { getEligibilityReport } from "../controllers/eligibility.controller.js";

const router = express.Router();

router.get("/", getEligibilityReport);

export default router;
