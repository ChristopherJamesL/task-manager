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
-- Primary query pattern:
--   - Fetch tasks for a user filtered by list
--   - Supports pagination with ORDER BY created_at
CREATE INDEX idx_tasks_user_id_list_id
ON tasks (user_id, list_id);


-- TASKS (lookup by ID within user scope)
-- Supports:
--   - Fetch single task securely
--   - Ensures user can only access their own task
CREATE INDEX idx_tasks_user_id_id
ON tasks (user_id, id);