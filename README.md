# Task Manager API

A full-stack task management application backend built with Node.js and Express, featuring authentication, list organization, and advanced task querying (filtering, sorting, and cursor-based pagination).

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Caching / Rate Limiting:** Redis (ioredis + rate-limiter-flexible)
- **Validation:** Zod
- **Authentication:** JWT (Bearer tokens)
- **Architecture:** Feature-based modular structure

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

---

## 📁 Project Structure

```text
root/
├── client/                # React frontend (in progress)
├── server/
│   ├── src/
│   │   ├── db/            # Database & Redis clients
│   │   ├── features/      # Feature-based modules
│   │   │   ├── auth/
│   │   │   ├── tasks/
│   │   │   └── lists/
│   │   ├── middleware/    # Express middleware (auth, rate limiting, etc.)
│   │   ├── utils/         # Shared utilities (responses, pagination, etc.)
│   │   ├── app.js         # Express app configuration
│   │   └── server.js      # Server startup (DB + Redis initialization)
└── README.md
```

---

## 🧠 Architecture Notes

- Uses a feature-based structure, where each feature (tasks, auth, lists) contains its own:
  - router
  - controller
  - model
  - service (in progress)
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

1. Set up environment variables
  Create a `.env` file in `/server`:

```env
PORT=8000
DATABASE_URL=your_postgres_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_jwt_secret
```

1. Run the server
  From the project root:

```bash
npm run dev
```

Server runs at:

```bash
http://localhost:8000
```

---

## 📌 API Overview

Base URL:

```text
/api
```

### Auth

- POST /auth/register
- POST /auth/login
- GET /auth/me

### Tasks

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id

### Lists

- CRUD endpoints for task lists

## 🔐 Security & Reliability

- JWT-based authentication
- Rate limiting on login endpoints (prevents brute-force attacks)
- Input validation using Zod
- Structured error and success responses

## 📈 Future Improvements

- Complete service layer refactor
- Add automated tests (Jest + Supertest)
- API documentation (Swagger/OpenAPI)
- Redis caching for frequently accessed data
- Background jobs (task reminders, cleanup)

---

## 🧑‍💻 Author

Chris
