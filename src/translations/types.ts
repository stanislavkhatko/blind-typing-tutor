import type { LanguageCode } from "../types/keyboard";

export type InterfaceLanguage =
  | "en"
  | "uk"
  | "tr"
  | "de"
  | "fr"
  | "es"
  | "pt"
  | "ru"
  | "zh"
  | "ja"
  | "ko"
  | "ar"
  | "hi"
  | "it"
  | "pl"
  | "nl"
  | "sv"
  | "no"
  | "da"
  | "fi"
  | "cs"
  | "hu"
  | "ro"
  | "el"
  | "he"
  | "th"
  | "vi"
  | "id"
  | "ms";

// Base translation keys type - ensures all keys are present
export type TranslationKeys = {
  title: string;
  practice: string;
  beginner: string;
  custom: string;
  pasteText: string;
  start: string;
  soundOn: string;
  soundOff: string;
  darkMode: string;
  lightMode: string;
  wpm: string;
  accuracy: string;
  errors: string;
  toggleKeyboard: string;
  toggleHands: string;
  toggleColors: string;
  toggleCorrection: string;
  learningMode: string;
  learningLanguage: string;
  interfaceLanguage: string;
  words: string;
  phrases: string;
  programming: string;
  support: string;
  supportTitle: string;
  reportIssue: string;
  reportIssueTitle: string;
  metaDescription: string;
  cancel: string;
  selectKeyboardLayout: string;
  seoTitle: string; // SEO-optimized title with primary keywords
  seoDescription: string; // SEO-optimized description with primary keywords
  seoKeywords: string; // SEO-optimized keywords with primary keywords
  seoTitleWords: string; // Page-specific title for Words mode (includes {lang} placeholder)
  seoTitlePhrases: string; // Page-specific title for Phrases mode (includes {lang} placeholder)
  seoTitleCustom: string; // Page-specific title for Custom mode (includes {lang} placeholder)
  seoDescriptionWords: string; // Page-specific description for Words mode (includes {lang} placeholder)
  seoDescriptionPhrases: string; // Page-specific description for Phrases mode (includes {lang} placeholder)
  seoDescriptionCustom: string; // Page-specific description for Custom mode (includes {lang} placeholder)
  mobileDesktopRequired: string;
  mobileDescription: string;
  mobileFooter: string;
  languageNames: Record<LanguageCode, string>; // Must include all language codes
};

// Main translations type - ensures all interface languages are present
export type Translations = {
  [key in InterfaceLanguage]: TranslationKeys;
};
