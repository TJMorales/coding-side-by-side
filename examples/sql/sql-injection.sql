-- A program builds a query by pasting the user's input into the text.
-- Input Maya gives the query it expected.
SELECT id, first_name, gpa FROM students WHERE first_name = 'Maya';

-- Input x' OR '1'='1 closes the quote early. '1'='1' is true for every row.
SELECT id, first_name, gpa FROM students WHERE first_name = 'x' OR '1'='1';

-- A parameter sends the input as a value, never as SQL.
.parameter set :name "x' OR '1'='1"
SELECT id, first_name, gpa FROM students WHERE first_name = :name;

-- The same query works for honest input.
.parameter set :name Maya
SELECT id, first_name, gpa FROM students WHERE first_name = :name;
