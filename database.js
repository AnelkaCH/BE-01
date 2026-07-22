const sqlite = require('better-sqlite3');
const db = new sqlite('tasks.db');

db.prepare(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  done INTEGER NOT NULL DEFAULT 0
)`).run();

const result = db.prepare('SELECT COUNT(*) AS count FROM tasks').get();

if (result.count === 0) {
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insert.run('Groceries', 0);
  insert.run('Laundry', 0);
}