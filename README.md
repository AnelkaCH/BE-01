# Task API

A simple to-do list API built with Node.js and Express, developed as part of the Backend Engineering track.

## Endpoints

- `GET /` - API description (name, version, available endpoints)
- `GET /health` - Health check, returns `{ "status": "ok" }`
- `GET /tasks` - List all tasks
- `GET /tasks/:id` - Get a single task by ID (404 if not found)
- `POST /tasks` - Create a new task (201)

## Run locally

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## Test it

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/health
curl -i http://localhost:3000/tasks
curl -i http://localhost:3000/tasks/1
curl -i http://localhost:3000/tasks/99
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```

Browser: open `http://localhost:3000/` or `http://localhost:3000/tasks` directly.
