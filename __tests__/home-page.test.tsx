import { render, screen } from "@testing-library/react";

import { AppShell } from "@/app/components/app-shell";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the memo app shell with navigation and core planning areas", () => {
    render(
      <AppShell>
        <Home />
      </AppShell>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Memo Studio",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Memos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Categories" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tags" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New memo" })).toBeInTheDocument();

    expect(screen.getByText("Markdown-first writing")).toBeInTheDocument();
    expect(screen.getByText("Category planning")).toBeInTheDocument();
    expect(screen.getByText("Tag organisation")).toBeInTheDocument();
    expect(screen.getByText("Authentication-ready")).toBeInTheDocument();
    expect(screen.getByText("Markdown conversion")).toBeInTheDocument();
    expect(screen.getByText("Category filters")).toBeInTheDocument();
    expect(screen.getByText("User sessions")).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "Search" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Notifications" })).not.toBeInTheDocument();
    expect(screen.queryByText("Synced")).not.toBeInTheDocument();
    expect(screen.queryByText(/offline-first memo sync/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/suggestions/i)).not.toBeInTheDocument();
  });
});
