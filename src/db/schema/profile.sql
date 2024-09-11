CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    user_type TEXT NOT NULL,
    broker TEXT NOT NULL,
    email TEXT UNIQUE,
    name TEXT,
    password TEXT
);
