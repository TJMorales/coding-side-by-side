-- Freshmen and their course ids. Zoe stays in the result with NULL.
SELECT s.first_name, e.course_id, e.grade
FROM students AS s
LEFT JOIN enrollments AS e ON e.student_id = s.id
WHERE s.grade_level = 9;

-- Students with no classes: the joined columns are NULL.
SELECT s.first_name, s.last_name
FROM students AS s
LEFT JOIN enrollments AS e ON e.student_id = s.id
WHERE e.student_id IS NULL;

-- Number of classes for every student, including 0 for Zoe.
SELECT s.first_name, COUNT(e.course_id) AS classes
FROM students AS s
LEFT JOIN enrollments AS e ON e.student_id = s.id
GROUP BY s.id
ORDER BY classes, s.first_name;
