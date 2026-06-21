/**
 * @jest-environment node
 */

import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { signUpWithEmail } from "@/app/signup/actions";
import { closeDatabase } from "@/lib/database";

describe("signUpWithEmail", () => {
  const root = join(tmpdir(), `codex-memo-signup-${Date.now()}`);

  beforeEach(() => {
    closeDatabase();
    process.env.SQLITE_DATABASE_PATH = join(root, "signup.db");
  });

  afterEach(() => {
    closeDatabase();
    delete process.env.SQLITE_DATABASE_PATH;
    rmSync(root, { force: true, recursive: true });
  });

  it("creates an email-only user account", async () => {
    const formData = new FormData();
    formData.set("email", "  Person@Example.COM ");

    await expect(signUpWithEmail(initialState(), formData)).resolves.toEqual({
      email: "person@example.com",
      message: "Account created. You can use this email for future sign-in.",
      status: "success",
    });
  });

  it("returns duplicate email errors without throwing to the form", async () => {
    const formData = new FormData();
    formData.set("email", "person@example.com");

    await signUpWithEmail(initialState(), formData);

    await expect(signUpWithEmail(initialState(), formData)).resolves.toEqual({
      email: "person@example.com",
      message: "An account already exists for this email address.",
      status: "error",
    });
  });
});

function initialState() {
  return {
    email: "",
    message: "",
    status: "idle" as const,
  };
}
