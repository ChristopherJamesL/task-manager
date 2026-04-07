-- USERS TABLE
-- Stores core account identity for authentication and ownership of data
CREATE TABLE users (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(20) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- AUTHENTICATION TABLE
-- Stores sensitive auth data separately from user profile (security isolation)
CREATE TABLE authentication (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INTEGER UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	CONSTRAINT fk_auth_user
		FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- LISTS TABLE
-- Represents task groupings owned by a user (e.g. Work, Personal)
CREATE TABLE lists (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INTEGER NOT NULL,
	name VARCHAR(50) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_lists_user
		FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
	CONSTRAINT unique_user_list_name UNIQUE (user_id, "name")
);

-- TASKS TABLE
-- Core unit of work inside a list
CREATE TABLE tasks (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INTEGER NOT NULL,
	list_id INTEGER,
	title VARCHAR(255) NOT NULL,
	description TEXT,
	is_completed BOOLEAN DEFAULT FALSE,
	priority VARCHAR(10) DEFAULT 'medium',
	due_date TIMESTAMPTZ,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_tasks_user
		FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
	CONSTRAINT fk_tasks_list_id
		FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE SET NULL,
	CONSTRAINT tasks_priority_check
		CHECK (priority IN ('low', 'medium', 'high'))
);