-- A new table for school clubs. Each column has a name and a type.
CREATE TABLE clubs (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    sponsor     TEXT,
    meeting_day TEXT,
    dues        REAL DEFAULT 0
);

-- .schema is a sqlite3 shell command that prints how a table was created.
.schema clubs

-- Add one club. id and dues are left out, so SQLite fills them in.
INSERT INTO clubs (name, sponsor, meeting_day)
VALUES ('DECA', 'Morales', 'Tuesday');

SELECT * FROM clubs;
