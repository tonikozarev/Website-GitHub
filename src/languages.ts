export type LanguageCode = "en" | "de" | "bg";

export interface TranslatedText {
  en: string;
  de: string;
  bg: string;
}

export interface LanguageObject {
  title: TranslatedText;
  content: {
    [key: string]: TranslatedText;
  };
}

export interface Languages {
  home: LanguageObject;
  projects: LanguageObject;
  certifications: LanguageObject;
  technologies: LanguageObject;
  socials: LanguageObject;
}

export function getSelectedLanguage(): LanguageCode {
  if (window.selectedLanguage === "de" || window.selectedLanguage === "bg") {
    return window.selectedLanguage;
  }

  return "en";
}

export function translate(text: TranslatedText): string {
  return text[getSelectedLanguage()];
}

export const languages: Languages = {
  home: {
    title: {
      en: "Home",
      de: "Startseite",
      bg: "Начало",
    },
    content: {},
  },
  projects: {
    title: {
      en: "Projects",
      de: "Projekte",
      bg: "Проекти",
    },
    content: {
      all: {
        en: "All",
        de: "Alle",
        bg: "Всички",
      },
      source: {
        en: "Source",
        de: "Quellenangabe",
        bg: "Код",
      },
    },
  },
  certifications: {
    title: {
      en: "Certifications",
      de: "Zertifikate",
      bg: "Сертификати",
    },
    content: {
      filter: {
        en: "Filter by language",
        de: "Nach Sprache filtern",
        bg: "Филтър по език",
      },
      all: {
        en: "All",
        de: "Alle",
        bg: "Всички",
      },
      english: {
        en: "English",
        de: "Englisch",
        bg: "Английски",
      },
      german: {
        en: "German",
        de: "Deutsch",
        bg: "Немски",
      },
      bulgarian: {
        en: "Bulgarian",
        de: "Bulgarisch",
        bg: "Български",
      },
      select: {
        en: "Select a certificate",
        de: "Zertifikat auswählen",
        bg: "Избери сертификат",
      },
      preview: {
        en: "Preview",
        de: "Vorschau",
        bg: "Преглед",
      },
      gate_title: {
        en: "Private certificates",
        de: "Private Zertifikate",
        bg: "Лични сертификати",
      },
      gate_text: {
        en: "Enter your code to unlock the certificates.",
        de: "Gib deinen Code ein, um die Zertifikate freizuschalten.",
        bg: "Въведи кода, за да отключиш сертификатите.",
      },
      code_label: {
        en: "Code",
        de: "Code",
        bg: "Код",
      },
      unlock: {
        en: "Unlock",
        de: "Entsperren",
        bg: "Отключи",
      },
      lock: {
        en: "Lock",
        de: "Sperren",
        bg: "Заключи",
      },
      unlocked: {
        en: "Unlocked",
        de: "Freigeschaltet",
        bg: "Отключено",
      },
      locked: {
        en: "Locked",
        de: "Gesperrt",
        bg: "Заключено",
      },
      unlock_error: {
        en: "That code did not unlock the certificates.",
        de: "Dieser Code konnte die Zertifikate nicht freischalten.",
        bg: "Този код не отключи сертификатите.",
      },
      unlock_success: {
        en: "Access granted.",
        de: "Zugriff gewährt.",
        bg: "Достъпът е разрешен.",
      },
      empty: {
        en: "No certificates match this filter.",
        de: "Keine Zertifikate passen zu diesem Filter.",
        bg: "Няма сертификати за този филтър.",
      },
    },
  },
  technologies: {
    title: {
      en: "Technologies",
      de: "Technologien",
      bg: "Технологии",
    },
    content: {
      os: {
        en: "OS",
        de: "Betriebssysteme",
        bg: "Операционни системи",
      },
      ide: {
        en: "IDEs / Game engines / Editors",
        de: "IDE-Umgebungen / Spiel-Engine / Quelltext-Editor",
        bg: "IDE среди / игрови енджини / редактори",
      },
      programming_language: {
        en: "Languages",
        de: "Programmiersprachen",
        bg: "Езици за програмиране",
      },
      other: {
        en: "Other technologies",
        de: "Andere Technologien",
        bg: "Други технологии",
      },
    },
  },
  socials: {
    title: {
      en: "Contact",
      de: "Kontakt",
      bg: "Контакт",
    },
    content: {},
  },
};
