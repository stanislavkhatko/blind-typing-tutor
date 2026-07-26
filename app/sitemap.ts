import { MetadataRoute } from "next";
import { INTERFACE_LANGUAGE_OPTIONS, BASE_URL } from "@/config/constants";

// Content types for practice modes
const CONTENT_TYPES = ["words", "phrases", "custom"] as const;

// Popular interface languages get higher priority
const POPULAR_LANGS = ["en", "es", "fr", "de", "pt", "ru", "zh", "ja"];

// Popular cross-language combinations (interfaceLang -> studyLangs)
// These represent the most common language-learning pairings
const POPULAR_CROSS_LANGUAGE: Record<string, string[]> = {
  en: ["es", "fr", "de", "zh", "ja", "ko", "pt", "ru", "ar", "hi", "it", "tr"],
  es: ["en", "pt", "fr", "de", "it"],
  fr: ["en", "es", "de", "it"],
  de: ["en", "fr", "es"],
  pt: ["en", "es"],
  ru: ["en", "de", "fr"],
  zh: ["en"],
  ja: ["en"],
  ko: ["en"],
  tr: ["en", "de"],
  ar: ["en", "fr"],
  hi: ["en"],
  it: ["en", "es", "fr"],
  uk: ["en", "pl"],
  pl: ["en", "de"],
  nl: ["en", "de"],
  sv: ["en", "no", "da"],
  no: ["en", "sv", "da"],
  da: ["en", "sv", "no"],
  fi: ["en", "sv"],
  cs: ["en", "de"],
  hu: ["en", "de"],
  ro: ["en", "it"],
  el: ["en"],
  he: ["en"],
  th: ["en"],
  vi: ["en"],
  id: ["en", "ms"],
  ms: ["en", "id"],
};

function getPriority(
  interfaceLang: string,
  studyLang: string,
  mode: string
): number {
  if (mode === "custom") return 0.5;

  if (interfaceLang === studyLang) {
    return POPULAR_LANGS.includes(interfaceLang) ? 0.9 : 0.8;
  }

  const crossLangs = POPULAR_CROSS_LANGUAGE[interfaceLang] || [];
  if (crossLangs.includes(studyLang)) {
    return 0.7;
  }

  return 0.3;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // 1. All same-language combinations (interfaceLang = studyLang)
  // These are the primary SEO targets
  INTERFACE_LANGUAGE_OPTIONS.forEach((interfaceLang) => {
    CONTENT_TYPES.forEach((mode) => {
      const url = `${BASE_URL}/${interfaceLang.code}/${interfaceLang.code}/${mode}`;

      // hreflang: point to same studyLang, all interface languages
      const languageAlternates: Record<string, string> = {};
      INTERFACE_LANGUAGE_OPTIONS.forEach((lang) => {
        languageAlternates[lang.code] =
          `${BASE_URL}/${lang.code}/${interfaceLang.code}/${mode}`;
      });
      languageAlternates["x-default"] =
        `${BASE_URL}/en/${interfaceLang.code}/${mode}`;

      urls.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: getPriority(interfaceLang.code, interfaceLang.code, mode),
        alternates: {
          languages: languageAlternates,
        },
      });
    });
  });

  // 2. Popular cross-language combinations
  // e.g., English users learning Spanish, French speakers learning English, etc.
  Object.entries(POPULAR_CROSS_LANGUAGE).forEach(([interfaceLang, studyLangs]) => {
    studyLangs.forEach((studyLang) => {
      CONTENT_TYPES.forEach((mode) => {
        const url = `${BASE_URL}/${interfaceLang}/${studyLang}/${mode}`;

        const languageAlternates: Record<string, string> = {};
        INTERFACE_LANGUAGE_OPTIONS.forEach((lang) => {
          languageAlternates[lang.code] =
            `${BASE_URL}/${lang.code}/${studyLang}/${mode}`;
        });
        languageAlternates["x-default"] =
          `${BASE_URL}/en/${studyLang}/${mode}`;

        urls.push({
          url,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: getPriority(interfaceLang, studyLang, mode),
          alternates: {
            languages: languageAlternates,
          },
        });
      });
    });
  });

  return urls;
}
