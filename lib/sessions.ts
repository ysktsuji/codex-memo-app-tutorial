import { randomBytes } from "node:crypto";

import { getDatabase, type SqliteDatabase } from "@/lib/database";
import { findUserById, initializeUserSchema, type User } from "@/lib/users";

export type Session = {
  createdAt: string;
  token: string;
  user: User;
};

type SessionRow = {
  created_at: string;
  token: string;
  user_id: number;
};

export function initializeSessionSchema(db = getDatabase()): void {
  initializeUserSchema(db);

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

export function createSessionForUser(
  userId: number,
  db = getDatabase(),
): Session {
  initializeSessionSchema(db);

  const user = findUserById(userId, db);

  if (!user) {
    throw new Error("Cannot create a session for an unknown user.");
  }

  const token = randomBytes(32).toString("hex");

  db.prepare<[string, number]>(
    "INSERT INTO sessions (token, user_id) VALUES (?, ?)",
  ).run(token, userId);

  const session = findSessionByToken(token, db);

  if (!session) {
    throw new Error("Created session could not be loaded.");
  }

  return session;
}

export function findSessionByToken(
  token: string,
  db = getDatabase(),
): Session | undefined {
  initializeSessionSchema(db);

  const row = db
    .prepare<[string], SessionRow>(
      "SELECT token, user_id, created_at FROM sessions WHERE token = ?",
    )
    .get(token);

  if (!row) {
    return undefined;
  }

  const user = findUserById(row.user_id, db);

  if (!user) {
    return undefined;
  }

  return {
    createdAt: row.created_at,
    token: row.token,
    user,
  };
}

export function deleteSession(token: string, db: SqliteDatabase = getDatabase()): void {
  initializeSessionSchema(db);

  db.prepare<[string]>("DELETE FROM sessions WHERE token = ?").run(token);
}
