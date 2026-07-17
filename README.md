# Task API

A simple to-do list API built with Node.js and Express, developed as part of the Backend Engineering track.

## Endpoints

- `GET /` - API description (name, version, available endpoints)
- `GET /health` - Health check, returns `{ "status": "ok" }`
- `GET /tasks` - List all tasks
- `GET /tasks/:id` - Get a single task by ID (404 if not found)
- `POST /tasks` - Create a new task (201)
- `PUT /tasks/:id` - Update a task's title/done (404 if not found)
- `DELETE /tasks/:id` - Delete a task (204, 404 if not found)
- `GET /docs` - Swagger UI interactive documentation

## Run locally

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## Test it

### Common requests

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/health
curl -i http://localhost:3000/tasks
curl -i http://localhost:3000/tasks/1
curl -i http://localhost:3000/tasks/99
curl -i -X DELETE http://localhost:3000/tasks/1
```

### Create a task

**Windows CMD / PowerShell**

```cmd
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
```

**Linux/macOS/Git Bash**

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```

### Update a task

**Windows CMD / PowerShell**

```cmd
curl -i -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d "{\"done\":true}"
```

**Linux/macOS/Git Bash**

```bash
curl -i -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"done":true}'
```

Browser: open `http://localhost:3000/` or `http://localhost:3000/tasks` directly.

## Swagger UI

Interactive API documentation is available at:

```
http://localhost:3000/docs
```

You can test the full CRUD cycle (create, read, update, delete) directly from the browser using the **Try it out** button on each endpoint.
