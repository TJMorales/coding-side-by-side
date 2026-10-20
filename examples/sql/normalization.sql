-- A flat table copies the teacher and room into every enrollment row.
CREATE TABLE flat_schedule AS
SELECT s.first_name AS student, c.name AS course, c.teacher, c.room
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses AS c ON c.id = e.course_id;

-- Morales and room 2115 repeat on all 5 Computer Science 1 rows.
SELECT * FROM flat_schedule WHERE course = 'Computer Science 1';

-- In the normalized tables, the room is stored once, in courses.
-- One UPDATE moves the class for all 5 students.
UPDATE courses SET room = 2120 WHERE id = 1;

SELECT s.first_name AS student, c.name AS course, c.teacher, c.room
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses AS c ON c.id = e.course_id
WHERE c.id = 1;
