import type { InterfaceLanguage } from "./translations";
import type { LanguageCode } from "../types/keyboard";

const VALID_LANGUAGES: InterfaceLanguage[] = [
  "en",
  "uk",
  "tr",
  "de",
  "fr",
  "es",
  "pt",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "it",
  "pl",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "cs",
  "hu",
  "ro",
  "el",
  "he",
  "th",
  "vi",
  "id",
  "ms",
];

const VALID_LEARNING_LANGUAGES: LanguageCode[] = [
  "en",
  "uk",
  "tr",
  "de",
  "fr",
  "es",
  "pt",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "it",
  "pl",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "cs",
  "hu",
  "ro",
  "el",
  "he",
  "th",
  "vi",
  "id",
  "ms",
];

const VALID_CONTENT_TYPES = ["words", "phrases", "custom"] as const;
export type ContentType = (typeof VALID_CONTENT_TYPES)[number];

// Legacy function for backward compatibility
export function getLanguageFromUrl(): InterfaceLanguage | null {
  return getInterfaceLanguageFromUrl();
}

export function getInterfaceLanguageFromUrl(): InterfaceLanguage | null {
  if (typeof window === "undefined") return null;
  const path = window.location.pathname.split("/")[1];
  if (path && VALID_LANGUAGES.includes(path as InterfaceLanguage)) {
    return path as InterfaceLanguage;
  }
  return null;
}

export function getLearningLanguageFromUrl(): LanguageCode | null {
  if (typeof window === "undefined") return null;
  const pathParts = window.location.pathname.split("/");
  if (pathParts.length < 3) return null;

  const contentAndLang = pathParts[2];
  const parts = contentAndLang.split("-");
  if (parts.length < 2) return null;

  const learningLang = parts.slice(1).join("-");
  if (VALID_LEARNING_LANGUAGES.includes(learningLang as LanguageCode)) {
    return learningLang as LanguageCode;
  }
  return null;
}

export function getContentTypeFromUrl(): ContentType | null {
  if (typeof window === "undefined") return null;
  const pathParts = window.location.pathname.split("/");
  if (pathParts.length < 3) return null;

  const contentAndLang = pathParts[2];
  const contentType = contentAndLang.split("-")[0];
  if (VALID_CONTENT_TYPES.includes(contentType as ContentType)) {
    return contentType as ContentType;
  }
  return null;
}

export function parseUrlPath(): {
  interfaceLang: InterfaceLanguage | null;
  contentType: ContentType | null;
  learningLang: LanguageCode | null;
} {
  return {
    interfaceLang: getInterfaceLanguageFromUrl(),
    contentType: getContentTypeFromUrl(),
    learningLang: getLearningLanguageFromUrl(),
  };
}

export function buildUrlPath(
  interfaceLang: InterfaceLanguage,
  contentType: ContentType,
  learningLang: LanguageCode
): string {
  return `/${interfaceLang}/${contentType}-${learningLang}`;
}

export function updateUrlWithSettings(
  interfaceLang: InterfaceLanguage,
  contentType: ContentType,
  learningLang: LanguageCode
) {
  if (typeof window === "undefined") return;

  const newPath = buildUrlPath(interfaceLang, contentType, learningLang);

  if (window.location.pathname !== newPath) {
    window.history.pushState(null, "", newPath);
  }
}

// Legacy function for backward compatibility
export function updateUrlLanguage(lang: InterfaceLanguage) {
  if (typeof window === "undefined") return;

  const current = parseUrlPath();
  const contentType = current.contentType || "words";
  const learningLang = current.learningLang || lang;

  updateUrlWithSettings(lang, contentType, learningLang);
}
