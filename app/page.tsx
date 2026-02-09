"use client";

import TopBar from "@/components/TopBar";
import ProjectCard from "@/components/ProjectCard";
import { useI18n } from "@/app/i18n";
import { projects } from "@/app/projects.data";

export default function Home() {
  const { lang } = useI18n();

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <TopBar />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-24">
  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
    {lang === "de" ? "Hallo, ich bin" : "Hi, I’m"}
  </p>

  <h2 className="mt-3 text-5xl md:text-6xl font-bold tracking-tight">
    Ali Abdi
  </h2>

  <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
    {lang === "de" ? "Junior Entwickler" : "Junior Developer"}
  </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            {lang === "de" ? "Projekte ansehen" : "View Projects"}
          </a>

          <a
            href="#"
            className="rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            {lang === "de" ? "Lebenslauf" : "Resume"}
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="mx-auto max-w-5xl px-6 pb-28"
      >
        <h3 className="text-3xl font-semibold">
          {lang === "de" ? "Projekte" : "Projects"}
        </h3>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              title={p.title[lang]}
              description={p.description[lang]}
              tech={p.tech}
              github={p.github}
              live={p.live}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
