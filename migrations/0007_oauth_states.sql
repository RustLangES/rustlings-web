CREATE TABLE oauth_states (
  state TEXT PRIMARY KEY,
  lang TEXT NOT NULL DEFAULT 'es',
  created_at INTEGER NOT NULL
);
