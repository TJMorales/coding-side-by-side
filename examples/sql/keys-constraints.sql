-- SQLite only checks foreign keys after this setting is turned on.
PRAGMA foreign_keys = ON;

-- Maya (1) is already in Computer Science 1 (1) this semester.
-- The primary key (student_id, course_id, semester) blocks a second copy.
INSERT INTO enrollments (student_id, course_id, semester)
VALUES (1, 1, 'Fall 2026');

-- There is no student 99, so the foreign key on student_id blocks this row.
INSERT INTO enrollments (student_id, course_id, semester)
VALUES (99, 1, 'Fall 2026');

-- last_name is NOT NULL, so a student must have one.
INSERT INTO students (first_name, last_name, grade_level)
VALUES ('Jada', NULL, 9);
