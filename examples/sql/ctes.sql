-- Courses with an average grade of 85 or more.
-- The WITH part builds a temporary result named course_avg.
WITH course_avg AS (
    SELECT course_id, AVG(grade) AS average
    FROM enrollments
    GROUP BY course_id
)
SELECT c.name, ROUND(a.average, 1) AS average
FROM course_avg AS a
JOIN courses AS c ON c.id = a.course_id
WHERE a.average >= 85;

-- Students averaging 90 or more. Two CTEs, the second reads the first.
WITH student_avg AS (
    SELECT student_id, AVG(grade) AS average
    FROM enrollments
    GROUP BY student_id
),
high_avg AS (
    SELECT * FROM student_avg WHERE average >= 90
)
SELECT s.first_name, s.last_name, ROUND(h.average, 1) AS average
FROM high_avg AS h
JOIN students AS s ON s.id = h.student_id;
