-- Ethan's (student 6) enrollments before the upsert.
SELECT course_id, grade FROM enrollments WHERE student_id = 6;

-- Biology (4) already exists, so its grade is updated.
-- Cybersecurity (2) is new, so it is inserted.
INSERT INTO enrollments (student_id, course_id, semester, grade)
VALUES (6, 4, 'Fall 2026', 88),
       (6, 2, 'Fall 2026', 92)
ON CONFLICT (student_id, course_id, semester)
DO UPDATE SET grade = excluded.grade;

-- DO NOTHING skips the row if it already exists. His CS1 grade stays 87.
INSERT INTO enrollments (student_id, course_id, semester, grade)
VALUES (6, 1, 'Fall 2026', 50)
ON CONFLICT DO NOTHING;

SELECT course_id, grade FROM enrollments WHERE student_id = 6;
