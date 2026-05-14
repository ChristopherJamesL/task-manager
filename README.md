# Task Manager (Full Stack Application)

A full-stack task management application built with Node.js, Express, PostgreSQL, and React.

---

## 🚀 Tech Stack

### Frontend

- React
- TypeScript
- React Query (TanStack Query) *(in progress)*
- TailwindCSS

### Backend

- Node.js
- Express
- Zod (validation)
- Redis-backed server-side session authentication (HTTP-only cookies)

### Database / Infrastructure

- PostgreSQL
- Redis (rate limiting + caching)
- Docker (development environment)

---

## ✨ Features

- User authentication (register, login, logout)
- Session-based authentication with protected routes
- User profile endpoint (`/api/auth/me`)
- Task management (create, update, delete)
- List-based organization for tasks
- Advanced task querying:
  - Filtering (priority, completion, date range)
  - Sorting (created date, due date)
  - Cursor-based pagination (efficient + scalable)
- Rate limiting for login attempts (Redis-backed)
- Full integration test coverage for core API flows

---

## 📁 Project Structure

```text
root/
├── client/ 
│    └── src/
│       ├── features/
│       │   └── auth/
│       │       ├── pages/
│       │       ├── api/
│       │       ├── queries/
│       │       └── components/
│       ├── components/         # shared UI (Button, Input, Layout)
│       ├── api/client/         # axios instance
│       ├── routes/             # route guards (ProtectedRoute, etc...)
│       ├── App.tsx
│       └── main.tsx            # React frontend (auth + UI in progress)
├── server/
│   ├── src/
│   │   ├── db/                 # PostgreSQL + Redis clients
│   │   ├── features/           # Feature-based modules
│   │   │   ├── auth/
│   │   │   ├── tasks/
│   │   │   └── lists/
│   │   ├── middleware/         # Express middleware (auth, rate limiting, etc.)
│   │   ├── utils/              # Shared utilities (responses, logging, pagination, etc.)
│   │   ├── app.js              # Express app configuration
│   │   └── server.js           # Server startup (DB + Redis initialization)
│   │
│   └── tests/                  # Integration tests (Jest + Supertest)
│       ├── auth/
│       ├── tasks/
│       ├── lists/
│       └── setup/              # Test setup (app, db helpers, redis setup, global test config)
│
└── README.md
```

---

## 💻 Frontend (React)

Located in `/client`

## Current Features (WIP)

- Authentication flows (login/register)
- Protected routes and dashboard layout
- Navbar with logout support
- React Query-based server state management

## Architecture Notes

- Feature-based frontend architecture (auth module isolated under `/features`)
- Server state managed with TanStack Query (React Query)
- Authentication via HTTP-only cookies (no client-side tokens)
- Client uses credentials: "include" for authenticated requests.
- Clear separation of:
  - feature logic
  - reusable UI components
  - layout components

---

## 💻 Backend (Node)

## Current Features

- Session-based authentication (Redis + HTTP-only cookies)
- Redis-backed rate limiting
- Task & list APIs
- Input validation using Zod
- Integration tests (Jest + Supertest)

## 🧠 Architecture Notes

- Feature-based modular design:
  - router
  - controller
  - service
  - model
- Clear separation of concerns:
  - Controllers → handle HTTP layer
  - Services → business logic
  - Models → database queries
- Server startup is explicitly managed:
  - PostgreSQL connection is verified on startup
  - Redis is initialized asynchronously before use
  - Rate limiters are initialized only after Redis is ready

## ⚙️ Getting Started

1. Install dependencies

```bash
cd server
npm install
```

2. Set up environment variables  
  Create a `.env` file in `/server`:

```env
PORT=8000
DATABASE_URL=your_postgres_connection_string
REDIS_URL=your_redis_connection_string
```

3. Run the server  
  From the project root:

```bash
npm run dev
```

Server runs at:

```bash
http://localhost:8000
```

---

## ⚙️ Running with Docker (Development)

1. Make sure Docker Desktop is running.

2. From the project root, build and start the containers:

```bash
docker-compose up --build
```

This will start three services:

- ``backend (Node.js app with nodemon)``
- ``db (PostgreSQL)``
- ``redis (Redis server, used for caching and rate limiting)``

3. The backend API will be available at:

- ``http://localhost:8000``

4. Stopping containers:

- ``docker-compose down``

Note: docker-compose down stops all services, but persistent volumes (like your Postgres data) are not deleted.

---

1. Postgres environment file (`./docker.env`) must contain the following variables:
   - `POSTGRES_USER` → database user
   - `POSTGRES_PASSWORD` → database password
   - `POSTGRES_DB` → database name
   *Do not commit this file with real credentials. Use local/dev values.*

2. Environment variables are still required for Docker. Copy your `.env` file into `/server/.env` so the backend and Redis/Postgres connections work correctly.

3. Docker uses a volume mount `./server:/app` for the backend. This allows live code reloads with nodemon when developing inside the container.

4. For production, you can build the Docker image without nodemon and run the server using `node server.js`. This avoids automatic reloads and is the recommended approach for deployment.

## 📌 Backend API Overview

Base URL:

```text
/api
```

### Auth

- POST /api/auth/register
- POST /api/auth/signin
- GET /api/auth/me
- POST /api/auth/logout

### Tasks

- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PATCH /api/tasks/:id
- DELETE /api/tasks/:id

### Lists

- GET /api/lists
- GET /api/lists/:id
- POST /api/lists
- PATCH /api/lists/:id
- DELETE /api/lists/:id

## 🔐 Authentication & Security

- Session-based authentication
- Session ID stored in HTTP-only cookie (`sid`)
- Session state stored in Redis
- Sessions expire after 7 days (configurable TTL)
- Server-side session validation on protected routes
- Login creates session + stores in Redis
- Logout destroys Redis session and clears cookie

- Rate limiting applied to authentication endpoints
- Input validation enforced using Zod
- Structured error and success responses

## 🔧 Logging

- Logging powered by Pino + Pino HTTP
- Request logging includes method, URL, query, and params.
- Error logs include minimal request context and stack traces
- Sensitive data (passwords, bodies) is never logged
- Logs are categorized by level:
  - INFO → all completed requests
  - ERROR → operational and unexpected errors

## 🧪 Testing

- Full integration testing using Jest + Supertest
- Tests simulate real HTTP flows using persistent agents (cookie-based sessions)
- Covers:
  - Authentication (register, signin, protected routes)
  - Task CRUD operations (create, update, delete, fetch)
  - List management
  - Input validation using Zod schemas
  - Authorization and error handling (401, 404, validation errors)

### Testing Environment

- Separate PostgreSQL test database
- Separate Redis instance
- Clean state between tests

### Setup

Create a `.env.test` file in the `/server` directory with the following variables:

  ```env
  DATABASE_URL=your_test_database_url 
  REDIS_URL=your_test_redis_url 
  ```

- Ensure that the test database is separate from your development database.

### Running Tests

```bash
npm test
```

- The test suite resets the database before each suite, and clears Redis before each test.
- Tests are designed to run against a real database and Redis instance.
- Using a dedicated test environment prevents conflicts with development data.

## ⚙️ CI/CD

GitHub Actions pipeline:

- Spins up a PostgreSQL 16
- Spins up a Redis 7
- Runs database schema and index initialization
- Executes the full Jest + Supertest integration test suite

## 📈 Future Improvements

- API documentation (Swagger/OpenAPI)
- Redis caching for frequently accessed data
- Background jobs (task reminders, cleanup)

---

## 🧑‍💻 Author

Chris
