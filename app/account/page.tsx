import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Mail, UserRound } from "lucide-react";

import { getCurrentSession } from "@/lib/auth";
import { signOut } from "@/app/signin/actions";

export const metadata: Metadata = {
  title: "Account | TagNote",
  description: "View the signed-in TagNote account.",
};

export default async function AccountPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-1 flex-col gap-8 py-8 sm:py-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex size-11 items-center justify-center rounded-md bg-[#f5f5f7] text-[#1d1d1f]">
            <UserRound size={20} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-normal text-[#1d1d1f] sm:text-6xl">
            Account
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#515154]">
            This header route reflects the current local session state.
          </p>
        </div>

        <aside className="grid content-start gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f7] p-4">
            <Mail
              className="shrink-0 text-[#007aff]"
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-[#1d1d1f]">
              {session.user.email}
            </span>
          </div>

          <form action={signOut}>
            <button
              className="flex min-h-11 w-full items-center justify-center rounded-md bg-[#1d1d1f] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}
