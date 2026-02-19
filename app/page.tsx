"use client";

import TopBar from "@/components/TopBar";
import ProjectCard from "@/components/ProjectCard";
import { useI18n } from "@/app/i18n";
import { projects } from "@/app/projects.data";
import Image from "next/image";
import Hero from "@/components/Hero";



export default function Home() {
  const { lang } = useI18n();

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <TopBar />

<Hero />

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="mx-auto max-w-5xl px-6 pb-28 scroll-mt-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950"
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
