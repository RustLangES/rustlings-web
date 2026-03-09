-- Refactor user_section_progress: one row per user per course
-- tracking only the furthest section reached (instead of one row per completed section)

CREATE TABLE user_section_progress_new (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  section_slug TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id, course_id)
);

-- Migrate existing data: keep the furthest-completed section per user per course
INSERT OR IGNORE INTO user_section_progress_new (id, user_id, course_id, section_slug, updated_at)
SELECT
  usp.id,
  usp.user_id,
  cs.course_id,
  cs.slug,
  usp.completed_at
FROM user_section_progress usp
JOIN course_sections cs ON cs.id = usp.section_id
WHERE cs.position = (
  SELECT MAX(cs2.position)
  FROM user_section_progress usp2
  JOIN course_sections cs2 ON cs2.id = usp2.section_id
  WHERE usp2.user_id = usp.user_id
    AND cs2.course_id = cs.course_id
);

DROP TABLE user_section_progress;
ALTER TABLE user_section_progress_new RENAME TO user_section_progress;
