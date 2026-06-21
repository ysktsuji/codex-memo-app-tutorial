import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import { TemporaryToast } from "@/app/components/temporary-toast";
import { getToastFromSearchParam } from "@/lib/toast";
import { SigninForm } from "./signin-form";

export const metadata: Metadata = {
  title: "Sign in | TagNote",
  description: "Sign in to TagNote with your email address.",
};

export default async function SigninPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const toast = getToastFromSearchParam((await searchParams)?.toast);

  return (
    <main className="flex flex-1 flex-col gap-8 py-8 sm:py-10">
      {toast ? <TemporaryToast {...toast} /> : null}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
        <div className="flex min-h-[500px] flex-col justify-between rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#007aff]/20 bg-[#007aff]/10 px-3 py-2 text-sm font-medium text-[#0057b8]">
              <LockKeyhole size={16} strokeWidth={1.8} aria-hidden="true" />
              Private session access
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-normal text-[#1d1d1f] sm:text-6xl">
                Sign in to TagNote
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#515154]">
                Use the email address from your existing account to open a local
                SQLite-backed session.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 bg-[#f5f5f7] p-4">
            <p className="text-xs font-medium uppercase text-[#86868b]">
              Authentication
            </p>
            <p className="mt-2 text-sm font-semibold text-[#1d1d1f]">
              Email-only session cookie
            </p>
          </div>
        </div>

        <aside
          className="grid content-start gap-6 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-6"
          aria-label="Signin form"
        >
          <div className="flex items-start gap-3 border-b border-black/10 pb-5">
            <span className="flex size-10 items-center justify-center rounded-md bg-[#f5f5f7] text-[#1d1d1f]">
              <Mail size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1d1d1f]">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-[#6e6e73]">
                No password is required in this first authentication flow.
              </p>
            </div>
          </div>

          <SigninForm />

          <p className="text-sm leading-6 text-[#6e6e73]">
            Need an account?{" "}
            <Link className="font-semibold text-[#1d1d1f]" href="/signup">
              Sign up
            </Link>
          </p>
        </aside>
      </section>
    </main>
  );
}
