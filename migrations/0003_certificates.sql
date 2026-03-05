-- ==============================
-- USER CERTIFICATES
-- ==============================
CREATE TABLE IF NOT EXISTS user_certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  name_used TEXT NOT NULL,
  issued_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_user_certificates_user_id ON user_certificates(user_id);
