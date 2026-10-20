-- Join first and last name into one column. || joins text, and AS names the column.
SELECT first_name || ' ' || last_name AS full_name
FROM students
LIMIT 4;

-- Graduation year for the 2026-27 school year: seniors graduate in 2027.
SELECT first_name, grade_level, 2039 - grade_level AS class_of
FROM students
WHERE grade_level >= 11;

-- Add a 5 point curve to Biology grades. Ethan has no grade yet (NULL).
SELECT student_id, grade, grade + 5 AS curved_grade
FROM enrollments
WHERE course_id = 4;

-- Integer divided by integer drops the decimal.
SELECT 95 / 2 AS integer_result, 95 / 2.0 AS decimal_result;
