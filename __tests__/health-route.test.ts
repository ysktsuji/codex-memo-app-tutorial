/**
 * @jest-environment node
 */

import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { closeDatabase } from "@/lib/database";
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  const root = join(tmpdir(), `codex-memo-health-${Date.now()}`);

  beforeEach(() => {
    closeDatabase();
    process.env.SQLITE_DATABASE_PATH = join(root, "health.db");
  });

  afterEach(() => {
    closeDatabase();
    delete process.env.SQLITE_DATABASE_PATH;
    rmSync(root, { force: true, recursive: true });
  });

  it("returns ok when the SQLite connection is available", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      database: {
        connected: true,
      },
      ok: true,
    });
  });
});
