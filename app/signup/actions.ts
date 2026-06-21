"use server";

import { createUserWithEmail, UserEmailError } from "@/lib/users";
import type { SignupFormState } from "./types";

export async function signUpWithEmail(
  _previousState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const email = formData.get("email");

  if (typeof email !== "string") {
    return {
      email: "",
      message: "Enter a valid email address.",
      status: "error",
    };
  }

  try {
    const user = createUserWithEmail(email);

    return {
      email: user.email,
      message: "Account created. You can use this email for future sign-in.",
      status: "success",
    };
  } catch (error) {
    if (error instanceof UserEmailError) {
      return {
        email,
        message: error.message,
        status: "error",
      };
    }

    throw error;
  }
}
