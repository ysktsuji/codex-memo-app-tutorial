import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

export type SqliteDatabase = ReturnType<typeof Database>;

const DEFAULT_DATABASE_PATH = join(process.cwd(), "data", "app.db");
const IN_MEMORY_DATABASE_PATH = ":memory:";

let database: SqliteDatabase | undefined;

export function getDatabasePath(): string {
  return process.env.SQLITE_DATABASE_PATH ?? DEFAULT_DATABASE_PATH;
}

export function openSqliteDatabase(databasePath = getDatabasePath()): SqliteDatabase {
  if (databasePath !== IN_MEMORY_DATABASE_PATH) {
    mkdirSync(dirname(databasePath), { recursive: true });
  }

  const db = new Database(databasePath);

  db.pragma("foreign_keys = ON");

  if (databasePath !== IN_MEMORY_DATABASE_PATH) {
    db.pragma("journal_mode = WAL");
  }

  return db;
}

export function getDatabase(): SqliteDatabase {
  database ??= openSqliteDatabase();

  return database;
}

export function closeDatabase(): void {
  database?.close();
  database = undefined;
}
