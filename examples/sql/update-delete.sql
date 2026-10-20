-- Biology (course 4) before any changes.
SELECT student_id, grade FROM enrollments WHERE course_id = 4;

-- Ethan (student 6) took his makeup test. Set his Biology grade.
UPDATE enrollments
SET grade = 85
WHERE student_id = 6 AND course_id = 4;

-- Leo (student 2) dropped Biology. Remove that one enrollment.
DELETE FROM enrollments
WHERE student_id = 2 AND course_id = 4;

-- Biology after the changes.
SELECT student_id, grade FROM enrollments WHERE course_id = 4;
