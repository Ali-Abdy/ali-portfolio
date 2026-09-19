"use client";

import { useEffect } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { Icon } from "./Icons";

export default function PrintProfile({
  label,
  hint,
}: {
  label: string;
  hint: string;
}) {
  const hydrated = useHydrated();
  useEffect(() => {
    let expanded: HTMLDetailsElement[] | null = null;
    const prepare = () => {
      if (expanded) return;
      expanded = Array.from(
        document.querySelectorAll<HTMLDetailsElement>(
          "details[data-print-expand]:not([open])",
        ),
      );
      expanded.forEach((details) => {
        details.open = true;
      });
    };
    const restore = () => {
      expanded?.forEach((details) => {
        details.open = false;
      });
      expanded = null;
    };
    window.addEventListener("beforeprint", prepare);
    window.addEventListener("afterprint", restore);
    return () => {
      window.removeEventListener("beforeprint", prepare);
      window.removeEventListener("afterprint", restore);
      restore();
    };
  }, []);
  return (
    <div className="print-control" hidden={!hydrated}>
      <button
        type="button"
        onClick={() => window.print()}
        className="text-link"
        aria-describedby="print-hint"
      >
        <Icon name="print" />
        {label}
      </button>
      <p id="print-hint">{hint}</p>
    </div>
  );
}
