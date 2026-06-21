export type ToastNotification = {
  message: string;
  variant: "success" | "error";
};

const toastNotifications = {
  "signin-success": {
    message: "Signed in successfully.",
    variant: "success",
  },
  "signout-success": {
    message: "Signed out successfully.",
    variant: "success",
  },
} as const satisfies Record<string, ToastNotification>;

export function getToastFromSearchParam(
  value: string | string[] | undefined,
): ToastNotification | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  if (!Object.hasOwn(toastNotifications, value)) {
    return undefined;
  }

  return toastNotifications[value as keyof typeof toastNotifications];
}
