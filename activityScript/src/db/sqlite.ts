import Database, { type Database as DatabaseType } from "better-sqlite3";

export const db: DatabaseType = new Database("tracker.db");

const query = (`
  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app TEXT NOT NULL,
    title TEXT NOT NULL,
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    ended_at TEXT,
    duration_mins INTEGER NOT NULL DEFAULT 0,
    is_productive TEXT NOT NULL DEFAULT 'unknown' CHECK(is_productive IN ('productive', 'unproductive', 'unknown')),
    user_key TEXT
  );
`);

export const createTable = () => {
  db.exec(query)
}
