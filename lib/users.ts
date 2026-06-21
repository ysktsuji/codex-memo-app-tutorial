import { getDatabase } from "@/lib/database";

export type User = {
  createdAt: string;
  email: string;
  id: number;
};

type UserRow = {
  created_at: string;
  email: string;
  id: number;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserEmailError";
  }
}

export function initializeUserSchema(db = getDatabase()): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);
}

export function createUserWithEmail(email: string, db = getDatabase()): User {
  initializeUserSchema(db);

  const normalisedEmail = normaliseEmail(email);

  if (findUserByEmail(normalisedEmail, db)) {
    throw new UserEmailError("An account already exists for this email address.");
  }

  const result = db
    .prepare<[string]>("INSERT INTO users (email) VALUES (?)")
    .run(normalisedEmail);
  const userId = Number(result.lastInsertRowid);
  const user = findUserById(userId, db);

  if (!user) {
    throw new Error("Created user could not be loaded.");
  }

  return user;
}

export function findUserByEmail(
  email: string,
  db = getDatabase(),
): User | undefined {
  initializeUserSchema(db);

  const normalisedEmail = normaliseEmail(email);
  const row = db
    .prepare<[string], UserRow>(
      "SELECT id, email, created_at FROM users WHERE email = ?",
    )
    .get(normalisedEmail);

  return row ? mapUserRow(row) : undefined;
}

export function findUserById(id: number, db = getDatabase()): User | undefined {
  initializeUserSchema(db);

  const row = db
    .prepare<[number], UserRow>(
      "SELECT id, email, created_at FROM users WHERE id = ?",
    )
    .get(id);

  return row ? mapUserRow(row) : undefined;
}

function normaliseEmail(email: string): string {
  const normalisedEmail = email.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(normalisedEmail)) {
    throw new UserEmailError("Enter a valid email address.");
  }

  return normalisedEmail;
}

function mapUserRow(row: UserRow): User {
  return {
    createdAt: row.created_at,
    email: row.email,
    id: row.id,
  };
}
