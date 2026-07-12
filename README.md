# FlyRank AI Internship BE-01 - Backend Basics

A minimal backend with two JSON endpoints, built as a first assignment for the FlyRank AI Backend Engineering track.

## Endpoints

- `GET /api/health` - returns server status and current timestamp
- `GET /api/hello?name=YourName` - returns a greeting message

## Run locally

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## Test it

Curl:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/hello?name=Anelka
```

Browser: open `http://localhost:3000/api/hello?name=WhatsMyName` directly in the address bar.
