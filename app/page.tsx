import { Check, FileText, LockKeyhole, Plus, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { TemporaryToast } from "@/app/components/temporary-toast";
import { getToastFromSearchParam } from "@/lib/toast";
import { planningItems } from "./components/app-shell";

const memoPreview = `# Product ideas

- Draft the memo creation flow
- Review Markdown renderer rules
- Link auth sessions to local SQLite`;

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const toast = getToastFromSearchParam((await searchParams)?.toast);

  return (
    <main className="flex flex-1 flex-col gap-8 py-8 sm:py-10">
      {toast ? <TemporaryToast {...toast} /> : null}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
        <div className="flex min-h-[520px] flex-col justify-between rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#007aff]/20 bg-[#007aff]/10 px-3 py-2 text-sm font-medium text-[#0057b8]">
              <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
              SQLite-backed private memo workspace
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-normal text-[#1d1d1f] sm:text-6xl">
                TagNote
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#515154]">
                A private Markdown memo workspace for creating, reading, and
                searching notes with categories and tags after you sign in.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                className="flex min-h-11 items-center gap-2 rounded-md bg-[#1d1d1f] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black"
                href="/signin"
              >
                <LockKeyhole size={16} strokeWidth={1.8} aria-hidden="true" />
                Sign in to unlock memos
              </Link>
              <Link
                className="flex min-h-11 items-center gap-2 rounded-md border border-black/10 bg-white/75 px-4 text-sm font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-white"
                href="/signup"
              >
                Create an account
              </Link>
            </div>
          </div>

          <div className="grid gap-3 pt-10 sm:grid-cols-3">
            {[
              ["Local first", "SQLite storage"],
              ["Structured", "Categories and tags"],
              ["Secure path", "Authentication planned"],
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
          className="grid gap-4 rounded-lg border border-black/10 bg-[#1d1d1f] p-4 text-white shadow-sm sm:p-5"
          aria-label="Memo preview"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-white/10">
                <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold">Today&apos;s draft</h2>
                <p className="text-xs text-white/55">Markdown editor preview</p>
              </div>
            </div>
            <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/65">
              Draft
            </span>
          </div>

          <pre className="min-h-72 whitespace-pre-wrap rounded-lg bg-black/25 p-4 font-mono text-sm leading-7 text-white/82">
            {memoPreview}
          </pre>

          <div className="grid gap-3 sm:grid-cols-2">
            {["Personal", "Product", "markdown", "sqlite"].map((item) => (
              <span
                className="rounded-md border border-white/10 bg-white/[.06] px-3 py-2 text-sm text-white/78"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" id="memos">
        {planningItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"
              id={item.id}
              key={item.title}
            >
              <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-[#f5f5f7] text-[#1d1d1f]">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h2 className="text-base font-semibold text-[#1d1d1f]">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#6e6e73]">
                {item.description}
              </p>
            </article>
          );
        })}
      </section>

      <section
        className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm lg:grid-cols-[1fr_1.2fr]"
        id="auth"
      >
        <div className="space-y-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-[#ff9f0a]/15 text-[#b35b00]">
            <LockKeyhole size={19} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-[#1d1d1f]">
            Memo features are available after sign-in
          </h2>
          <p className="max-w-xl text-sm leading-6 text-[#6e6e73]">
            Create, view, and search memos are kept behind the local session.
            Visitors can preview the product direction here, then sign in or
            create an account when they are ready to use the workspace.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              className="flex min-h-10 items-center gap-2 rounded-md bg-[#1d1d1f] px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black"
              href="/signin"
            >
              <LockKeyhole size={16} strokeWidth={1.8} aria-hidden="true" />
              Sign in to memo workspace
            </Link>
            <Link
              className="flex min-h-10 items-center rounded-md border border-black/10 bg-white/75 px-3 text-sm font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-white"
              href="/signup"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Check, label: "Markdown conversion" },
            { icon: Plus, label: "Category filters" },
            { icon: Search, label: "User sessions" },
          ].map(({ icon: Icon, label }) => (
              <div
                className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f7] p-4 text-sm font-medium text-[#1d1d1f]"
                key={label}
              >
                <Icon
                  className="shrink-0 text-[#34c759]"
                  size={17}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {label}
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
