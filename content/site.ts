export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const profile = {
  name: "Ali Abdi",
  email: "aliabdihaj@gmail.com",
  github: "https://github.com/Ali-Abdy",
  linkedin: "https://www.linkedin.com/in/ali-abdi-749222356/",
  // Add a real file under public/ and set this path, e.g. /cv/ali-abdi.pdf.
  cv: null as string | null,
};

export type SectionId = "about" | "skills" | "projects" | "journey" | "contact";
type SectionIntro = { label: string; title: string; intro: string };
export type Content = {
  metadata: { title: string; description: string };
  nav: { id: SectionId; label: string }[];
  controls: {
    navigation: string;
    openMenu: string;
    closeMenu: string;
    light: string;
    dark: string;
    language: string;
    skip: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    title: string;
    description: string;
    projects: string;
    contact: string;
    cv: string;
    cvPending: string;
    availability: string;
    location: string;
    portraitAlt: string;
    caption: string;
  };
  about: SectionIntro & {
    paragraphs: string[];
    note: string;
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  skills: SectionIntro & {
    groups: { title: string; description: string; items: string[] }[];
  };
  projects: SectionIntro & {
    featured: string;
    source: string;
    demo: string;
    learning: string;
    more: string;
    features: string;
  };
  journey: SectionIntro & {
    items: { label: string; title: string; description: string }[];
  };
  career: { label: string; title: string; description: string; tags: string[] };
  contact: {
    label: string;
    title: string;
    description: string;
    email: string;
    location: string;
  };
  footer: { note: string; top: string };
};

export const content: Record<Locale, Content> = {
  de: {
    metadata: {
      title: "Ali Abdi · Angehender Anwendungsentwickler im Saarland",
      description:
        "Ich bin Ali Abdi aus dem Saarland. Hier zeige ich meine Webprojekte und meinen Weg zum Fachinformatiker für Anwendungsentwicklung. Offen für Praktikum und Ausbildung.",
    },
    nav: [
      { id: "about", label: "Über mich" },
      { id: "skills", label: "Kenntnisse" },
      { id: "projects", label: "Projekte" },
      { id: "journey", label: "Mein Weg" },
      { id: "contact", label: "Kontakt" },
    ],
    controls: {
      navigation: "Hauptnavigation",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      light: "Helles Design aktivieren",
      dark: "Dunkles Design aktivieren",
      language: "Sprache",
      skip: "Zum Inhalt springen",
      home: "Ali Abdi – Startseite",
    },
    hero: {
      eyebrow: "Angehender Anwendungsentwickler",
      greeting: "Hallo, ich bin Ali.",
      title: "Ich lerne, indem\nich entwickle.",
      description:
        "Ich baue Webanwendungen und vertiefe dabei meine Programmierkenntnisse. Mein Ziel: eine Ausbildung zum Fachinformatiker für Anwendungsentwicklung.",
      projects: "Projekte ansehen",
      contact: "Kontakt aufnehmen",
      cv: "Lebenslauf",
      cvPending: "Bald verfügbar",
      availability: "Offen für Praktikum & Ausbildung",
      location: "Saarland, Deutschland",
      portraitAlt: "Porträt von Ali Abdi",
      caption: "Neugierig bleiben. Schritt für Schritt weiterkommen.",
    },
    about: {
      label: "01 / Über mich",
      title: "Vom Ausprobieren\nzum Verstehen.",
      intro:
        "Am meisten lerne ich, wenn aus einer Idee etwas wird, das ich selbst benutzen kann.",
      paragraphs: [
        "Ich bin Ali und lebe im Saarland. Mein Schwerpunkt ist die Web- und Anwendungsentwicklung: Oberflächen gestalten, Daten verarbeiten und verstehen, wie die Teile einer Anwendung zusammenarbeiten.",
        "Ich stehe am Anfang meines Weges. Mit jedem Projekt übe ich, Probleme in kleinere Schritte zu zerlegen, Fehler zu finden und meinen Code verständlicher zu machen.",
      ],
      note: "Mein Ziel ist, diese Grundlagen in einer Ausbildung zu vertiefen und im Team an echten Aufgaben zu wachsen.",
      languagesTitle: "Sprachen",
      languages: [
        { name: "Somali", level: "Muttersprache" },
        { name: "Englisch", level: "Fließend" },
        { name: "Deutsch", level: "B2 · aktuell im Kurs" },
        { name: "Kiswahili", level: "" },
      ],
    },
    skills: {
      label: "02 / Kenntnisse",
      title: "Mein Werkzeugkasten.",
      intro:
        "Technologien, mit denen ich in meinen Projekten arbeite und weiterlerne.",
      groups: [
        {
          title: "Oberflächen",
          description:
            "Von einer HTML-Seite bis zu Komponenten und responsiven Layouts.",
          items: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
          ],
        },
        {
          title: "Daten & Anwendungslogik",
          description:
            "API-Anfragen, Datenmodelle und serverseitige Abläufe im Barbershop-Projekt.",
          items: ["Node.js", "Prisma", "PostgreSQL", "REST-APIs"],
        },
        {
          title: "Entwicklungsalltag",
          description:
            "Änderungen nachvollziehen, Code organisieren und Projekte Schritt für Schritt verbessern.",
          items: ["Git", "GitHub", "VS Code", "npm"],
        },
      ],
    },
    projects: {
      label: "03 / Ausgewählte Projekte",
      title: "Gelernt. Gebaut.\nWeiterentwickelt.",
      intro:
        "Zwei Projekte aus meinem Lernprozess – mit unterschiedlichen Schwerpunkten und einem ehrlichen Blick auf den aktuellen Stand.",
      featured: "Im Fokus",
      source: "Code ansehen",
      demo: "Live ansehen",
      learning: "Was ich dabei lerne",
      more: "Weitere Arbeiten auf GitHub",
      features: "Einblicke",
    },
    journey: {
      label: "04 / Mein Weg",
      title: "Der nächste Schritt\nbaut auf dem letzten auf.",
      intro:
        "Ich bereite mich fachlich und sprachlich auf meinen Einstieg in die Anwendungsentwicklung vor.",
      items: [
        {
          label: "Praxis",
          title: "Programmieren durch Projekte",
          description:
            "Ich lerne Webentwicklung und wende neue Kenntnisse direkt an – von API-Anfragen bis zu einer Anwendung mit Datenbank.",
        },
        {
          label: "Aktuell",
          title: "Deutsch vertiefen · B2-Kurs",
          description:
            "Ich besuche einen B2-Deutschkurs, um mich im Alltag und im beruflichen Umfeld sicherer auszudrücken.",
        },
        {
          label: "Orientierung",
          title: "Berufsvorbereitende Bildungsmaßnahme",
          description:
            "Ich nehme an einer BvB teil und bereite meinen nächsten beruflichen Schritt vor. Mein Schwerpunkt bleibt die Softwareentwicklung.",
        },
      ],
    },
    career: {
      label: "Mein berufliches Ziel",
      title: "Fachinformatiker für\nAnwendungsentwicklung.",
      description:
        "Ich suche ein Praktikum oder einen Ausbildungsplatz, bei dem ich mitarbeiten, Fragen stellen und von einem Entwicklungsteam lernen kann.",
      tags: ["Praktikum", "Ausbildung", "Softwareentwicklung"],
    },
    contact: {
      label: "05 / Kontakt",
      title: "Lernen wir uns kennen.",
      description:
        "Sie bieten ein Praktikum oder eine Ausbildung in der Anwendungsentwicklung an? Ich freue mich über eine Nachricht und die Gelegenheit, mich vorzustellen.",
      email: "E-Mail schreiben",
      location: "Saarland, Deutschland",
    },
    footer: {
      note: "Mit Next.js entwickelt. Mit jedem Projekt dazugelernt.",
      top: "Nach oben",
    },
  },
  en: {
    metadata: {
      title: "Ali Abdi · Aspiring application developer in Saarland",
      description:
        "Web projects and the learning journey of Ali Abdi, an aspiring application developer based in Saarland, Germany. Open to internships and vocational training.",
    },
    nav: [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "journey", label: "Journey" },
      { id: "contact", label: "Contact" },
    ],
    controls: {
      navigation: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      light: "Switch to light theme",
      dark: "Switch to dark theme",
      language: "Language",
      skip: "Skip to content",
      home: "Ali Abdi – home",
    },
    hero: {
      eyebrow: "Aspiring application developer",
      greeting: "Hi, I’m Ali.",
      title: "Learning by\nbuilding things.",
      description:
        "I build web applications to grow my programming skills. My next step is vocational training as a Fachinformatiker für Anwendungsentwicklung.",
      projects: "Explore my projects",
      contact: "Get in touch",
      cv: "Download CV",
      cvPending: "Coming soon",
      availability: "Open to internships & vocational training",
      location: "Saarland, Germany",
      portraitAlt: "Portrait of Ali Abdi",
      caption: "Stay curious. Keep taking the next step.",
    },
    about: {
      label: "01 / About",
      title: "From trying things\nto understanding them.",
      intro: "Building something I can actually use is how I learn best.",
      paragraphs: [
        "I’m Ali, based in Saarland, Germany. I’m learning web and application development: designing interfaces, working with data, and figuring out how the pieces fit together.",
        "I’m early in my development journey. Each project gives me another chance to break down a problem, track down a bug, and write code that is easier to follow.",
      ],
      note: "I want to build on these foundations through vocational training and learn from real work in a development team.",
      languagesTitle: "Languages",
      languages: [
        { name: "Somali", level: "Native" },
        { name: "English", level: "Fluent" },
        { name: "German", level: "B2 · attending a course" },
        { name: "Kiswahili", level: "" },
      ],
    },
    skills: {
      label: "02 / Skills",
      title: "Tools I’m working with.",
      intro:
        "Technologies I use in my projects and continue to learn along the way.",
      groups: [
        {
          title: "Interfaces",
          description:
            "From an HTML page to reusable components and responsive layouts.",
          items: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
          ],
        },
        {
          title: "Data & application logic",
          description:
            "API requests, data models, and server-side flows in the barbershop project.",
          items: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"],
        },
        {
          title: "Everyday tools",
          description:
            "Tracking changes, organizing code, and improving projects one step at a time.",
          items: ["Git", "GitHub", "VS Code", "npm"],
        },
      ],
    },
    projects: {
      label: "03 / Selected projects",
      title: "Learn it. Build it.\nKeep improving it.",
      intro:
        "Two projects from my learning journey, each with a different focus and a clear picture of where it stands.",
      featured: "Featured project",
      source: "View source",
      demo: "Live demo",
      learning: "What I’m learning",
      more: "More work on GitHub",
      features: "Inside the project",
    },
    journey: {
      label: "04 / Journey",
      title: "One step leads\nto the next.",
      intro:
        "I’m developing the technical and language skills I need to begin a career in application development.",
      items: [
        {
          label: "Practice",
          title: "Learning through projects",
          description:
            "I put new web development skills into practice, from making API requests to building an application with a database.",
        },
        {
          label: "Currently",
          title: "Developing my German · B2 course",
          description:
            "I’m attending a B2 German course to communicate more confidently in everyday life and in a workplace.",
        },
        {
          label: "Preparation",
          title: "Vocational preparation programme",
          description:
            "I’m taking part in a BvB programme as I prepare for my next career step, with software development as my focus.",
        },
      ],
    },
    career: {
      label: "Where I’m heading",
      title: "Fachinformatiker für\nAnwendungsentwicklung.",
      description:
        "I’m looking for an internship or vocational training opportunity where I can contribute, ask questions, and learn alongside a development team.",
      tags: ["Internship", "Vocational training", "Software development"],
    },
    contact: {
      label: "05 / Contact",
      title: "Let’s start a conversation.",
      description:
        "Does your team offer internships or vocational training in application development? I’d be glad to hear from you and introduce myself.",
      email: "Send an email",
      location: "Saarland, Germany",
    },
    footer: {
      note: "Built with Next.js. Learning with every project.",
      top: "Back to top",
    },
  },
};
