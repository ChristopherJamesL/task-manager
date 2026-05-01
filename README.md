# Task Manager (Full Stack Application)

A full-stack task management application built with Node.js, Express, PostgreSQL, and React.

---

## 🚀 Tech Stack

### Frontend

- React
- TypeScript
- React Query (TanStack Query) *(planned / in progress)*
- TailwindCSS

### Backend

- Node.js
- Express
- Zod (validation)
- JWT authentication

### Database / Infrastructure

- PostgreSQL
- Redis (rate limiting + caching)
- Docker (development environment)

---

## ✨ Features

- User authentication (register, login, logout)
- Protected routes with JWT
- Fetch current user profile (`/api/auth/me`)
- Task management (create, update, delete)
- List-based organization for tasks
- Advanced task querying:
  - Filtering (priority, completion, date range)
  - Sorting (created date, due date)
  - Cursor-based pagination (efficient + scalable)
- Rate limiting for login attempts (Redis-backed)
- Automated integration tests for core CRUD flows (Jest + Supertest)

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

- Sign in / register flows
- Authentication flows using TanStack Query (React Query)
- Protected dashboard layout
- Navbar with logout functionality

## Architecture Notes

- Feature-based frontend architecture (auth module isolated under `/features`)
- Server state managed with TanStack Query (React Query)
- Authentication handled via query/mutation hooks (useMeQuery, useSignInMutation, etc.)
- JWT stored in localStorage and attached via Axios interceptor
- API layer split into feature-based modules (`features/auth/api`)
- UI separated into:
  - `features/*` (domain-specific logic + pages)
  - `components/*` (reusable UI primitives)
  - `components/layout/*` (layout components like Navbar)

## Frontend State Architecture

- Server state (auth, user data) managed by TanStack Query
- Query-driven authentication using `/auth/me`
- Local UI state handled with React hooks

## Architecture Principles

- Feature-based modular design
- Separation of UI, state, and API layers
- Server state decoupled from UI state (TanStack Query)
- Hybrid authentication flow:
  - Declarative route protection using query state (`/auth/me`)
  - Imperative navigation on auth mutations (login/logout)

---

## 💻 Backend (Node)

## Current Features

- JWT authentication system
- Rate limiting with Redis
- Task & list APIs
- Input validation with Zod
- Integration tests (Jest + Supertest)

## 🧠 Architecture Notes

- Feature-based backend architecture (auth, tasks, lists separated by modules):
  - router
  - controller
  - model
  - service
- Clear separation of concerns:
  - Controllers → handle HTTP layer
  - Services → business logic (being introduced)
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
JWT_SECRET=your_jwt_secret
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

## 🔐 Security & Reliability

- JWT-based authentication
- Rate limiting on login endpoints (prevents brute-force attacks)
- Input validation using Zod
- Structured error and success responses

## 🔧 Logging

- Structured logging is implemented using Pino and Pino HTTP.
- Request logging includes method, URL, query parameters, and route params.
- Error logging captures minimal request info (method, url) and the error object with stack trace.
- Sensitive data (passwords, tokens, headers, request body) is never logged.
- Logs are categorized by level:
  - INFO → all completed requests
  - ERROR → operational and unexpected errors

## 🧪 Testing

This project uses automated integration tests with Jest and Supertest.

The test suite covers full API flows including:

- Authentication (register, signin, protected routes)
- Task CRUD operations (create, update, delete, fetch)
- List management
- Input validation using Zod schemas
- Authorization and error handling (401, 404, validation errors)

### Setup

Create a `.env.test` file in the `/server` directory with the following variables:

  ```env
  DATABASE_URL=your_test_database_url 
  REDIS_URL=your_test_redis_url 
  JWT_SECRET=your_test_secret
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

This project uses GitHub Actions for continuous integration.

On every push and pull request, the CI pipeline:

- Spins up a PostgreSQL 16 container
- Spins up a Redis 7 container
- Runs database schema and index initialization
- Executes the full Jest + Supertest integration test suite

This ensures all API features are tested against a real database environment in isolation.

## 📈 Future Improvements

- API documentation (Swagger/OpenAPI)
- Redis caching for frequently accessed data
- Background jobs (task reminders, cleanup)

---

## 🧑‍💻 Author

Chris
