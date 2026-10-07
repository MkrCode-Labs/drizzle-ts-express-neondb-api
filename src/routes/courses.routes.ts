import { Router } from "express";
import { getCourses, createCourse } from "../controllers/courses.controller";

const router = Router();

router.get("/", getCourses);
router.post("/", createCourse);

export default router;
