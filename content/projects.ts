import type { Locale } from "./site";

type ProjectText = {
  category: string;
  summary: string;
  status: string;
  features: string[];
  learning: string;
  note: string;
};
export type Project = {
  slug: string;
  title: string;
  stack: string[];
  github: string;
  live?: string;
  text: Record<Locale, ProjectText>;
};

export const projects: Project[] = [
  {
    slug: "luxury-barbershop",
    title: "Luxury Barbershop",
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
        category: "Webanwendung mit Datenbank",
        summary:
          "Eine mehrsprachige Anwendung für einen Barbershop. Mein bisher größtes Lernprojekt verbindet Oberfläche, Anmeldung und Datenmodelle für die Terminverwaltung.",
        status: "In Entwicklung",
        features: [
          "Deutsche und englische Oberfläche",
          "Anmeldung und rollenbasierte Seiten für Kunden, Admins und Barber",
          "Datenmodelle für Leistungen, Verfügbarkeiten und Termine",
        ],
        learning:
          "Das Zusammenspiel von React-Komponenten, Benutzerrollen und einer relationalen Datenbank. Mit Prisma beschreibe ich die Datenmodelle; Next.js verbindet die Oberfläche mit serverseitigen Abläufen.",
        note: "Die Buchung ist noch nicht durchgängig nutzbar. Datumsauswahl und Zeitfenster-Logik werden weiterentwickelt. Das Projekt ist noch nicht öffentlich bereitgestellt.",
      },
      en: {
        category: "Web application with a database",
        summary:
          "A bilingual application for a barbershop. My largest learning project so far connects an interface, authentication, and data models for appointment management.",
        status: "In development",
        features: [
          "German and English interfaces",
          "Authentication and role-based pages for customers, admins, and barbers",
          "Data models for services, availability, and appointments",
        ],
        learning:
          "Connecting React components, user roles, and a relational database. I use Prisma to describe the data models and Next.js to connect the interface with server-side operations.",
        note: "Booking is not usable end to end yet. Date selection and time-slot logic are still being developed. The project is not publicly deployed.",
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
        category: "Wetter-App mit REST-API",
        summary:
          "Eine Stadtsuche, die aktuelle Wetterdaten von OpenWeatherMap abruft. Ein frühes Projekt, mit dem ich asynchrone Anfragen und das Aktualisieren einer Oberfläche geübt habe.",
        status: "Lernprototyp",
        features: [
          "Stadtsuche mit asynchroner API-Anfrage",
          "Anzeige von Temperatur, Luftfeuchtigkeit und Wetter-Icons",
          "Rückmeldung bei einem nicht gefundenen Ort",
        ],
        learning:
          "Mit async/await auf eine API-Antwort warten, JSON-Daten auslesen und die passenden DOM-Elemente aktualisieren. Die Oberfläche ist mit HTML, CSS und JavaScript umgesetzt, ohne UI-Framework.",
        note: "Fehlerbehandlung und Windeinheit müssen überarbeitet werden. Der Quellcode dokumentiert den Lernstand; eine Live-Demo ist nicht veröffentlicht.",
      },
      en: {
        category: "Weather app using a REST API",
        summary:
          "A city search that fetches current weather from OpenWeatherMap. An early project for practising asynchronous requests and updating an interface with the response.",
        status: "Learning prototype",
        features: [
          "City search with asynchronous API requests",
          "Temperature, humidity, and weather icons",
          "Feedback when a city cannot be found",
        ],
        learning:
          "Using async/await to wait for an API response, reading JSON data, and updating the relevant DOM elements. The interface uses HTML, CSS, and JavaScript without a UI framework.",
        note: "Error handling and the wind-unit display need revision. The source code documents this stage of learning; there is no published live demo.",
      },
    },
  },
];
