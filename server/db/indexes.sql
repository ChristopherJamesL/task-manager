-- INDEX: lists(user_id, id)
-- Optimizes queries that fetch a specific list belonging to a user
-- Used in:
--   WHERE user_id = ? AND id = ?
--   WHERE user_id = ?
CREATE INDEX idx_lists_user_id_id
ON lists (user_id, id);