/**
 * Text direction utilities for RTL/LTR language support
 */

import type { InterfaceLanguage } from "../translations";

/**
 * RTL (Right-to-Left) languages
 */
const RTL_LANGUAGES: readonly InterfaceLanguage[] = ["ar", "he"] as const;

/**
 * Language code to BCP 47 language tag mapping
 * Maps interface language codes to proper BCP 47 tags for HTML lang attribute
 */
const LANGUAGE_TAGS: Record<InterfaceLanguage, string> = {
  en: "en",
  uk: "uk",
  tr: "tr",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt",
  ru: "ru",
  zh: "zh",
  ja: "ja",
  ko: "ko",
  ar: "ar",
  hi: "hi",
  it: "it",
  pl: "pl",
  nl: "nl",
  sv: "sv",
  no: "no",
  da: "da",
  fi: "fi",
  cs: "cs",
  hu: "hu",
  ro: "ro",
  el: "el",
  he: "he",
  th: "th",
  vi: "vi",
  id: "id",
  ms: "ms",
};

/**
 * Determine if a language is RTL (Right-to-Left)
 */
export function isRTL(language: InterfaceLanguage): boolean {
  return RTL_LANGUAGES.includes(language);
}

/**
 * Get text direction for a language
 */
export function getTextDirection(language: InterfaceLanguage): "ltr" | "rtl" {
  return isRTL(language) ? "rtl" : "ltr";
}

/**
 * Get BCP 47 language tag for HTML lang attribute
 */
export function getLanguageTag(language: InterfaceLanguage): string {
  return LANGUAGE_TAGS[language];
}

/**
 * Update HTML document attributes for language and direction
 */
export function updateDocumentDirection(language: InterfaceLanguage): void {
  if (typeof document === "undefined") return;

  const html = document.documentElement;
  const direction = getTextDirection(language);
  const lang = getLanguageTag(language);

  html.setAttribute("lang", lang);
  html.setAttribute("dir", direction);

  // Also update body direction for better compatibility
  document.body?.setAttribute("dir", direction);
}
