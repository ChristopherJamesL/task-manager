-- =====================================================
-- INDEX SET (Tasks + Lists)
-- Purpose: Optimized for real query patterns:
--   1) All tasks view (user-scoped pagination)
--   2) List view (user + list scoped pagination)
--   3) Secure single-task lookup
-- =====================================================


-- =========================
-- LISTS
-- =========================

-- Fetch all lists for a user + ownership checks
CREATE INDEX idx_lists_user_id
ON lists (user_id, id);



-- =========================
-- TASKS (SINGLE TASK LOOKUP)
-- =========================

-- Securely fetch a task by id within a user scope
CREATE INDEX idx_tasks_user_id
ON tasks (user_id, id);



-- =========================
-- TASKS (ALL TASKS VIEW)
-- =========================

-- Cursor pagination for global task feed (created_at sorting)
CREATE INDEX idx_tasks_user_created_desc_id_desc
ON tasks (user_id, created_at DESC, id DESC);

-- Cursor pagination for global task feed (due_date sorting)
CREATE INDEX idx_tasks_user_due_desc_id_desc
ON tasks (user_id, due_date DESC, id DESC);



-- =========================
-- TASKS (LIST VIEW)
-- =========================

-- Cursor pagination within a specific list (created_at sorting)
CREATE INDEX idx_tasks_user_list_created_desc_id_desc
ON tasks (user_id, list_id, created_at DESC, id DESC);



-- =========================
-- TASKS (INCOMPLETE TASKS OPTIMIZATION)
-- =========================

-- Active tasks in global feed (is_completed = false)
-- Optimized for faster filtering + pagination
CREATE INDEX idx_tasks_user_created_incomplete
ON tasks (user_id, created_at DESC, id DESC)
WHERE is_completed = FALSE;

-- Active tasks within a list (is_completed = false)
CREATE INDEX idx_tasks_user_list_created_incomplete
ON tasks (user_id, list_id, created_at DESC, id DESC)
WHERE is_completed = FALSE;