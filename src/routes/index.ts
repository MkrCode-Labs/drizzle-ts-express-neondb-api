import { Router } from "express";
import studentsRoutes from "./students.routes";
import coursesRoutes from "./courses.routes";
import enrollmentsRoutes from "./enrollments.routes";

const router = Router();

router.use("/students", studentsRoutes);
router.use("/courses", coursesRoutes);
router.use("/enrollments", enrollmentsRoutes);

export default router;
