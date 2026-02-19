"use client";

import Image from "next/image";
import { useI18n } from "@/app/i18n";

export default function Hero() {
const { lang } = useI18n();

return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-24">
<div className="flex items-center justify-between gap-x-6 md:gap-10">
    {/* Left: Text */}
    <div className="flex flex-col gap-y-2">
    <p className="text-[clamp(12px,2.4vw,16px)] text-gray-500 dark:text-gray-400">
        {lang === "de" ? "Hallo, ich bin" : "Hi, I’m"}
        </p>


    <h1 className="font-semibold leading-[1.05] tracking-tight
        text-[clamp(2.5rem,6vw,4.5rem)]">
Ali Abdi
    </h1>


    <p className="max-w-xl text-neutral-600 dark:text-neutral-300
        text-[clamp(1rem,1.2vw,1.125rem)]">
        {lang === "de"
        ? "Junior Entwickler mit Fokus auf moderne Webanwendungen."
        : "Junior Developer focused on modern web applications."}
    </p>

    <div className="mt-6 flex flex-wrap gap-x-4">
        <a
  href="#projects"
  className="
    inline-flex items-center justify-center
    px-6 py-3
    rounded-xl
    font-medium
    transition-all duration-200
    bg-black text-white
    dark:bg-white dark:text-black
    hover:opacity-90
    active:scale-[0.98]
  "
>
  {lang === "de" ? "Projekte" : "Projects"}
</a>
            

        <a
        href="https://www.linkedin.com/in/ali-abdi-749222356/"
        target="_blank"
        rel="noreferrer noopener"
        className="
    inline-flex items-center justify-center
    px-6 py-3
    rounded-xl
    font-medium
    transition-all duration-200
    bg-black text-white
    dark:bg-white dark:text-black
    hover:opacity-90
    active:scale-[0.98]
  "
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
);
}



