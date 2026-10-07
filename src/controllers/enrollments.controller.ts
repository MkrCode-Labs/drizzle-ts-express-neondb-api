import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { coursesTable, enrollmentsTable, studentsTable } from "../db/schema";
import type { NewEnrollment } from "../db/schema";

export const createEnrollment = async (req: Request, res: Response) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ error: "Student ID and course ID are required" });
        }

        const enrollment: NewEnrollment = {
            studentId: studentId,
            courseId: courseId,
        };

        // verificar que exista el estudiante
        const existingStudent = await db
            .select()
            .from(studentsTable)
            .where(eq(studentsTable.id, studentId))
            .limit(1);

        if (existingStudent.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        // verificar que exista el curso
        const existingCourse = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.id, courseId))
            .limit(1);

        if (existingCourse.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        const [createdEnrollment] = await db
            .insert(enrollmentsTable)
            .values(enrollment)
            .returning();

        return res.status(201).json(createdEnrollment);
    } catch (error) {
        console.error("Error al crear inscripción:", error);

        if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
            return res.status(400).json({ error: "Enrollment already exists" });
        }

        res.status(500).json({ error: "Error al crear inscripción" });
    }
};
