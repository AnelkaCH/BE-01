# Task API

A simple to-do list API built with Node.js and Express, developed as part of the Backend Engineering track.

## Endpoints

- `GET /` - API description (name, version, available endpoints)
- `GET /health` - Health check, returns `{ "status": "ok" }`

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
```

Browser: open `http://localhost:3000/` or `http://localhost:3000/health` directly.
