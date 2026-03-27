-- =====================================================
-- INDEXES (Tasks + Lists)
-- Purpose: Optimize frequent user-scoped queries
-- =====================================================

-- LISTS
-- Supports:
--   - Fetch all lists for a user
--   - Validate list ownership via (user_id, id)
CREATE INDEX idx_lists_user_id_id
ON lists (user_id, id);

-- TASKS
-- Primary query pattern with list:
--   - Fetch tasks for a user filtered by list
--   - Supports pagination with ORDER BY created_at or due_date
CREATE INDEX idx_tasks_user_list_created_id
ON tasks (user_id, list_id, created_at DESC, id DESC);

CREATE INDEX idx_tasks_user_list_due_id
ON tasks (user_id, list_id, due_date DESC, id DESC);

-- Primary query pattern without list:
--   - Fetch tasks for a user without filtering by list
--   - Supports pagination with ORDER BY created_at or due_date

CREATE INDEX idx_tasks_user_created_id
ON tasks (user_id, created_at DESC, id DESC);

CREATE INDEX idx_tasks_user_due_id
ON tasks (user_id, due_date DESC, id DESC);

-- TASKS (lookup by ID within user scope)
-- Supports:
--   - Fetch single task securely
--   - Ensures user can only access their own task
CREATE INDEX idx_tasks_user_id_id
ON tasks (user_id, id);
