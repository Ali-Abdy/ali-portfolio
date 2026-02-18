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

  <h1 className="mt-2 text-5xl md:text-7xl font-semibold tracking-tight">
    Ali Abdi
  </h1>

  <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400">
    {lang === "de"
      ? "Junior Entwickler mit Fokus auf moderne Webanwendungen."
      : "Junior Developer focused on modern web applications."}
  </p>
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
