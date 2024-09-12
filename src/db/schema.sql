CREATE TABLE IF NOT EXISTS historical_price (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  price INTEGER NOT NULL,
  instrument TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  session TEXT,
  expiry DATETIME
);
