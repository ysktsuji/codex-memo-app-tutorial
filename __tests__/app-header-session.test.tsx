import { render, screen } from "@testing-library/react";

import { AppShell } from "@/app/components/app-shell";

describe("AppHeader session state", () => {
  it("shows signin and signup links when signed out", () => {
    render(
      <AppShell>
        <div />
      </AppShell>,
    );

    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/signin",
    );
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
      "href",
      "/signup",
    );
    expect(screen.getByRole("link", { name: "Sign in to create" })).toHaveAttribute(
      "href",
      "/signin",
    );
    expect(screen.queryByRole("link", { name: "Account" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sign out" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "New memo" }),
    ).not.toBeInTheDocument();
  });

  it("shows the account route and signout action when signed in", () => {
    render(
      <AppShell
        session={{
          user: {
            createdAt: "2026-06-21T00:00:00.000Z",
            email: "person@example.com",
            id: 1,
          },
        }}
      >
        <div />
      </AppShell>,
    );

    expect(screen.getByRole("link", { name: "Account" })).toHaveAttribute(
      "href",
      "/account",
    );
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New memo" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Sign in" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Sign up" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Sign in to create" }),
    ).not.toBeInTheDocument();
  });
});
