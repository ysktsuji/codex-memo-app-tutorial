"use client";

import { LogIn, Mail } from "lucide-react";
import { useActionState } from "react";
import { TemporaryToast } from "@/app/components/temporary-toast";
import { signInWithEmail } from "./actions";
import type { SigninFormState } from "./types";

const initialState: SigninFormState = {
  email: "",
  message: "",
  status: "idle",
};

export function SigninForm() {
  const [state, formAction, pending] = useActionState(
    signInWithEmail,
    initialState,
  );

  return (
    <>
      {state.status === "error" ? (
        <TemporaryToast message={state.message} variant="error" />
      ) : null}
      <form action={formAction} className="grid gap-5" noValidate>
        <div className="grid gap-2">
          <label
            className="text-sm font-semibold text-[#1d1d1f]"
            htmlFor="signin-email"
          >
            Email address
          </label>
          <div className="flex min-h-12 items-center gap-3 rounded-lg border border-black/10 bg-white px-4 shadow-sm focus-within:border-[#007aff]/50 focus-within:ring-3 focus-within:ring-[#007aff]/15">
            <Mail
              className="shrink-0 text-[#86868b]"
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <input
              className="min-w-0 flex-1 bg-transparent text-base text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
              defaultValue={state.email}
              id="signin-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>
        </div>

        <button
          className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#1d1d1f] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#86868b]"
          disabled={pending}
          type="submit"
        >
          <LogIn size={17} strokeWidth={1.9} aria-hidden="true" />
          {pending ? "Signing in" : "Sign in"}
        </button>

        <p
          aria-live="polite"
          className="min-h-6 text-sm font-medium text-[#b35b00]"
        >
          {state.message}
        </p>
      </form>
    </>
  );
}
