import { MetadataRoute } from "next";
import { INTERFACE_LANGUAGE_OPTIONS } from "@/config/constants";

const BASE_URL = "https://blind-typing-tutor.wordmemo.net";

// Popular interface languages get higher priority
const POPULAR_LANGS = ["es", "fr", "de", "pt", "ru", "zh", "ja"];

function getPriority(interfaceLang: string): number {
  // English interface gets highest priority
  if (interfaceLang === "en") {
    return 1.0;
  }
  // Popular interface languages get higher priority
  if (POPULAR_LANGS.includes(interfaceLang)) {
    return 0.9;
  }
  return 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Build language alternates map for all languages
  const languageAlternates: Record<string, string> = {};
  INTERFACE_LANGUAGE_OPTIONS.forEach((lang) => {
    languageAlternates[lang.code] = `${BASE_URL}/${lang.code}`;
  });
  // Add x-default pointing to English
  languageAlternates["x-default"] = `${BASE_URL}/en`;

  const urls: MetadataRoute.Sitemap = INTERFACE_LANGUAGE_OPTIONS.map((lang) => {
    const url = `${BASE_URL}/${lang.code}`;
    return {
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: getPriority(lang.code),
      alternates: {
        languages: languageAlternates,
      },
    };
  });

  return urls;
}
