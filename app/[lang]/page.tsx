import { notFound } from "next/navigation";
import { content, isLocale } from "@/content/site";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Career from "@/components/Career";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const text = content[lang];
  return (
    <>
      <a className="skip-link" href="#main-content">
        {text.controls.skip}
      </a>
      <TopBar text={{ nav: text.nav, controls: text.controls }} lang={lang} />
      <main id="main-content" tabIndex={-1}>
        <Hero text={text.hero} />
        <About text={text.about} />
        <Skills text={text.skills} />
        <Projects text={text.projects} lang={lang} />
        <Journey text={text.journey} />
        <Career text={text.career} />
        <Contact text={text.contact} />
      </main>
      <Footer text={text.footer} />
    </>
  );
}
