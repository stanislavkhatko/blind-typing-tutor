import type { InterfaceLanguage } from "../translations/types";
import type { LanguageCode } from "./keyboard";
import type { ContentType } from "../utils/url";

/**
 * Route parameters for the homepage route
 */
export interface HomepageParams {
  interfaceLang: string;
}

/**
 * Route parameters for content pages
 */
export interface ContentPageParams {
  interfaceLang: string;
  studyLang: string;
  learningMode: string;
}

/**
 * Validated route parameters
 */
export interface ValidatedRouteParams {
  interfaceLang: InterfaceLanguage;
  studyLang?: LanguageCode;
  learningMode?: ContentType;
}

/**
 * URL path structure
 */
export interface UrlPath {
  interfaceLang: InterfaceLanguage | null;
  contentType: ContentType | null;
  learningLang: LanguageCode | null;
}
