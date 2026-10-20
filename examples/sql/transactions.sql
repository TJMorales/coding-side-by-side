-- Start a transaction, then delete Jazz Band (course 5) enrollments by mistake.
BEGIN;
DELETE FROM enrollments WHERE course_id = 5;

-- ROLLBACK undoes everything since BEGIN.
ROLLBACK;
SELECT COUNT(*) AS jazz_students FROM enrollments WHERE course_id = 5;

-- Schedule change: Sofia (student 5) leaves Algebra 2 (3) for Personal Finance (6).
-- Both changes are saved together by COMMIT.
BEGIN;
DELETE FROM enrollments WHERE student_id = 5 AND course_id = 3;
INSERT INTO enrollments (student_id, course_id, semester) VALUES (5, 6, 'Fall 2026');
COMMIT;
SELECT course_id, grade FROM enrollments WHERE student_id = 5;
