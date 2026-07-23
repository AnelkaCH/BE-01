const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const app = express();
const PORT = 3000;
const repo = require('./src/repositories/postgresTaskRepository.js');

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0',
    endpoints: ['/tasks']
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', async (req, res) => {
  const rows = await repo.getAll();
  res.json(rows);
});

app.get('/tasks/:id', async (req, res) => {
  const task = await repo.getById(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }
  res.json(task);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = await repo.create(title.trim());
  res.status(201).json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const task = await repo.getById(id);
  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  const { title, done } = req.body;
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }
  const updated = await repo.update(id, {
    title: title !== undefined ? title.trim() : undefined,
    done,
  });
  res.json(updated);
});

app.delete('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await repo.delete(id);
  if (!deleted) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
