-- First names that end in a. % matches any number of characters.
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a';

-- Courses in either the Math or Science department.
SELECT name, department FROM courses WHERE department IN ('Math', 'Science');

-- Grades from 80 to 89. BETWEEN includes both ends.
SELECT student_id, course_id, grade
FROM enrollments
WHERE grade BETWEEN 80 AND 89;
