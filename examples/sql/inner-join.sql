-- Maya's (student 1) classes with the course name and teacher.
SELECT c.name, c.teacher, e.grade
FROM enrollments AS e
JOIN courses AS c ON c.id = e.course_id
WHERE e.student_id = 1;

-- Who is in Computer Science 1, highest grade first? This joins three tables.
SELECT s.first_name, s.last_name, e.grade
FROM students AS s
JOIN enrollments AS e ON e.student_id = s.id
JOIN courses AS c ON c.id = e.course_id
WHERE c.name = 'Computer Science 1'
ORDER BY e.grade DESC;

-- Freshmen and their classes. Zoe is a freshman but has no enrollments.
SELECT s.first_name, c.name
FROM students AS s
JOIN enrollments AS e ON e.student_id = s.id
JOIN courses AS c ON c.id = e.course_id
WHERE s.grade_level = 9;
