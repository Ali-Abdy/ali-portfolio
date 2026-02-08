"use client";

import TopBar from "@/components/TopBar";
import { useI18n } from "@/app/i18n";

const copy = {
  en: {
    hi: "Hi, I'm",
    role: "Junior Developer",
    ctaProjects: "View Projects",
    ctaResume: "Resume",
    projectsTitle: "Projects",
  },
  de: {
    hi: "Hi, ich bin",
    role: "Junior Entwickler",
    ctaProjects: "Projekte ansehen",
    ctaResume: "Lebenslauf",
    projectsTitle: "Projekte",
  },
} as const;

export default function Home() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <TopBar />

      <section className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <p className="text-sm text-black/60 dark:text-white/60">{t.hi}</p>

        <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight">
          Ali Abdi
        </h1>

        <p className="mt-4 text-xl text-black/70 dark:text-white/70">
          {t.role}
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition"
          >
            {t.ctaProjects}
          </a>
          <a
            href="/resume"
            className="rounded-full border border-black/10 bg-white/60 px-6 py-3 text-sm font-medium hover:bg-white transition
                       dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            {t.ctaResume}
          </a>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-5xl px-6 pb-28">
        <h2 className="text-2xl font-semibold">{t.projectsTitle}</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white/60 p-6
                          dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-medium">Portfolio Website</h3>
            <p className="mt-2 text-black/70 dark:text-white/70">
              Next.js + Tailwind, clean Apple-like layout.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6
                          dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-medium">Weather App</h3>
            <p className="mt-2 text-black/70 dark:text-white/70">
              Simple UI, API integration, responsive design.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
