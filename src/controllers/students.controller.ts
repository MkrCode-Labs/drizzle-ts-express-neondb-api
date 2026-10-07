import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { validate } from "uuid";
import { db } from "../db";
import { coursesTable, enrollmentsTable, studentsTable } from "../db/schema";
import type { NewStudent } from "../db/schema";

export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await db.select().from(studentsTable);
        res.json(students);
    } catch (error) {
        console.error("Error al obtener estudiantes:", error);
        res.status(500).json({ error: "Error al obtener estudiantes" });
    }
};

export const createStudent = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        const student: NewStudent = {
            name: name,
            email: email,
        };

        const [createdStudent] = await db
            .insert(studentsTable)
            .values(student)
            .returning();

        return res.status(201).json(createdStudent);
    } catch (error) {
        console.error("Error al crear estudiante:", error);
        res.status(500).json({ error: "Error al crear estudiante" });
    }
};

export const getStudentCourses = async (
    req: Request<{ studentId: string }>,
    res: Response
) => {
    try {
        const { studentId } = req.params;

        if (!studentId || !validate(studentId)) {
            return res.status(400).json({ error: "Invalid student ID" });
        }

        // Verificar que exista el estudiante
        const existingStudent = await db
            .select()
            .from(studentsTable)
            .where(eq(studentsTable.id, studentId))
            .limit(1);

        if (existingStudent.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        // obtener los cursos
        const courses = await db
            .select({
                studentName: studentsTable.name,
                courseName: coursesTable.title,
                enrolledAt: enrollmentsTable.enrolledAt,
            })
            .from(enrollmentsTable)
            .innerJoin(coursesTable, eq(enrollmentsTable.courseId, coursesTable.id))
            .innerJoin(studentsTable, eq(enrollmentsTable.studentId, studentsTable.id))
            .where(eq(enrollmentsTable.studentId, studentId));

        res.json(courses);
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        res.status(500).json({ error: "Error al obtener inscripciones" });
    }
};
