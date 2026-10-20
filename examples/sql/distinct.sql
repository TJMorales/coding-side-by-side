-- Every course's department, with repeats.
SELECT department FROM courses;

-- Each department once.
SELECT DISTINCT department FROM courses;

-- Each teacher and room pair once. Reyes has no room (NULL).
SELECT DISTINCT teacher, room FROM courses;

-- How many enrollments, and how many different students they belong to.
SELECT COUNT(*) AS enrollments, COUNT(DISTINCT student_id) AS students
FROM enrollments;
