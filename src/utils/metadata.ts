import type { InterfaceLanguage } from "../translations";
import type { LanguageCode } from "../types/keyboard";
import type { ContentType } from "./url";
import { translations } from "../translations";
import { buildUrlPath } from "./url";

export interface RouteMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export interface RouteParams {
  interfaceLang?: string;
  contentTypeAndLang?: string;
}

/**
 * Generate metadata for a route based on its parameters
 * Similar to Next.js generateMetadata function
 */
export function generateMetadata(params: RouteParams): RouteMetadata {
  const { interfaceLang, contentTypeAndLang } = params;

  // Parse contentTypeAndLang (e.g., "words-es" -> { contentType: "words", learningLang: "es" })
  let contentType: ContentType | undefined;
  let learningLang: LanguageCode | undefined;

  if (contentTypeAndLang) {
    const parts = contentTypeAndLang.split("-");
    if (parts.length >= 2) {
      contentType = parts[0] as ContentType;
      learningLang = parts.slice(1).join("-") as LanguageCode;
    }
  }

  // Validate interface language
  const validInterfaceLangs: InterfaceLanguage[] = [
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

  const validatedInterfaceLang: InterfaceLanguage =
    interfaceLang &&
      validInterfaceLangs.includes(interfaceLang as InterfaceLanguage)
      ? (interfaceLang as InterfaceLanguage)
      : "en";

  // Use base SEO metadata (no content-type specific variations)
  const t = translations[validatedInterfaceLang];
  const title = t.seoTitle || t.title;
  const description = t.seoDescription || t.metaDescription;
  const keywords = t.seoKeywords || t.seoDescription || "";

  // Build canonical URL
  const baseUrl = "https://blind-typing-tutor.wordmemo.net";
  let canonical = baseUrl;

  if (learningLang && contentType) {
    canonical = `${baseUrl}${buildUrlPath(
      validatedInterfaceLang,
      contentType,
      learningLang
    )}`;
  } else if (validatedInterfaceLang !== "en") {
    canonical = `${baseUrl}/${validatedInterfaceLang}`;
  }

  return {
    title: title || "Blind Typing Tutor - Master Touch Typing Online",
    description:
      description ||
      "Master touch typing with our free online blind typing tutor.",
    keywords,
    canonical,
    ogImage: "/og-image.png",
  };
}

