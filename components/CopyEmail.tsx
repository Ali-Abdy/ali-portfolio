"use client";

import { useState } from "react";
import { Icon } from "./Icons";
import { useHydrated } from "@/lib/use-hydrated";

export default function CopyEmail({
  email,
  text,
}: {
  email: string;
  text: { copy: string; copied: string; success: string; failure: string };
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const hydrated = useHydrated();
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }
  return (
    <div className="copy-email" hidden={!hydrated}>
      <button type="button" className="button button-secondary" onClick={copy}>
        <Icon name={status === "copied" ? "check" : "copy"} />
        {status === "copied" ? text.copied : text.copy}
      </button>
      <p className="copy-status" role="status">
        {status === "copied"
          ? text.success
          : status === "failed"
            ? text.failure
            : ""}
      </p>
    </div>
  );
}
