# Task Manager

A full-stack task/project management app (frontend: React, backend: Node/Express, database: PostgreSQL).

## Structure

```text
Root Folder/
├── client/ # React frontend
├── server/ # Express backend
└── README.md # Project overview
```

## How to Run

From the root folder:

```bash
npm run dev
```

## API Rules

### Register

- username: min 3 characters
- email: valid email
- password: min 3 characters

## SIGN IN

- identifier: min 3 characters
- password: min 3 characters

### Auth

- JWT used for authentication
- Token sent via Authorization header: Bearer token
