const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getAll() {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
  return rows;
}

async function getById(id) {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return rows[0] || null;
}

async function create(title) {
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, done) VALUES ($1, 0) RETURNING *',
    [title]
  );
  return rows[0];
}

async function update(id, data) {
  const task = await getById(id);
  if (!task) return null;
  const fields = [];
  const params = [];
  let idx = 1;
  if (data.title !== undefined) {
    fields.push(`title = $${idx++}`);
    params.push(data.title);
  }
  if (data.done !== undefined) {
    fields.push(`done = $${idx++}`);
    params.push(data.done ? 1 : 0);
  }
  if (fields.length === 0) return task;
  params.push(id);
  const { rows } = await pool.query(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    params
  );
  return rows[0];
}

async function deleteTask(id) {
  const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { getAll, getById, create, update, delete: deleteTask };