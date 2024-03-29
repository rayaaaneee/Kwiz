CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    public_name TEXT
);
--
DELETE FROM User;
--
CREATE TABLE IF NOT EXISTS Quiz (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creator_id INTEGER NOT NULL,
  theme TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES User(id)
);
--
DELETE FROM Quiz;
--
CREATE TABLE IF NOT EXISTS Question (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  is_unique_answer INTEGER NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES Quiz(id)
);
--
DELETE FROM Question;
--
CREATE TABLE IF NOT EXISTS Answer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  answer_text TEXT NOT NULL,
  is_ok INTEGER NOT NULL,
  FOREIGN KEY (question_id) REFERENCES Question(id)
);
--
DELETE FROM Answer;
--
CREATE TABLE IF NOT EXISTS Historical (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  quiz_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  date TEXT DEFAULT (strftime('%Y/%m/%d', 'now')),
  UNIQUE (user_id, quiz_id),
  FOREIGN KEY (quiz_id) REFERENCES Quiz(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);
--
DELETE FROM Historical;