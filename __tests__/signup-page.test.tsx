import { render, screen } from "@testing-library/react";

import { AppShell } from "@/app/components/app-shell";
import SignupPage from "@/app/signup/page";

describe("Signup page", () => {
  it("renders an email-only signup form", () => {
    render(
      <AppShell>
        <SignupPage />
      </AppShell>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Create your account" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "type",
      "email",
    );
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
  });

  it("links to the signup page from the header", () => {
    render(
      <AppShell>
        <div />
      </AppShell>,
    );

    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
      "href",
      "/signup",
    );
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/signin",
    );
  });
});
