import { act, render, screen } from "@testing-library/react";

import { TemporaryToast } from "@/app/components/temporary-toast";
import { getToastFromSearchParam } from "@/lib/toast";

describe("TemporaryToast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("temporarily renders a success notification", () => {
    render(<TemporaryToast message="Signed in." variant="success" />);

    expect(screen.getByRole("status")).toHaveTextContent("Signed in.");

    act(() => {
      jest.advanceTimersByTime(3600);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders errors as alerts", () => {
    render(<TemporaryToast message="Sign in failed." variant="error" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Sign in failed.");
  });
});

describe("getToastFromSearchParam", () => {
  it("maps supported toast query values to notifications", () => {
    expect(getToastFromSearchParam("signin-success")).toEqual({
      message: "Signed in successfully.",
      variant: "success",
    });
    expect(getToastFromSearchParam("signout-success")).toEqual({
      message: "Signed out successfully.",
      variant: "success",
    });
  });

  it("ignores unsupported values", () => {
    expect(getToastFromSearchParam("unknown")).toBeUndefined();
    expect(getToastFromSearchParam(["signin-success"])).toBeUndefined();
  });
});
