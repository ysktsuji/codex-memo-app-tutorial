"use client";

import { CheckCircle2, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import type { ToastNotification } from "@/lib/toast";

type TemporaryToastProps = ToastNotification;

export function TemporaryToast({ message, variant }: TemporaryToastProps) {
  if (!message) {
    return null;
  }

  return (
    <DismissibleToast
      key={`${variant}:${message}`}
      message={message}
      variant={variant}
    />
  );
}

function DismissibleToast({ message, variant }: TemporaryToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) {
    return null;
  }

  const Icon = variant === "success" ? CheckCircle2 : CircleAlert;

  return (
    <div
      className="fixed right-4 top-20 z-50 flex max-w-[calc(100vw-2rem)] items-start gap-3 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm font-medium text-[#1d1d1f] shadow-lg sm:right-6"
      role={variant === "success" ? "status" : "alert"}
    >
      <Icon
        className={variant === "success" ? "shrink-0 text-[#34c759]" : "shrink-0 text-[#b35b00]"}
        size={18}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span>{message}</span>
    </div>
  );
}
