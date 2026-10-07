CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"student_id" uuid,
	"course_id" uuid,
	"enrolled_at" timestamp DEFAULT now(),
	CONSTRAINT "enrollments_pkey" PRIMARY KEY("student_id","course_id")
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id");