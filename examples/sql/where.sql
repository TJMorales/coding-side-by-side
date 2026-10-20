-- Which students are in grade 10?
SELECT first_name, last_name
FROM students
WHERE grade_level = 10;

-- Which students have a GPA of 3.5 or higher (honor roll)?
SELECT first_name, last_name, gpa
FROM students
WHERE gpa >= 3.5;

-- Which courses does Morales teach? Text values go in single quotes.
SELECT name, room
FROM courses
WHERE teacher = 'Morales';
