-- Number of students and average GPA in each grade level.
SELECT grade_level,
       COUNT(*) AS students,
       ROUND(AVG(gpa), 2) AS average_gpa
FROM students
GROUP BY grade_level;

-- Average grade in each course, highest first.
SELECT course_id,
       COUNT(grade) AS graded,
       ROUND(AVG(grade), 1) AS average
FROM enrollments
GROUP BY course_id
ORDER BY average DESC;

-- Only courses with 4 or more students. HAVING filters groups.
SELECT course_id, COUNT(*) AS enrolled
FROM enrollments
GROUP BY course_id
HAVING COUNT(*) >= 4;
