-- A view saves a query under a name. This one lists each class roster.
CREATE VIEW roster AS
SELECT c.name AS course, s.first_name, s.last_name, e.grade
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses AS c ON c.id = e.course_id;

-- Use the view like a table.
SELECT first_name, last_name, grade FROM roster WHERE course = 'Cybersecurity';

-- Lucas (student 8) gets his Cybersecurity grade raised in the real table.
UPDATE enrollments SET grade = 91 WHERE student_id = 8 AND course_id = 2;

-- The view shows the new grade. It runs its query again each time.
SELECT first_name, last_name, grade FROM roster WHERE course = 'Cybersecurity';
