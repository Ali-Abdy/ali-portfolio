import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDocument from "@/components/LegalDocument";
import { content, isLocale } from "@/content/site";
import { getLegalContact } from "@/lib/legal";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const page = content[lang].legal.legal;
  const siteUrl = getSiteUrl();
  return {
    title: page.title,
    description: page.description,
    robots: { index: false, follow: true },
    ...(siteUrl && {
      alternates: {
        canonical: `/${lang}/legal`,
        languages: {
          de: "/de/legal",
          en: "/en/legal",
        },
      },
    }),
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const contact = getLegalContact();
  if (!contact) notFound();
  return (
    <LegalDocument
      lang={lang}
      kind="legal"
      text={content[lang]}
      contact={contact}
    />
  );
}
