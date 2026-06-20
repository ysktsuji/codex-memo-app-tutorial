/**
 * @jest-environment node
 */

import { mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { getDatabasePath, openSqliteDatabase } from "@/lib/database";

describe("SQLite database connection", () => {
  it("opens an in-memory SQLite database and enables foreign keys", () => {
    const db = openSqliteDatabase(":memory:");

    try {
      const result = db.prepare("SELECT 1 AS value").get();
      expect(result).toEqual({ value: 1 });
      expect(db.pragma("foreign_keys", { simple: true })).toBe(1);
    } finally {
      db.close();
    }
  });

  it("creates the parent directory for file-backed databases", () => {
    const root = join(tmpdir(), `codex-memo-app-${Date.now()}`);
    const databasePath = join(root, "nested", "app.db");

    const db = openSqliteDatabase(databasePath);

    try {
      const result = db.prepare("SELECT 1 AS value").get();
      expect(result).toEqual({ value: 1 });
    } finally {
      db.close();
      rmSync(root, { force: true, recursive: true });
    }
  });

  it("uses SQLITE_DATABASE_PATH when resolving the configured database path", () => {
    const root = join(tmpdir(), `codex-memo-app-${Date.now()}`);
    const databasePath = join(root, "custom.db");

    process.env.SQLITE_DATABASE_PATH = databasePath;

    try {
      mkdirSync(root, { recursive: true });

      expect(getDatabasePath()).toBe(databasePath);
    } finally {
      delete process.env.SQLITE_DATABASE_PATH;
      rmSync(root, { force: true, recursive: true });
    }
  });
});
