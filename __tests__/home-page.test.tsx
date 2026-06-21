import { render, screen } from "@testing-library/react";

import { AppShell } from "@/app/components/app-shell";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the memo app shell with navigation and core planning areas", async () => {
    render(
      <AppShell>
        {await Home({})}
      </AppShell>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "TagNote",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Memos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Categories" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tags" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
      "href",
      "/signup",
    );
    expect(screen.getByRole("link", { name: "Sign in to create" })).toHaveAttribute(
      "href",
      "/signin",
    );

    expect(screen.getByText("Markdown-first writing")).toBeInTheDocument();
    expect(screen.getByText("Category planning")).toBeInTheDocument();
    expect(screen.getByText("Tag organisation")).toBeInTheDocument();
    expect(screen.getByText("Private after sign-in")).toBeInTheDocument();
    expect(screen.getByText("Markdown conversion")).toBeInTheDocument();
    expect(screen.getByText("Category filters")).toBeInTheDocument();
    expect(screen.getByText("User sessions")).toBeInTheDocument();
    expect(screen.getByText("Memo features are available after sign-in")).toBeInTheDocument();
    expect(screen.getByText(/Create, view, and search memos/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sign in to unlock memos" }),
    ).toHaveAttribute("href", "/signin");
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute(
      "href",
      "/signup",
    );

    expect(screen.queryByRole("button", { name: "Search" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Notifications" })).not.toBeInTheDocument();
    expect(screen.queryByText("Synced")).not.toBeInTheDocument();
    expect(screen.queryByText(/offline-first memo sync/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/suggestions/i)).not.toBeInTheDocument();
  });

  it("renders a signin success toast from search params", async () => {
    render(await Home({ searchParams: Promise.resolve({ toast: "signin-success" }) }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Signed in successfully.",
    );
  });
});
