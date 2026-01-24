import { MetadataRoute } from "next";
import { INTERFACE_LANGUAGE_OPTIONS, BASE_URL } from "@/config/constants";

// Popular interface languages get higher priority
const POPULAR_LANGS = ["es", "fr", "de", "pt", "ru", "zh", "ja"];

// Content types for practice modes
const CONTENT_TYPES = ["words", "phrases", "custom"] as const;

function getPriority(
  interfaceLang: string,
  studyLang: string,
  mode: string
): number {
  // English interface with English study gets highest priority
  if (interfaceLang === "en" && studyLang === "en" && mode !== "custom") {
    return 1.0;
  }

  // Same-language practice (popular languages)
  if (
    interfaceLang === studyLang &&
    POPULAR_LANGS.includes(interfaceLang) &&
    mode !== "custom"
  ) {
    return 0.9;
  }

  // Same-language practice (other languages)
  if (interfaceLang === studyLang && mode !== "custom") {
    return 0.8;
  }

  // Cross-language practice
  if (interfaceLang !== studyLang && mode !== "custom") {
    return 0.7;
  }

  // Custom mode (lower priority)
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Generate URLs for all language and mode combinations
  INTERFACE_LANGUAGE_OPTIONS.forEach((interfaceLang) => {
    INTERFACE_LANGUAGE_OPTIONS.forEach((studyLang) => {
      CONTENT_TYPES.forEach((mode) => {
        const url = `${BASE_URL}/${interfaceLang.code}/${studyLang.code}/${mode}`;

        // Build language alternates for this specific mode
        const languageAlternates: Record<string, string> = {};
        INTERFACE_LANGUAGE_OPTIONS.forEach((lang) => {
          languageAlternates[lang.code] =
            `${BASE_URL}/${lang.code}/${studyLang.code}/${mode}`;
        });
        // Add x-default pointing to English interface
        languageAlternates["x-default"] =
          `${BASE_URL}/en/${studyLang.code}/${mode}`;

        urls.push({
          url,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: getPriority(interfaceLang.code, studyLang.code, mode),
          alternates: {
            languages: languageAlternates,
          },
        });
      });
    });
  });

  return urls;
}
