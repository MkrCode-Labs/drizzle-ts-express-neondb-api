import { Router } from "express";
import { createEnrollment } from "../controllers/enrollments.controller";

const router = Router();

router.post("/", createEnrollment);

export default router;
