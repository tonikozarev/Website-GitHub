export interface LanguageObject {
  title: {
    en: string;
    de: string;
  };
  content: {
    [key: string]: {
      en: string;
      de: string;
    };
  };
}

export interface Languages {
  home: LanguageObject;
  projects: LanguageObject;
  technologies: LanguageObject;
  socials: LanguageObject;
}

export const languages: Languages = {
  home: {
    title: {
      en: "Home",
      de: "Startseite",
    },
    content: {},
  },
  projects: {
    title: {
      en: "Projects",
      de: "Projekte",
    },
    content: {
      all: {
        en: "All",
        de: "Alle"
      },
      source: {
        en: "Source",
        de: "Quellenangabe"
      }
    },
  },
  technologies: {
    title: {
      en: "Technologies",
      de: "Technologien",
    },
    content: {
      os: {
        en: "OS",
        de: "Betriebssysteme"
      },
      ide: {
        en: "IDEs / Game engines / Editors",
        de: "IDE-Umgebungen / Spiel-Engine / Quelltext-Editor"
      },
      programming_language: {
        en: "Languages",
        de: "Programmiersprachen"
      },
      other: {
        en: "Other technologies",
        de: "Andere Technologien"
      }
    },
  },
  socials: {
    title: {
      en: "Contact",
      de: "Kontakt",
    },
    content: {
      email: {
        en: "Email:",
        de: "E-Mail-Adresse:"
      }
    },
  },
};