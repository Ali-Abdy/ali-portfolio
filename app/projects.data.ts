export type Lang = "en" | "de";
export type Project = {
  slug: string;
  title: { en: string; de: string };
  description: { en: string; de: string };
  tech: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "skycast",
    title: { en: "Skycast", de: "Skycast" },
    description: {
      en: "A weather app that fetches real-time data using the OpenWeatherMap API with a clean, responsive UI.",
      de: "Eine Wetter-App, die Echtzeitdaten über die OpenWeatherMap-API abruft – mit einer klaren, responsiven Oberfläche.",
    },
    tech: ["JavaScript", "HTML", "CSS", "API"],
    github: "https://github.com/Ali-Abdy/Skycast",
  },
  {
  slug: "codex",
  title: { en: "Codex", de: "Codex" },
  description: {
    en: "A weather app that works accurately.",
    de: "Eine Wetter-App, die zuverlässig und genau funktioniert.",
  },
  tech: ["JavaScript", "HTML", "CSS", "API"],
  github: "https://github.com/Ali-Abdy/Codex",
},
];
