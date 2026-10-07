import { Router } from "express";
import {
    getStudents,
    createStudent,
    getStudentCourses,
} from "../controllers/students.controller";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:studentId/courses", getStudentCourses);

export default router;
