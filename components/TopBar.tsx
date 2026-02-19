"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useI18n } from "@/app/i18n";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : true;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur
                        dark:bg-black/40 dark:border-white/10 bg-white/70 border-black/10">
          <div className="px-4 py-3 text-sm font-medium">
            <span className="text-black dark:text-white">Ali Abdi</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="rounded-full px-3 py-2 text-xs font-medium border border-black/10 bg-white/60 hover:bg-white
                        dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-black dark:text-white"
              aria-label="Toggle language"
            >
              {lang === "en" ? "EN" : "DE"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="rounded-full px-3 py-2 text-xs font-medium border border-black/10 bg-white/60 hover:bg-white
                        dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-black dark:text-white"
              aria-label="Toggle theme"
            >
              {isDark ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
