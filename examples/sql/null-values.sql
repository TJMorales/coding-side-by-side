-- Who has no GPA? Using = NULL returns no rows.
SELECT first_name, gpa FROM students WHERE gpa = NULL;

-- IS NULL is the correct test.
SELECT first_name, gpa FROM students WHERE gpa IS NULL;

-- Show a label instead of NULL for a missing Biology grade.
SELECT student_id, COALESCE(grade, 'Not graded') AS grade
FROM enrollments
WHERE course_id = 4;

-- Biology grades under 80. Ethan's NULL grade is not counted as under 80.
SELECT student_id, grade
FROM enrollments
WHERE course_id = 4 AND grade < 80;
