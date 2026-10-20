-- The three highest GPAs. DESC sorts from largest to smallest.
SELECT first_name, last_name, gpa
FROM students
ORDER BY gpa DESC
LIMIT 3;

-- Sort by grade level, then by last name within each grade.
SELECT grade_level, last_name, first_name
FROM students
ORDER BY grade_level, last_name;

-- The three lowest GPAs. Zoe has no GPA (NULL), and SQLite sorts NULL first.
SELECT first_name, gpa
FROM students
ORDER BY gpa
LIMIT 3;
