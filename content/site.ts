export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const profile = {
  name: "Ali Abdi",
  email: "aliabdihaj@gmail.com",
  github: "https://github.com/Ali-Abdy",
  repository: "https://github.com/Ali-Abdy/ali-portfolio",
  linkedin: "https://www.linkedin.com/in/ali-abdi-749222356/",
  // Add the actual PDF under public/cv/ before setting this path.
  cv: null as string | null,
};

export type SectionId = "projects" | "skills" | "about" | "contact";
type SectionIntro = { label: string; title: string; intro: string };
export type Content = {
  metadata: { title: string; description: string };
  nav: { id: SectionId; label: string }[];
  controls: {
    navigation: string;
    menu: string;
    light: string;
    dark: string;
    language: string;
    skip: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    projects: string;
    contact: string;
    cv: string;
    cvRequest: string;
    cvSubject: string;
    availability: string;
    location: string;
    portraitAlt: string;
    facts: { label: string; value: string }[];
  };
  projects: SectionIntro & {
    source: string;
    demo: string;
    learning: string;
    more: string;
    features: string;
    details: string;
    next: string;
    stack: string;
    permalink: string;
  };
  skills: SectionIntro & {
    groups: {
      title: string;
      description: string;
      items: string[];
      evidence: { label: string; href: string };
    }[];
  };
  about: SectionIntro & {
    paragraphs: string[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
    currentTitle: string;
    current: { title: string; description: string }[];
  };
  contact: {
    label: string;
    title: string;
    description: string;
    email: string;
    subject: string;
    copy: string;
    copied: string;
    copySuccess: string;
    copyFailure: string;
    location: string;
    profiles: string;
    print: string;
    printHint: string;
  };
  footer: {
    note: string;
    top: string;
    source: string;
    licenses: string;
    legal: string;
    privacy: string;
  };
  legal: {
    back: string;
    legal: {
      title: string;
      description: string;
      heading: string;
      operator: string;
      contact: string;
      purpose: string;
      privacyLink: string;
    };
    privacy: {
      title: string;
      description: string;
      heading: string;
      intro: string;
      controllerHeading: string;
      controller: string;
      hostingHeading: string;
      hosting: string;
      storageHeading: string;
      storage: string;
      emailHeading: string;
      email: string;
      linksHeading: string;
      links: string;
      rightsHeading: string;
      rights: string;
      complaint: string;
      legalLink: string;
    };
  };
};

export const content: Record<Locale, Content> = {
  de: {
    metadata: {
      title: "Ali Abdi · Webentwicklung · Praktikum & Ausbildung im Saarland",
      description:
        "Webprojekte, Kenntnisse und Kontakt von Ali Abdi aus dem Saarland. Auf der Suche nach einem Praktikum oder einer Ausbildung zum Fachinformatiker für Anwendungsentwicklung.",
    },
    nav: [
      { id: "projects", label: "Projekte" },
      { id: "skills", label: "Kenntnisse" },
      { id: "about", label: "Über mich" },
      { id: "contact", label: "Kontakt" },
    ],
    controls: {
      navigation: "Hauptnavigation",
      menu: "Menü",
      light: "Helles Design aktivieren",
      dark: "Dunkles Design aktivieren",
      language: "Sprache",
      skip: "Zum Inhalt springen",
      home: "Ali Abdi – Startseite",
    },
    hero: {
      eyebrow: "Portfolio · Anwendungsentwicklung",
      title: "Webentwicklung mit JavaScript, React & Next.js.",
      description:
        "Ich entwickle eigene Webprojekte und suche ein Praktikum oder eine Ausbildung zum Fachinformatiker für Anwendungsentwicklung. Hier sehen Sie, woran ich arbeite und was ich bisher gelernt habe.",
      projects: "Projekte ansehen",
      contact: "Kontakt aufnehmen",
      cv: "Lebenslauf herunterladen",
      cvRequest: "Lebenslauf anfragen",
      cvSubject: "Anfrage: Lebenslauf von Ali Abdi",
      availability: "Offen für Praktikum & Ausbildung",
      location: "Saarlouis, Deutschland",
      portraitAlt: "Ali Abdi",
      facts: [
        { label: "Standort", value: "Saarlouis, Deutschland" },
        { label: "Gesucht", value: "Praktikum oder Ausbildung" },
        {
          label: "Berufsziel",
          value: "Fachinformatiker für Anwendungsentwicklung",
        },
      ],
    },
    projects: {
      label: "01 / Projekte",
      title: "Zwei Projekte. Zwei Schwerpunkte.",
      intro:
        "Von einer API-Anfrage bis zur Anwendung mit Datenbank. Quellcode, Umsetzung und aktueller Stand sind direkt nachvollziehbar.",
      source: "Quellcode auf GitHub",
      demo: "Live-Demo öffnen",
      learning: "Technischer Schwerpunkt",
      more: "GitHub-Profil ansehen",
      features: "Bisher umgesetzt",
      details: "Einblick in die Umsetzung",
      next: "Noch offen",
      stack: "Technologien",
      permalink: "Direktlink zum Projekt",
    },
    skills: {
      label: "02 / Kenntnisse",
      title: "Was ich praktisch einsetze.",
      intro:
        "Meine Kenntnisse stammen aus eigenen Lernprojekten. Die verlinkten Beispiele zeigen, wo ich sie anwende.",
      groups: [
        {
          title: "Oberflächen entwickeln",
          description:
            "Seiten strukturieren, responsive Layouts umsetzen und Oberflächen in React-Komponenten aufteilen.",
          items: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
          ],
          evidence: {
            label: "Beispiel: Luxury Barbershop",
            href: "#luxury-barbershop",
          },
        },
        {
          title: "Mit Daten arbeiten",
          description:
            "API-Antworten verarbeiten und Datenmodelle für Leistungen und Termine im Barbershop-Projekt aufbauen.",
          items: ["REST-APIs", "Node.js", "Prisma", "PostgreSQL"],
          evidence: { label: "Beispiel: Skycast", href: "#skycast" },
        },
        {
          title: "Code weiterentwickeln",
          description:
            "Änderungen mit Git nachvollziehen, Fehler untersuchen und Projekte in überschaubaren Schritten bearbeiten.",
          items: ["Git", "GitHub", "VS Code", "npm"],
          evidence: { label: "Meine Repositories", href: profile.github },
        },
      ],
    },
    about: {
      label: "03 / Über mich",
      title: "Mein Weg in die Anwendungsentwicklung.",
      intro: "Ich bin Ali und lebe in Saarlouis, Deutschland.",
      paragraphs: [
        "Mich interessiert, wie aus einer Oberfläche eine funktionierende Anwendung wird: Wie kommen Daten auf die Seite? Wie greifen Anmeldung, Benutzerrollen und Datenbank ineinander? An diesen Fragen arbeite ich in meinen Projekten.",
        "Ich stehe am Anfang meiner beruflichen Entwicklung. In einem Praktikum oder einer Ausbildung möchte ich meine Grundlagen vertiefen und lernen, wie ein Entwicklungsteam Software plant, prüft und betreut.",
      ],
      currentTitle: "Aktuell",
      current: [
        {
          title: "Deutsch · B2-Kurs",
          description:
            "Ich besuche einen B2-Kurs, um mich im Alltag und im beruflichen Umfeld sicherer auszudrücken.",
        },
        {
          title: "Berufsvorbereitende Bildungsmaßnahme",
          description:
            "Im Rahmen einer BvB bereite ich meinen beruflichen Einstieg vor. Mein Ziel ist die Anwendungsentwicklung.",
        },
      ],
      languagesTitle: "Sprachen",
      languages: [
        { name: "Somali", level: "Muttersprache" },
        { name: "Englisch", level: "Fließend" },
        { name: "Deutsch", level: "B2-Kurs, laufend" },
        { name: "Kiswahili", level: "Weitere Sprache" },
      ],
    },
    contact: {
      label: "04 / Kontakt",
      title: "Passt mein Profil zu Ihrem Team?",
      description:
        "Ich freue mich über eine Nachricht zu einem Praktikum oder einer Ausbildung. Meinen Lebenslauf sende ich Ihnen gerne per E-Mail.",
      email: "E-Mail schreiben",
      subject: "Praktikum / Ausbildung – Kontakt über Ihr Portfolio",
      copy: "Adresse kopieren",
      copied: "Kopiert",
      copySuccess: "E-Mail-Adresse kopiert.",
      copyFailure:
        "Kopieren ist hier nicht möglich. Bitte markieren und kopieren Sie die E-Mail-Adresse direkt.",
      location: "Saarlouis, Deutschland",
      profiles: "Weitere Profile",
      print: "Portfolio drucken",
      printHint:
        "Druckansicht mit Projektdetails und Kontakt. Auch als PDF speicherbar.",
    },
    footer: {
      note: "Ali Abdi · Anwendungsentwicklung",
      top: "Zurück nach oben",
      source: "Quellcode dieses Portfolios",
      licenses: "Drittanbieter-Lizenzen",
      legal: "Impressum",
      privacy: "Datenschutz",
    },
    legal: {
      back: "Zurück zum Portfolio",
      legal: {
        title: "Impressum · Ali Abdi",
        description: "Anbieterinformationen für das Portfolio von Ali Abdi.",
        heading: "Impressum",
        operator: "Angaben zum Anbieter",
        contact: "Kontakt",
        purpose:
          "Dieses persönliche Portfolio informiert über eigene Lernprojekte sowie die Suche nach einem Praktikum oder einer Ausbildung in der Anwendungsentwicklung.",
        privacyLink: "Zur Datenschutzerklärung",
      },
      privacy: {
        title: "Datenschutzerklärung · Ali Abdi",
        description:
          "Hinweise zur Datenverarbeitung auf dem Portfolio von Ali Abdi.",
        heading: "Datenschutzerklärung",
        intro:
          "Diese Hinweise beschreiben die Verarbeitung, die durch die Website selbst erfolgt. Sie gelten nur, wenn die Seite mit den hier genannten Einstellungen veröffentlicht ist.",
        controllerHeading: "Verantwortliche Person",
        controller:
          "Verantwortlich für die Inhalte dieser Website ist die im Impressum genannte Person.",
        hostingHeading: "Hosting und Server-Protokolle",
        hosting:
          "Beim Aufruf einer Website verarbeitet der eingesetzte Hosting-Anbieter technisch erforderliche Verbindungs- und Anfrageinformationen, etwa IP-Adresse und Zeitpunkt, um die Seite bereitzustellen und ihre Sicherheit zu gewährleisten. Der konkrete Anbieter, seine Empfänger, Speicherfristen und mögliche Drittlandtransfers werden vor der Veröffentlichung anhand der tatsächlich gewählten Konfiguration ergänzt.",
        storageHeading: "Speicherung im Browser",
        storage:
          "Diese Website setzt keine Analyse-, Marketing- oder Tracking-Cookies ein. Erst wenn Sie das Farbschema selbst ändern, speichert Ihr Browser die Auswahl lokal unter dem Schlüssel „theme“. Diese Einstellung wird nicht durch die Website an einen eigenen Server übermittelt und bleibt bestehen, bis Sie sie ändern oder die Website-Daten im Browser löschen.",
        emailHeading: "E-Mail",
        email:
          "Ein Kontaktformular gibt es nicht. Über einen E-Mail-Link öffnet die Website Ihr eigenes E-Mail-Programm. Wenn Sie eine Nachricht senden, verarbeiten die beteiligten E-Mail-Anbieter und der Empfänger die darin enthaltenen Angaben zur Bearbeitung Ihrer Anfrage. Informationen zu konkreten Speicherfristen werden vor der Veröffentlichung für das tatsächlich verwendete Postfach ergänzt.",
        linksHeading: "Externe Links",
        links:
          "Links zu GitHub, LinkedIn und Projekt-Repositories sind gewöhnliche Verweise. Erst nach dem Anklicken gelten die Datenschutzhinweise der jeweiligen Anbieter.",
        rightsHeading: "Ihre Rechte",
        rights:
          "Soweit die Datenschutz-Grundverordnung anwendbar ist, können Sie unter den gesetzlichen Voraussetzungen Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit verlangen. Eine erteilte Einwilligung können Sie mit Wirkung für die Zukunft widerrufen.",
        complaint:
          "Sie können sich außerdem bei einer zuständigen Datenschutzaufsichtsbehörde beschweren; für Saarland ist dies das Unabhängige Datenschutzzentrum Saarland.",
        legalLink: "Zum Impressum",
      },
    },
  },
  en: {
    metadata: {
      title: "Ali Abdi · Web development · Internships & vocational training",
      description:
        "Projects, skills, and contact details for Ali Abdi in Saarlouis, Germany. Seeking an internship or vocational training in application development.",
    },
    nav: [
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" },
    ],
    controls: {
      navigation: "Main navigation",
      menu: "Menu",
      light: "Switch to light theme",
      dark: "Switch to dark theme",
      language: "Language",
      skip: "Skip to content",
      home: "Ali Abdi – home",
    },
    hero: {
      eyebrow: "Portfolio · Application development",
      title: "Web development with JavaScript, React & Next.js.",
      description:
        "I build my own web projects and am looking for an internship or vocational training as a Fachinformatiker für Anwendungsentwicklung. Here is what I’m working on and what I’ve learned so far.",
      projects: "View projects",
      contact: "Get in touch",
      cv: "Download CV",
      cvRequest: "Request my CV",
      cvSubject: "Request: Ali Abdi’s CV",
      availability: "Open to internships & vocational training",
      location: "Saarlouis, Germany",
      portraitAlt: "Ali Abdi",
      facts: [
        { label: "Based in", value: "Saarlouis, Germany" },
        { label: "Looking for", value: "Internship or vocational training" },
        {
          label: "Career goal",
          value: "Fachinformatiker für Anwendungsentwicklung",
        },
      ],
    },
    projects: {
      label: "01 / Projects",
      title: "Two projects. Two different challenges.",
      intro:
        "From an API request to an application with a database. Explore the source code, implementation, and current state of each project.",
      source: "Source code on GitHub",
      demo: "Open live demo",
      learning: "Technical focus",
      more: "Visit my GitHub profile",
      features: "Implemented so far",
      details: "Explore the implementation",
      next: "Still to do",
      stack: "Technologies",
      permalink: "Link to this project",
    },
    skills: {
      label: "02 / Skills",
      title: "What I put into practice.",
      intro:
        "These are skills I’m developing through personal projects. The linked examples show where I use them.",
      groups: [
        {
          title: "Building interfaces",
          description:
            "Structuring pages, implementing responsive layouts, and breaking interfaces into React components.",
          items: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
          ],
          evidence: {
            label: "Example: Luxury Barbershop",
            href: "#luxury-barbershop",
          },
        },
        {
          title: "Working with data",
          description:
            "Handling API responses and building data models for services and appointments in the barbershop project.",
          items: ["REST APIs", "Node.js", "Prisma", "PostgreSQL"],
          evidence: { label: "Example: Skycast", href: "#skycast" },
        },
        {
          title: "Improving code",
          description:
            "Tracking changes with Git, investigating bugs, and working on projects in manageable steps.",
          items: ["Git", "GitHub", "VS Code", "npm"],
          evidence: { label: "My repositories", href: profile.github },
        },
      ],
    },
    about: {
      label: "03 / About",
      title: "My path into application development.",
      intro: "I’m Ali, based in Saarlouis, Germany.",
      paragraphs: [
        "I’m interested in how an interface becomes a working application: how does data reach the page? How do authentication, user roles, and a database fit together? These are the questions I work through in my projects.",
        "I’m at the start of my career. Through an internship or vocational training, I want to strengthen my foundations and learn how a development team plans, tests, and maintains software.",
      ],
      currentTitle: "Currently",
      current: [
        {
          title: "German · B2 course",
          description:
            "I’m attending a B2 course to communicate more confidently in everyday life and at work.",
        },
        {
          title: "Vocational preparation programme",
          description:
            "I’m preparing for my career through a BvB programme, with application development as my goal.",
        },
      ],
      languagesTitle: "Languages",
      languages: [
        { name: "Somali", level: "Native" },
        { name: "English", level: "Fluent" },
        { name: "German", level: "B2 course in progress" },
        { name: "Kiswahili", level: "Additional language" },
      ],
    },
    contact: {
      label: "04 / Contact",
      title: "Could I be a fit for your team?",
      description:
        "I’d be glad to hear about an internship or vocational training opportunity. I’m happy to send my CV by email.",
      email: "Write an email",
      subject: "Internship / vocational training – portfolio enquiry",
      copy: "Copy email address",
      copied: "Copied",
      copySuccess: "Email address copied.",
      copyFailure:
        "Copying isn’t available here. Please select and copy the email address directly.",
      location: "Saarlouis, Germany",
      profiles: "Elsewhere",
      print: "Print portfolio",
      printHint:
        "Print view with project details and contact information. You can also save it as a PDF.",
    },
    footer: {
      note: "Ali Abdi · Application development",
      top: "Back to top",
      source: "This portfolio’s source code",
      licenses: "Third-party licenses",
      legal: "Legal notice",
      privacy: "Privacy",
    },
    legal: {
      back: "Back to portfolio",
      legal: {
        title: "Legal notice · Ali Abdi",
        description: "Provider information for Ali Abdi’s portfolio.",
        heading: "Legal notice",
        operator: "Provider information",
        contact: "Contact",
        purpose:
          "This personal portfolio presents my learning projects and my search for an internship or vocational training in application development.",
        privacyLink: "Read the privacy notice",
      },
      privacy: {
        title: "Privacy notice · Ali Abdi",
        description:
          "Information about data processing on Ali Abdi’s portfolio.",
        heading: "Privacy notice",
        intro:
          "This notice describes processing performed by the website itself. It applies only when the site is published with the settings described here.",
        controllerHeading: "Controller",
        controller:
          "The person named in the legal notice is responsible for this website’s content.",
        hostingHeading: "Hosting and server logs",
        hosting:
          "When a website is requested, its hosting provider processes technically necessary connection and request information, such as an IP address and time of request, to deliver the site and maintain security. Before publication, the actual provider, recipients, retention criteria, and any international transfers will be completed from the configuration in use.",
        storageHeading: "Browser storage",
        storage:
          "This website does not use analytics, marketing, or tracking cookies. Only after you change the colour theme yourself does your browser store that choice locally under the key “theme”. The website does not send this preference to its own server; it remains until you change it or clear website data in your browser.",
        emailHeading: "Email",
        email:
          "There is no contact form. An email link opens your own email application. If you send a message, the participating email providers and recipient process the information it contains to handle your enquiry. The retention criteria for the mailbox actually used will be completed before publication.",
        linksHeading: "External links",
        links:
          "Links to GitHub, LinkedIn, and project repositories are ordinary hyperlinks. Each provider’s own privacy notice applies only after you choose to follow a link.",
        rightsHeading: "Your rights",
        rights:
          "Where the GDPR applies, you may, subject to the legal conditions, request access, rectification, erasure, restriction of processing, object to processing, and request data portability. You may withdraw consent for the future where consent was given.",
        complaint:
          "You may also complain to a competent data-protection supervisory authority. The relevant authority in Saarland is the Unabhängige Datenschutzzentrum Saarland.",
        legalLink: "Read the legal notice",
      },
    },
  },
};
