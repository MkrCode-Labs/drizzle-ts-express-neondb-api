import type { Request, Response } from "express";
import { db } from "../db";
import { coursesTable } from "../db/schema";
import type { NewCourse } from "../db/schema";

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await db.select().from(coursesTable);
        res.json(courses);
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        res.status(500).json({ error: "Error al obtener cursos" });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const course: NewCourse = {
            title: title,
        };

        const [createdCourse] = await db
            .insert(coursesTable)
            .values(course)
            .returning();

        return res.status(201).json(createdCourse);
    } catch (error) {
        console.error("Error al crear curso:", error);
        res.status(500).json({ error: "Error al crear curso" });
    }
};
