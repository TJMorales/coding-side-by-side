-- Rank students within Computer Science 1 and Algebra 2. Ranking restarts for each course.
SELECT c.name AS course, s.first_name, e.grade,
       RANK() OVER (PARTITION BY e.course_id ORDER BY e.grade DESC) AS class_rank
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses AS c ON c.id = e.course_id
WHERE e.course_id IN (1, 3);

-- Each Computer Science 1 grade next to the course average. Every row is kept.
SELECT s.first_name, e.grade,
       AVG(e.grade) OVER () AS course_average,
       e.grade - AVG(e.grade) OVER () AS difference
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
WHERE e.course_id = 1;

-- Top grades in the school. Two grades of 90 tie.
SELECT student_id, course_id, grade,
       RANK() OVER (ORDER BY grade DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY grade DESC) AS dense_rank,
       ROW_NUMBER() OVER (ORDER BY grade DESC) AS row_number
FROM enrollments
ORDER BY grade DESC
LIMIT 9;
