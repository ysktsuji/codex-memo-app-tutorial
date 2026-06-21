/**
 * @jest-environment node
 */

import { openSqliteDatabase } from "@/lib/database";
import {
  createUserWithEmail,
  findUserByEmail,
  initializeUserSchema,
} from "@/lib/users";

describe("SQLite users", () => {
  it("creates the users table with a normalised unique email address", () => {
    const db = openSqliteDatabase(":memory:");

    try {
      initializeUserSchema(db);

      const user = createUserWithEmail("  Person@Example.COM  ", db);

      expect(user).toEqual({
        createdAt: expect.any(String),
        email: "person@example.com",
        id: expect.any(Number),
      });
      expect(findUserByEmail("PERSON@example.com", db)).toEqual(user);
    } finally {
      db.close();
    }
  });

  it("rejects invalid email addresses before writing to SQLite", () => {
    const db = openSqliteDatabase(":memory:");

    try {
      initializeUserSchema(db);

      expect(() => createUserWithEmail("not-an-email", db)).toThrow(
        "Enter a valid email address.",
      );

      const result = db.prepare("SELECT COUNT(*) AS count FROM users").get();
      expect(result).toEqual({ count: 0 });
    } finally {
      db.close();
    }
  });

  it("does not create duplicate users for the same email address", () => {
    const db = openSqliteDatabase(":memory:");

    try {
      initializeUserSchema(db);
      createUserWithEmail("person@example.com", db);

      expect(() => createUserWithEmail("PERSON@example.com", db)).toThrow(
        "An account already exists for this email address.",
      );
    } finally {
      db.close();
    }
  });
});
