-- How many students, how many have a GPA, and the average GPA.
SELECT COUNT(*) AS students,
       COUNT(gpa) AS have_gpa,
       ROUND(AVG(gpa), 2) AS average_gpa
FROM students;

-- Biology: enrolled, graded, average, lowest, and highest grade.
SELECT COUNT(*) AS enrolled,
       COUNT(grade) AS graded,
       AVG(grade) AS average,
       MIN(grade) AS lowest,
       MAX(grade) AS highest
FROM enrollments
WHERE course_id = 4;

-- Maya's (student 1) total and average points across her classes.
SELECT COUNT(*) AS classes, SUM(grade) AS total_points, AVG(grade) AS average
FROM enrollments
WHERE student_id = 1;
