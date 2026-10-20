-- Letter grades for Biology. Check for NULL first, or it falls to ELSE.
SELECT student_id, grade,
       CASE
           WHEN grade IS NULL THEN 'Incomplete'
           WHEN grade >= 90 THEN 'A'
           WHEN grade >= 80 THEN 'B'
           WHEN grade >= 70 THEN 'C'
           ELSE 'F'
       END AS letter
FROM enrollments
WHERE course_id = 4;

-- Name each grade level, then count students in it.
SELECT CASE grade_level
           WHEN 9 THEN 'Freshman'
           WHEN 10 THEN 'Sophomore'
           WHEN 11 THEN 'Junior'
           ELSE 'Senior'
       END AS class,
       COUNT(*) AS students
FROM students
GROUP BY grade_level;

-- Honor roll count. Zoe has no GPA, so she lands in ELSE.
SELECT CASE WHEN gpa >= 3.5 THEN 'Honor roll' ELSE 'Not on honor roll' END AS status,
       COUNT(*) AS students
FROM students
GROUP BY status;
