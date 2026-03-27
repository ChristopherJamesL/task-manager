# Task Manager

A full-stack task management application with authentication, list organization, and advanced task querying (filtering, sorting, and cursor-based pagination).

## Tech Stack

- Frontend: React (in progress)
- Backend: Node.js, Express
- Database: PostgreSQL
- Validation: Zod
- Authentication: JWT (Bearer tokens)

## Features

- User authentication (register/login/logout)
- Fetch current user profile (`/me`)
- Create, update, and delete tasks
- Organize tasks into lists
- Filter tasks by completion status, priority, or due date range
- Sort tasks by creation or due date
- Cursor-based pagination for tasks

## Project Structure

```text
Root Folder/
├── client/   # React frontend
├── server/   # Express backend
│   ├── src/
│   │   ├── routes/      # Route definitions (tasks, lists, auth)
│   │   ├── models/      # Database queries
│   │   ├── controllers/ # Request handlers
│   │   ├── validators/  # Request validation schemas
│   │   └── utils/       # Helpers (pagination, responses, validation)
└── README.md
```

## Getting Started

### 1. Install dependencies

From the `/server` directory:

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file inside the `/server` directory:

```env
PORT=8000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the development servers

From the project root directory:

```bash
npm run dev
```

The backend will run on `http://localhost:8000`.

---

## Notes

- Uses cursor-based pagination for consistent and performant data fetching
- Backend follows a modular structure (routes, controllers, models, validation)
