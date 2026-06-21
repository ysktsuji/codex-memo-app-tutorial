"use server";

import { SESSION_COOKIE_NAME } from "@/lib/auth";
import { createSessionForUser, deleteSession } from "@/lib/sessions";
import { findUserByEmail, UserEmailError } from "@/lib/users";
import type { SigninFormState } from "./types";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function signInWithEmail(
  _previousState: SigninFormState,
  formData: FormData,
): Promise<SigninFormState> {
  const email = formData.get("email");

  if (typeof email !== "string") {
    return invalidSigninState("");
  }

  try {
    const user = findUserByEmail(email);

    if (!user) {
      return invalidSigninState(email);
    }

    const session = createSessionForUser(user.id);
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    cookieStore.set({
      httpOnly: true,
      maxAge: SESSION_MAX_AGE_SECONDS,
      name: SESSION_COOKIE_NAME,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      value: session.token,
    });
  } catch (error) {
    if (error instanceof UserEmailError) {
      return invalidSigninState(email);
    }

    throw error;
  }

  const { revalidatePath } = await import("next/cache");
  const { redirect } = await import("next/navigation");

  revalidatePath("/", "layout");
  return redirect("/?toast=signin-success");
}

export async function signOut(): Promise<void> {
  const { revalidatePath } = await import("next/cache");
  const { cookies } = await import("next/headers");
  const { redirect } = await import("next/navigation");
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    deleteSession(token);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  revalidatePath("/", "layout");
  return redirect("/signin?toast=signout-success");
}

function invalidSigninState(email: string): SigninFormState {
  return {
    email,
    message: "Enter the email address for an existing account.",
    status: "error",
  };
}
