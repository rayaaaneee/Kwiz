CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    public_name TEXT
);
--
CREATE TABLE IF NOT EXISTS Quiz (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creator_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES User(id)
);
--
CREATE TABLE IF NOT EXISTS Question (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id INTEGER NOT NULL,
  order_val INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES Quiz(id)
);
--
CREATE TABLE IF NOT EXISTS Answer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  is_ok INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  order_val INTEGER NOT NULL,
  FOREIGN KEY (question_id) REFERENCES Question(id)
);