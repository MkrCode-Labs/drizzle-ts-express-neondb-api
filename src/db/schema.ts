import { pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const studentsTable = pgTable("students", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
})

export const coursesTable = pgTable("courses", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
})

// tabla pivot 
export const enrollmentsTable = pgTable("enrollments", {
    studentId: uuid("student_id")
        .notNull()
        .references(() => studentsTable.id),
    courseId: uuid("course_id")
        .notNull()
        .references(() => coursesTable.id),
    enrolledAt: timestamp("enrolled_at").defaultNow()
},

    (table) => ({
        pk: primaryKey({
            columns: [table.studentId, table.courseId]
        })
    })
)

// types
export type Student = typeof studentsTable.$inferSelect;
export type NewStudent = typeof studentsTable.$inferInsert;

export type Course = typeof coursesTable.$inferSelect;
export type NewCourse = typeof coursesTable.$inferInsert;

export type Enrollment = typeof enrollmentsTable.$inferSelect;
export type NewEnrollment = typeof enrollmentsTable.$inferInsert;