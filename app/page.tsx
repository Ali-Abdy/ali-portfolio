"use client";

import TopBar from "@/components/TopBar";
import ProjectCard from "@/components/ProjectCard";
import { useI18n } from "@/app/i18n";
import { projects } from "@/app/projects.data";
import Image from "next/image";


export default function Home() {
  const { lang } = useI18n();

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <TopBar />

{/* HERO SECTION */}
<section className="mx-auto max-w-5xl px-6 pt-32 pb-24">
  <div className="flex items-center justify-between gap-6 md:gap-10">
    {/* Left: Text */}
    <div className="min-w-0 flex-1">
      <p className="text-[clamp(12px,2.4vw,16px)] text-gray-500 dark:text-gray-400">
        {lang === "de" ? "Hallo, ich bin" : "Hi, I’m"}
      </p>

      <h1 className="mt-2 font-semibold tracking-tight text-[clamp(28px,6vw,72px)] leading-[1.05]">
        Ali Abdi
      </h1>

      <p className="mt-4 text-[clamp(13px,2.6vw,20px)] text-gray-600 dark:text-gray-400 max-w-[52ch]">
        {lang === "de"
          ? "Junior Entwickler mit Fokus auf moderne Webanwendungen."
          : "Junior Developer focused on modern web applications."}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#contact"
          className="rounded-xl px-4 py-2 text-[clamp(12px,2.2vw,14px)] font-medium bg-black text-white dark:bg-white dark:text-black"
        >
          {lang === "de" ? "Kontakt" : "Hire Me"}
        </a>

        <a
          href="https://www.linkedin.com/in/ali-abdi-749222356/"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-xl px-4 py-2 text-[clamp(12px,2.2vw,14px)] font-medium border border-black/10 dark:border-white/15"
        >
          LinkedIn
        </a>
      </div>
    </div>

    {/* Right: Image (always visible, always horizontal) */}
    <div className="flex-none w-[clamp(120px,32vw,280px)]">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
        <Image
          src="/profile.png"
          alt="Ali Abdi"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 32vw, 280px"
        />
      </div>
    </div>
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
