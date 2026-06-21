/**
 * @jest-environment node
 */

import { openSqliteDatabase } from "@/lib/database";
import {
  createSessionForUser,
  deleteSession,
  findSessionByToken,
} from "@/lib/sessions";
import { createUserWithEmail } from "@/lib/users";

describe("SQLite sessions", () => {
  it("creates and loads a session for an existing user", () => {
    const db = openSqliteDatabase(":memory:");

    try {
      const user = createUserWithEmail("person@example.com", db);
      const session = createSessionForUser(user.id, db);

      expect(session).toEqual({
        createdAt: expect.any(String),
        token: expect.any(String),
        user,
      });
      expect(session.token).toHaveLength(64);
      expect(findSessionByToken(session.token, db)).toEqual(session);
    } finally {
      db.close();
    }
  });

  it("deletes a session by token", () => {
    const db = openSqliteDatabase(":memory:");

    try {
      const user = createUserWithEmail("person@example.com", db);
      const session = createSessionForUser(user.id, db);

      deleteSession(session.token, db);

      expect(findSessionByToken(session.token, db)).toBeUndefined();
    } finally {
      db.close();
    }
  });
});
