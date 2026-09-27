import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { content, isLocale, locales, profile } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import Providers from "../providers";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], display: "swap" });
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { title, description } = content[lang].metadata;
  const siteUrl = getSiteUrl();
  return {
    title,
    description,
    authors: [{ name: profile.name }],
    keywords: [
      "Ali Abdi",
      "Fachinformatiker Anwendungsentwicklung",
      "Praktikum",
      "Ausbildung",
      "Saarland",
      "Webentwicklung",
    ],
    ...(siteUrl && {
      metadataBase: siteUrl,
      alternates: {
        canonical: `/${lang}`,
        languages: { de: "/de", en: "/en", "x-default": "/de" },
      },
    }),
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "Ali Abdi · Portfolio",
      locale: lang === "de" ? "de_DE" : "en_GB",
      alternateLocale: lang === "de" ? "en_GB" : "de_DE",
      ...(siteUrl && {
        url: `/${lang}`,
        images: [
          { url: `/social/${lang}`, width: 1200, height: 630, alt: title },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteUrl && { images: [`/social/${lang}`] }),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
