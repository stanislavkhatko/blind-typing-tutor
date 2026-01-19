import type { InterfaceLanguage } from "../translations";
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
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // New structure: /{interfaceLang}/{studyLang}/{learningMode}
  if (pathParts.length >= 2) {
    const studyLang = pathParts[1];
    if (VALID_LEARNING_LANGUAGES.includes(studyLang as LanguageCode)) {
      return studyLang as LanguageCode;
    }
  }

  // Legacy structure: /{interfaceLang}/{contentType}-{learningLang}
  if (pathParts.length >= 2) {
    const contentAndLang = pathParts[1];
    if (contentAndLang === "custom") return null;

    const parts = contentAndLang.split("-");
    if (parts.length >= 2) {
      const learningLang = parts.slice(1).join("-");
      if (VALID_LEARNING_LANGUAGES.includes(learningLang as LanguageCode)) {
        return learningLang as LanguageCode;
      }
    }
  }

  return null;
}

export function getContentTypeFromUrl(): ContentType | null {
  if (typeof window === "undefined") return null;
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // New structure: /{interfaceLang}/{studyLang}/{learningMode}
  if (pathParts.length >= 3) {
    const learningMode = pathParts[2];
    if (learningMode === "custom") {
      return "custom";
    }
    if (VALID_CONTENT_TYPES.includes(learningMode as ContentType)) {
      return learningMode as ContentType;
    }
  }

  // Legacy structure: /{interfaceLang}/{contentType}-{learningLang} or /{interfaceLang}/custom
  if (pathParts.length >= 2) {
    const contentAndLang = pathParts[1];
    if (contentAndLang === "custom") {
      return "custom";
    }
    const contentType = contentAndLang.split("-")[0];
    if (VALID_CONTENT_TYPES.includes(contentType as ContentType)) {
      return contentType as ContentType;
    }
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
  // New structure: /{interfaceLang}/{studyLang}/{learningMode}
  return `/${interfaceLang}/${learningLang}/${contentType}`;
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
