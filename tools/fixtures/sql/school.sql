-- Sample database used by every SQL example on this page.
-- A small high school: students, the courses they take, and their grades.

CREATE TABLE students (
    id          INTEGER PRIMARY KEY,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    grade_level INTEGER NOT NULL,
    gpa         REAL
);

CREATE TABLE courses (
    id         INTEGER PRIMARY KEY,
    name       TEXT NOT NULL,
    department TEXT NOT NULL,
    teacher    TEXT NOT NULL,
    room       INTEGER
);

CREATE TABLE enrollments (
    student_id INTEGER NOT NULL REFERENCES students(id),
    course_id  INTEGER NOT NULL REFERENCES courses(id),
    semester   TEXT NOT NULL,
    grade      INTEGER,
    PRIMARY KEY (student_id, course_id, semester)
);

INSERT INTO students (id, first_name, last_name, grade_level, gpa) VALUES
    (1,  'Maya',   'Lopez',    10, 3.8),
    (2,  'Leo',    'Nguyen',   11, 3.1),
    (3,  'Ava',    'Patel',    10, 3.6),
    (4,  'Noah',   'Johnson',  12, 3.9),
    (5,  'Sofia',  'Garcia',   11, 2.7),
    (6,  'Ethan',  'Kim',      10, 3.4),
    (7,  'Mia',    'Brown',    12, 2.9),
    (8,  'Lucas',  'Martinez', 11, 3.3),
    (9,  'Zoe',    'Williams', 9,  NULL),
    (10, 'Diego',  'Hernandez', 9, 3.0);

INSERT INTO courses (id, name, department, teacher, room) VALUES
    (1, 'Computer Science 1', 'Technology', 'Morales', 2115),
    (2, 'Cybersecurity',      'Technology', 'Morales', 2115),
    (3, 'Algebra 2',          'Math',       'Chen',    1204),
    (4, 'Biology',            'Science',    'Okafor',  3102),
    (5, 'Jazz Band',          'Fine Arts',  'Reyes',   NULL),
    (6, 'Personal Finance',   'Technology', 'Morales', 2115);

INSERT INTO enrollments (student_id, course_id, semester, grade) VALUES
    (1, 1, 'Fall 2026', 96), (1, 3, 'Fall 2026', 91), (1, 5, 'Fall 2026', 98),
    (2, 1, 'Fall 2026', 82), (2, 2, 'Fall 2026', 88), (2, 4, 'Fall 2026', 74),
    (3, 1, 'Fall 2026', 90), (3, 3, 'Fall 2026', 85),
    (4, 2, 'Fall 2026', 99), (4, 6, 'Fall 2026', 94), (4, 5, 'Fall 2026', 97),
    (5, 3, 'Fall 2026', 68), (5, 4, 'Fall 2026', 79),
    (6, 1, 'Fall 2026', 87), (6, 4, 'Fall 2026', NULL),
    (7, 6, 'Fall 2026', 72), (7, 5, 'Fall 2026', 90),
    (8, 2, 'Fall 2026', 84), (8, 3, 'Fall 2026', 77), (8, 1, 'Fall 2026', 80),
    (10, 4, 'Fall 2026', 81);
