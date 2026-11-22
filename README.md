# Lead Management System

Backend API for a lead management application. The Angular client is the next part of the project.

## Requirements

- Node.js and npm
- MongoDB running locally, or a MongoDB connection URI

## Backend setup

From the project root, create your local environment file from the example:

```cmd
copy .env.example .env
```

Edit `.env` if your MongoDB URI differs. Then install and start the API:

```cmd
cd server
npm install
npm start
```

The API listens on `http://localhost:3000` by default. The server connects to MongoDB before it starts listening.

## API endpoints

Base path: `/api/v1/leads`

| Method | Path                | Description                |
| ------ | ------------------- | -------------------------- |
| `GET`  | `/api/v1/leads`     | List leads, newest first   |
| `GET`  | `/api/v1/leads/:id` | Get one lead by MongoDB ID |
| `POST` | `/api/v1/leads`     | Create a lead              |

Example create request:

```cmd
curl -X POST http://localhost:3000/api/v1/leads -H "Content-Type: application/json" -d "{\"name\":\"Example Lead\",\"email\":\"example@example.com\",\"phone\":\"+1 555 123 4567\"}"
```

Successful responses use `{ "success": true, "data": ... }`. Errors use `{ "success": false, "error": { "message": ..., "details": [...] } }`.

## Tests

From the `server` directory, run all backend tests:

```cmd
npm test
```

The GET leads test uses a mocked model and does not require a running MongoDB instance.
