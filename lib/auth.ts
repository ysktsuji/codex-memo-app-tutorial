import { cookies } from "next/headers";

import { findSessionByToken, type Session } from "@/lib/sessions";

export const SESSION_COOKIE_NAME = "memo_session";

export async function getCurrentSession(): Promise<Session | undefined> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return undefined;
  }

  return findSessionByToken(token);
}
