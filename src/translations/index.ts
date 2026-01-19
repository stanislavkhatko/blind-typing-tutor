// Export types
export type { InterfaceLanguage, TranslationKeys, Translations } from "./types";
export type { LanguageCode } from "../types/keyboard";

// Import all translation files
import { translations as enTranslations } from "./en";
import { translations as ukTranslations } from "./uk";
import { translations as trTranslations } from "./tr";
import { translations as deTranslations } from "./de";
import { translations as frTranslations } from "./fr";
import { translations as esTranslations } from "./es";
import { translations as ptTranslations } from "./pt";
import { translations as ruTranslations } from "./ru";
import { translations as zhTranslations } from "./zh";
import { translations as jaTranslations } from "./ja";
import { translations as koTranslations } from "./ko";
import { translations as arTranslations } from "./ar";
import { translations as hiTranslations } from "./hi";
import { translations as itTranslations } from "./it";
import { translations as plTranslations } from "./pl";
import { translations as nlTranslations } from "./nl";
import { translations as svTranslations } from "./sv";
import { translations as noTranslations } from "./no";
import { translations as daTranslations } from "./da";
import { translations as fiTranslations } from "./fi";
import { translations as csTranslations } from "./cs";
import { translations as huTranslations } from "./hu";
import { translations as roTranslations } from "./ro";
import { translations as elTranslations } from "./el";
import { translations as heTranslations } from "./he";
import { translations as thTranslations } from "./th";
import { translations as viTranslations } from "./vi";
import { translations as idTranslations } from "./id";
import { translations as msTranslations } from "./ms";

import type { Translations } from "./types";
// Combine all translations - TypeScript will ensure all languages are present
export const translations: Translations = {
  en: enTranslations,
  uk: ukTranslations,
  tr: trTranslations,
  de: deTranslations,
  fr: frTranslations,
  es: esTranslations,
  pt: ptTranslations,
  ru: ruTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  ko: koTranslations,
  ar: arTranslations,
  hi: hiTranslations,
  it: itTranslations,
  pl: plTranslations,
  nl: nlTranslations,
  sv: svTranslations,
  no: noTranslations,
  da: daTranslations,
  fi: fiTranslations,
  cs: csTranslations,
  hu: huTranslations,
  ro: roTranslations,
  el: elTranslations,
  he: heTranslations,
  th: thTranslations,
  vi: viTranslations,
  id: idTranslations,
  ms: msTranslations,
};


