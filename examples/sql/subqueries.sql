-- Students with a GPA above the school average. The inner query runs first.
SELECT first_name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students);

-- Students who are not enrolled in any class.
SELECT first_name, last_name
FROM students
WHERE id NOT IN (SELECT student_id FROM enrollments);

-- Who is in Cybersecurity? The inner query finds the course id by name.
SELECT first_name, last_name
FROM students
WHERE id IN (SELECT student_id FROM enrollments
             WHERE course_id = (SELECT id FROM courses WHERE name = 'Cybersecurity'));

-- Each sophomore's best grade. The inner query runs once per student.
SELECT first_name,
       (SELECT MAX(grade) FROM enrollments AS e WHERE e.student_id = s.id) AS best_grade
FROM students AS s
WHERE grade_level = 10;
