import { render, screen } from "@testing-library/react";

import { AppShell } from "@/app/components/app-shell";
import SigninPage from "@/app/signin/page";

describe("Signin page", () => {
  it("renders an email-only signin form", async () => {
    render(
      <AppShell>
        {await SigninPage({})}
      </AppShell>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Sign in to TagNote" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "type",
      "email",
    );
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
  });

  it("renders a signout success toast from search params", async () => {
    render(
      await SigninPage({
        searchParams: Promise.resolve({ toast: "signout-success" }),
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Signed out successfully.",
    );
  });
});
