# Lead Management System

A small full-stack app for adding, viewing, editing, and deleting leads. The frontend uses Angular; the API uses Node.js, Express, and MongoDB.

## Requirements

- Node.js and npm
- MongoDB running locally, or a MongoDB connection URI

## Setup

From the project root, create your local environment file:

```cmd
copy .env.example .env
```

The example uses a local MongoDB database. If your MongoDB runs elsewhere, edit `DB_URL` in `.env`.

Install dependencies and start the backend in the first terminal:

```cmd
cd server
npm install
npm start
```

Start the frontend in a second terminal from the project root:

```cmd
cd client
npm install
npm start
```

Open `http://localhost:4200`. The Angular development server forwards `/api` requests to the backend at `http://localhost:3000`.

## API

Base path: `/api/v1/leads`

| Method   | Path                | Description                             |
| -------- | ------------------- | --------------------------------------- |
| `GET`    | `/api/v1/leads`     | List leads, newest first                |
| `GET`    | `/api/v1/leads/:id` | Get one lead by MongoDB ID              |
| `POST`   | `/api/v1/leads`     | Create a lead                           |
| `PUT`    | `/api/v1/leads/:id` | Replace a lead's name, email, and phone |
| `DELETE` | `/api/v1/leads/:id` | Delete a lead by MongoDB ID             |

Create and update validate name, email, and phone. Invalid input returns `400 Bad Request`. Email addresses must be unique; a repeated email returns `409 Conflict` with `A lead with this email already exists.` Phone numbers must contain 7 to 15 digits, but are not required to be unique. Update replaces all three lead fields. Update and delete return `404 Not Found` if the lead does not exist.

Successful responses use `{ "success": true, "data": ... }`. Errors use `{ "success": false, "error": { "message": ..., "details": [...] } }`.

Example create request:

```cmd
curl -X POST http://localhost:3000/api/v1/leads -H "Content-Type: application/json" -d "{\"name\":\"Example Lead\",\"email\":\"example@example.com\",\"phone\":\"+1 555 123 4567\"}"
```

Update a lead by replacing its details:

```cmd
curl -X PUT http://localhost:3000/api/v1/leads/LEAD_ID -H "Content-Type: application/json" -d "{\"name\":\"Updated Lead\",\"email\":\"updated@example.com\",\"phone\":\"+1 555 123 4567\"}"
```

Delete a lead:

```cmd
curl -X DELETE http://localhost:3000/api/v1/leads/LEAD_ID
```

## Tests and build

Run the backend test from the project root:

```cmd
cd server
npm test
```

The GET leads test uses a mocked model and does not require MongoDB. To build the Angular frontend:

```cmd
cd client
npm run build
```

## Project structure

- `server/src/` contains the Express API, validation, MongoDB model, and error handling.
- `server/tests/` contains the backend API test.
- `client/src/app/` contains the Angular screen, lead model interfaces, and API service for creating, listing, editing, and deleting leads.

