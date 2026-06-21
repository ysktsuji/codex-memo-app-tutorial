import type { Metadata } from "next";
import { Database, LockKeyhole, Mail } from "lucide-react";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign up | TagNote",
  description: "Create an email-only TagNote account backed by SQLite.",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 flex-col gap-8 py-8 sm:py-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
        <div className="flex min-h-[500px] flex-col justify-between rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#ff9f0a]/25 bg-[#ff9f0a]/15 px-3 py-2 text-sm font-medium text-[#b35b00]">
              <LockKeyhole size={16} strokeWidth={1.8} aria-hidden="true" />
              Email-only authentication
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-normal text-[#1d1d1f] sm:text-6xl">
                Create your account
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#515154]">
                Start with a private TagNote account identified by a single
                email address. No password fields are needed for this first
                authentication step.
              </p>
            </div>
          </div>

          <div className="grid gap-3 pt-10 sm:grid-cols-2">
            {[
              ["Storage", "SQLite users table"],
              ["Credential", "Email address only"],
            ].map(([label, value]) => (
              <div
                className="rounded-lg border border-black/10 bg-[#f5f5f7] p-4"
                key={label}
              >
                <p className="text-xs font-medium uppercase text-[#86868b]">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#1d1d1f]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside
          className="grid content-start gap-6 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-6"
          aria-label="Signup form"
        >
          <div className="flex items-start gap-3 border-b border-black/10 pb-5">
            <span className="flex size-10 items-center justify-center rounded-md bg-[#f5f5f7] text-[#1d1d1f]">
              <Mail size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1d1d1f]">
                Sign up
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6e6e73]">
                The account record is created locally in SQLite after server
                validation.
              </p>
            </div>
          </div>

          <SignupForm />

          <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f7] p-4 text-sm text-[#515154]">
            <Database
              className="shrink-0 text-[#007aff]"
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>Duplicate email addresses are blocked at signup.</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
