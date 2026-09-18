import type { Locale } from "./site";

type ProjectText = {
  category: string;
  summary: string;
  status: string;
  features: string[];
  learning: string;
  note: string;
  imageAlt: string;
  imageCaption: string;
};
export type Project = {
  slug: string;
  title: string;
  stack: string[];
  github: string;
  live?: string;
  image?: string;
  featured?: boolean;
  text: Record<Locale, ProjectText>;
};

export const projects: Project[] = [
  {
    slug: "luxury-barbershop",
    title: "Luxury Barbershop",
    featured: true,
    image: "/projects/luxury-barbershop.webp",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    github: "https://github.com/Ali-Abdy/Luxury-Barbershop",
    text: {
      de: {
        category: "Webanwendung · mein größtes Lernprojekt",
        summary:
          "Eine mehrsprachige Barbershop-Anwendung, an der ich das Zusammenspiel von Oberfläche, Anmeldung und Datenbank übe.",
        status: "In Entwicklung",
        features: [
          "Deutsche und englische Oberfläche",
          "Anmeldung und rollenbasierte Seiten für Kunden, Admins und Barber",
          "Datenmodelle für Leistungen, Verfügbarkeiten und Termine",
        ],
        learning:
          "Wie ich eine größere Anwendung in Komponenten aufteile und Benutzerrollen, Datenmodelle und serverseitige Abläufe miteinander verbinde.",
        note: "Die Terminbuchung ist noch nicht vollständig: Datumsauswahl und Zeitfenster-Logik werden weiterentwickelt.",
        imageAlt:
          "Dunkler Barbershop-Innenraum aus dem Bildmaterial des Luxury-Barbershop-Projekts",
        imageCaption: "Bildmaterial aus dem Projekt · kein Screenshot",
      },
      en: {
        category: "Web application · my largest learning project",
        summary:
          "A bilingual barbershop application where I’m learning to connect an interface, authentication, and a database.",
        status: "In development",
        features: [
          "German and English interfaces",
          "Authentication and role-based pages for customers, admins, and barbers",
          "Data models for services, availability, and appointments",
        ],
        learning:
          "Breaking a larger application into components and connecting user roles, data models, and server-side flows.",
        note: "Booking is not complete yet: date selection and time-slot logic are still being developed.",
        imageAlt:
          "Dark barbershop interior from the Luxury Barbershop project’s visual assets",
        imageCaption: "Project visual asset · not a screenshot",
      },
    },
  },
  {
    slug: "skycast",
    title: "Skycast",
    stack: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    github: "https://github.com/Ali-Abdy/Skycast",
    text: {
      de: {
        category: "Wetter-App · Grundlagen & APIs",
        summary:
          "Ein frühes Lernprojekt: eine Stadtsuche, die Wetterdaten von OpenWeatherMap abruft und direkt in der Oberfläche anzeigt.",
        status: "Lernprojekt",
        features: [
          "Stadtsuche mit asynchroner API-Anfrage",
          "Temperatur, Luftfeuchtigkeit und Wetter-Icons",
          "Rückmeldung bei einem nicht gefundenen Ort",
        ],
        learning:
          "API-Antworten als JSON lesen, mit async/await arbeiten und Inhalte im DOM aktualisieren.",
        note: "Ein früher Prototyp. Fehlerbehandlung und die Anzeige der Windeinheit brauchen noch Überarbeitung; deshalb ist kein Live-Demo verlinkt.",
        imageAlt: "",
        imageCaption: "",
      },
      en: {
        category: "Weather app · fundamentals & APIs",
        summary:
          "An early learning project: a city search that requests weather data from OpenWeatherMap and displays it in the interface.",
        status: "Learning project",
        features: [
          "City search with asynchronous API requests",
          "Temperature, humidity, and weather icons",
          "Feedback when a city cannot be found",
        ],
        learning:
          "Reading JSON API responses, working with async/await, and updating content in the DOM.",
        note: "An early prototype. Error handling and the wind-unit display still need work, so there is no live demo linked.",
        imageAlt: "",
        imageCaption: "",
      },
    },
  },
];
