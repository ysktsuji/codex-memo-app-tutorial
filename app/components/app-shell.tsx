import {
  CircleUserRound,
  Command,
  FileText,
  Folder,
  LogIn,
  LogOut,
  LockKeyhole,
  Plus,
  Tags,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "@/app/signin/actions";
import type { User } from "@/lib/users";

const navigationItems = [
  { href: "/#memos", label: "Memos" },
  { href: "/#categories", label: "Categories" },
  { href: "/#tags", label: "Tags" },
];

type HeaderSession = {
  user: User;
};

export function AppShell({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session?: HeaderSession }>) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <AppHeader session={session} />
        {children}
      </div>
    </div>
  );
}

export function AppHeader({ session }: Readonly<{ session?: HeaderSession }>) {
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-[#f5f5f7]/90 backdrop-blur-xl">
      <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <Link className="flex items-center gap-3" href="/" aria-label="TagNote">
          <span className="flex size-9 items-center justify-center rounded-md bg-[#1d1d1f] text-white shadow-sm">
            <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-normal">TagNote</span>
            <span className="text-xs font-medium text-[#6e6e73]">
              Private markdown workspace
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="order-3 flex w-full items-center gap-1 rounded-md border border-black/10 bg-white/70 p-1 shadow-sm sm:order-none sm:w-auto"
        >
          {navigationItems.map((item) => (
            <Link
              className="flex min-h-9 items-center rounded-md px-3 text-sm font-medium text-[#3a3a3c] transition-colors hover:bg-black/[.06] hover:text-[#1d1d1f]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link
                className="flex min-h-9 items-center gap-2 rounded-md border border-black/10 bg-white/75 px-3 text-sm font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-white"
                href="/account"
              >
                <CircleUserRound size={16} strokeWidth={1.8} aria-hidden="true" />
                Account
              </Link>
              <form action={signOut}>
                <button
                  className="flex min-h-9 items-center gap-2 rounded-md border border-black/10 bg-white/75 px-3 text-sm font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-white"
                  type="submit"
                >
                  <LogOut size={16} strokeWidth={1.8} aria-hidden="true" />
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                className="flex min-h-9 items-center gap-2 rounded-md border border-black/10 bg-white/75 px-3 text-sm font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-white"
                href="/signin"
              >
                <LogIn size={16} strokeWidth={1.8} aria-hidden="true" />
                Sign in
              </Link>
              <Link
                className="flex min-h-9 items-center gap-2 rounded-md border border-black/10 bg-white/75 px-3 text-sm font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-white"
                href="/signup"
              >
                <UserPlus size={16} strokeWidth={1.8} aria-hidden="true" />
                Sign up
              </Link>
              <Link
                className="flex min-h-9 items-center gap-2 rounded-md bg-[#1d1d1f] px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black"
                href="/signin"
              >
                <Plus size={16} strokeWidth={1.9} aria-hidden="true" />
                Sign in to create
              </Link>
            </>
          )}
          {session ? (
            <button
              className="flex min-h-9 items-center gap-2 rounded-md bg-[#1d1d1f] px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black"
              type="button"
            >
              <Plus size={16} strokeWidth={1.9} aria-hidden="true" />
              New memo
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export const planningItems = [
  {
    description: "Draft notes in Markdown with a calm preview area ready for rendering.",
    icon: Command,
    id: "markdown",
    title: "Markdown-first writing",
  },
  {
    description: "Shape notebooks, projects, and long-lived themes before data modelling.",
    icon: Folder,
    id: "categories",
    title: "Category planning",
  },
  {
    description: "Prepare flexible tags for retrieval and filtering across saved memos.",
    icon: Tags,
    id: "tags",
    title: "Tag organisation",
  },
  {
    description: "Keep memo creation, reading, and search behind a signed-in session.",
    icon: LockKeyhole,
    id: "auth-planning",
    title: "Private after sign-in",
  },
];
