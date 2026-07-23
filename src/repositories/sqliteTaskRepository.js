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

function getAll() {
  return Promise.resolve(db.prepare('SELECT * FROM tasks').all());
}

function getById(id) {
  return Promise.resolve(db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) || null);
}

function create(title) {
  const info = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)').run(title, 0);
  return Promise.resolve(db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid));
}

function update(id, data) {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) return Promise.resolve(null);
  const updates = [];
  const params = [];
  if (data.title !== undefined) {
    updates.push('title = ?');
    params.push(data.title);
  }
  if (data.done !== undefined) {
    updates.push('done = ?');
    params.push(data.done ? 1 : 0);
  }
  if (updates.length > 0) {
    params.push(id);
    db.prepare(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  }
  return Promise.resolve(db.prepare('SELECT * FROM tasks WHERE id = ?').get(id));
}

function deleteTask(id) {
  const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return Promise.resolve(info.changes > 0);
}

module.exports = { getAll, getById, create, update, delete: deleteTask };