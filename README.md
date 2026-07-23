# Task API

A simple to-do list API with CRUD operations, running on **Node.js**, **Express**, and **Postgres** in Docker.

## Architecture

Two repository implementations exist side by side in `src/repositories/`:

- **`sqliteTaskRepository.js`** — stores data in a local `tasks.db` file using SQLite
- **`postgresTaskRepository.js`** — stores data in a Postgres database (the active one)

Both expose the same methods: `getAll()`, `getById(id)`, `create(title)`, `update(id, data)`, `delete(id)`.

> **Note:** The `better-sqlite3` npm package was removed from `package.json` because the app now runs on Postgres in Docker. The `sqliteTaskRepository.js` source file is kept in the repo to demonstrate the architecture — if you want to run the SQLite version locally, install `better-sqlite3` manually with `npm install better-sqlite3` and change the import in `server.js`.

Switching between them requires changing **only one import line** in `server.js`:
```js
// const repo = require('./src/repositories/sqliteTaskRepository.js');
const repo = require('./src/repositories/postgresTaskRepository.js');
```

The service logic and routes remain **completely unchanged**. That's the architecture proving itself.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (with WSL2 backend on Windows)

## Setup & Run

```bash
git clone https://github.com/AnelkaCH/BE-01.git
cd BE-01
```

Make sure `.env` exists (it is gitignored) and contains your database URL:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/tasksdb
```

Then start the whole stack:
```bash
docker compose up
```

This starts both the Postgres database and the Node app. The app is available at `http://localhost:3000`.

## Endpoints

| Method  | Path            | Description              | Status Codes  |
|---------|-----------------|--------------------------|---------------|
| GET     | /               | API description          | 200           |
| GET     | /health         | Health check             | 200           |
| GET     | /tasks          | List all tasks           | 200           |
| GET     | /tasks/:id      | Get a single task        | 200, 404      |
| POST    | /tasks          | Create a new task        | 201, 400      |
| PUT     | /tasks/:id      | Update a task            | 200, 400, 404 |
| DELETE  | /tasks/:id      | Delete a task            | 204, 404      |
| GET     | /docs           | Swagger UI documentation | 200           |

## Persistence Proof

Data survives container restarts because Postgres stores it in a Docker volume (`pgdata`).

To verify:
1. Start the stack: `docker compose up`
2. Create a task: `curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Test persistence"}'`
3. Restart the stack: `docker compose restart`
4. Check tasks are still there: `curl http://localhost:3000/tasks`

The task you created in step 2 will still be present after restart.

## Stopping

```bash
docker compose down
```

To also remove the database volume (deletes all data):
```bash
docker compose down -v
```

## Swagger UI

Interactive API documentation at `http://localhost:3000/docs`.

![Swagger UI](image.png)