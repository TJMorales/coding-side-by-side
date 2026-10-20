-- How does SQLite find students by last name? SCAN means it reads every row.
EXPLAIN QUERY PLAN
SELECT first_name, last_name FROM students WHERE last_name = 'Patel';

-- An index on last_name keeps a sorted list of last names with their rows.
CREATE INDEX idx_students_last_name ON students (last_name);

-- Same query. SEARCH means it jumps straight to the matching rows.
EXPLAIN QUERY PLAN
SELECT first_name, last_name FROM students WHERE last_name = 'Patel';

-- Looking up by the primary key already uses a search.
EXPLAIN QUERY PLAN
SELECT first_name FROM students WHERE id = 3;
