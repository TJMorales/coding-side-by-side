-- Count from 1 to 10. Start with 1, then keep adding 1 while n is under 10.
WITH RECURSIVE counter(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM counter WHERE n < 10
)
SELECT n FROM counter;

-- What do you need to take before Data Structures? Follow the chain back.
WITH RECURSIVE
prereq(course, requires) AS (
    VALUES ('Computer Science 2', 'Computer Science 1'),
           ('AP Computer Science A', 'Computer Science 2'),
           ('Data Structures', 'AP Computer Science A'),
           ('Cybersecurity Capstone', 'Cybersecurity')
),
chain(course, step) AS (
    SELECT 'Data Structures', 0
    UNION ALL
    SELECT p.requires, chain.step + 1
    FROM chain
    JOIN prereq AS p ON p.course = chain.course
)
SELECT step, course FROM chain ORDER BY step;
