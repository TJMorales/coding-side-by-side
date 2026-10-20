CREATE TABLE clubs (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    sponsor     TEXT,
    meeting_day TEXT
);

-- Add one row. List the columns, then the values in the same order.
INSERT INTO clubs (name, sponsor, meeting_day)
VALUES ('DECA', 'Morales', 'Tuesday');

-- Add two rows at once. meeting_day is not listed, so it becomes NULL.
INSERT INTO clubs (name, sponsor)
VALUES ('Robotics', 'Chen'),
       ('Chess Club', 'Okafor');

-- Check what is in the table now.
SELECT * FROM clubs;
