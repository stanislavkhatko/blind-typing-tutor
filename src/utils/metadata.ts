import type { Metadata } from "next";
import type { LanguageCode } from "../types/keyboard";
import type { ContentType } from "./url";
import type { InterfaceLanguage } from "../translations";
import { translations } from "../translations";
import { buildUrlPath } from "./url";
import {
  validateInterfaceLanguage,
  BASE_URL,
  INTERFACE_LANGUAGE_OPTIONS,
} from "../config/constants";

const DEFAULT_TITLE = "Blind Typing Tutor - Master Touch Typing Online";
const DEFAULT_DESCRIPTION = "Master touch typing with our free online blind typing tutor.";
const OG_IMAGE = "/og-image.png";

interface MetadataOptions {
  interfaceLang: string;
  studyLang?: string;
  learningMode?: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

/**
 * Generate hreflang alternates for all interface languages
 * This helps SEO scanners understand language versions of the page
 */
function generateHreflangAlternates(
  currentLang: string,
  studyLang?: string,
  learningMode?: string
): Record<string, string> {
  const alternates: Record<string, string> = {};

  INTERFACE_LANGUAGE_OPTIONS.forEach((lang) => {
    let url = `${BASE_URL}/${lang.code}`;
    if (studyLang && learningMode) {
      // For content pages, maintain the same studyLang and learningMode
      url = `${BASE_URL}${buildUrlPath(
        lang.code as InterfaceLanguage,
        learningMode as ContentType,
        studyLang as LanguageCode
      )}`;
    }
    alternates[lang.code] = url;
  });

  // Add x-default pointing to English version
  let defaultUrl = `${BASE_URL}/en`;
  if (studyLang && learningMode) {
    defaultUrl = `${BASE_URL}${buildUrlPath(
      "en",
      learningMode as ContentType,
      studyLang as LanguageCode
    )}`;
  }
  alternates["x-default"] = defaultUrl;

  return alternates;
}

/**
 * Generate Next.js Metadata for a route
 * Consolidates metadata generation logic used across different page types
 * Includes proper hreflang tags for SEO scanners
 */
export function generatePageMetadata(options: MetadataOptions): Metadata {
  const { interfaceLang, studyLang, learningMode, robots } = options;

  // Validate interface language
  const validatedInterfaceLang = validateInterfaceLanguage(interfaceLang);

  // Get translations
  const t = translations[validatedInterfaceLang];
  const title = t.seoTitle || t.title || DEFAULT_TITLE;
  const description = t.seoDescription || t.metaDescription || DEFAULT_DESCRIPTION;
  const keywords = t.seoKeywords || t.seoDescription || "";

  // Build canonical URL
  let canonical = BASE_URL;
  if (studyLang && learningMode) {
    canonical = `${BASE_URL}${buildUrlPath(
      validatedInterfaceLang,
      learningMode as ContentType,
      studyLang as LanguageCode
    )}`;
  } else {
    canonical = `${BASE_URL}/${validatedInterfaceLang}`;
  }

  // Generate hreflang alternates for SEO
  const hreflangAlternates = generateHreflangAlternates(
    validatedInterfaceLang,
    studyLang,
    learningMode
  );

  return {
    title,
    description,
    keywords,
    robots: robots || {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [OG_IMAGE],
      type: "website",
      locale: validatedInterfaceLang,
      alternateLocale: Object.keys(hreflangAlternates).filter(
        (lang) => lang !== validatedInterfaceLang && lang !== "x-default"
      ),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

// Legacy interface for backward compatibility
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
 * Generate metadata for a route based on its parameters (legacy format)
 * @deprecated Use generatePageMetadata instead
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
  const validatedInterfaceLang = validateInterfaceLanguage(interfaceLang);

  // Use base SEO metadata (no content-type specific variations)
  const t = translations[validatedInterfaceLang];
  const title = t.seoTitle || t.title || DEFAULT_TITLE;
  const description = t.seoDescription || t.metaDescription || DEFAULT_DESCRIPTION;
  const keywords = t.seoKeywords || t.seoDescription || "";

  // Build canonical URL
  let canonical = BASE_URL;

  if (learningLang && contentType) {
    canonical = `${BASE_URL}${buildUrlPath(
      validatedInterfaceLang,
      contentType,
      learningLang
    )}`;
  } else if (validatedInterfaceLang !== "en") {
    canonical = `${BASE_URL}/${validatedInterfaceLang}`;
  }

  return {
    title,
    description,
    keywords,
    canonical,
    ogImage: OG_IMAGE,
  };
}
