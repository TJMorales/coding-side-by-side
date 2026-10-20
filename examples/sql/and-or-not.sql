-- Sophomores (grade 10) with a GPA above 3.5. AND needs both to be true.
SELECT first_name, grade_level, gpa
FROM students
WHERE grade_level = 10 AND gpa > 3.5;

-- Freshmen or seniors. OR needs at least one to be true.
SELECT first_name, grade_level
FROM students
WHERE grade_level = 9 OR grade_level = 12;

-- Courses outside the Technology department.
SELECT name, department
FROM courses
WHERE NOT department = 'Technology';

-- Juniors or seniors with a GPA under 3.0. The parentheses make OR run first.
SELECT first_name, grade_level, gpa
FROM students
WHERE (grade_level = 11 OR grade_level = 12) AND gpa < 3.0;
