/**
 * Keyboard layout type definitions
 * Supports multiple keyboard layouts with extensible architecture
 */

export type KeyboardLayoutId =
  | 'en-us' | 'en-gb'  // English
  | 'de-de' | 'de-ch'  // German
  | 'fr-fr' | 'fr-be'  // French
  | 'es-es' | 'es-mx'  // Spanish
  | 'pt-pt' | 'pt-br'  // Portuguese
  | 'it-it'            // Italian
  | 'nl-nl'            // Dutch
  | 'sv-se'            // Swedish
  | 'fi-fi'            // Finnish
  | 'no-no'            // Norwegian
  | 'da-dk'            // Danish
  | 'pl-pl'            // Polish
  | 'cs-cz'            // Czech
  | 'hu-hu'            // Hungarian
  | 'ro-ro'            // Romanian
  | 'el-gr'            // Greek
  | 'he-il'            // Hebrew
  | 'ru-ru'            // Russian
  | 'uk-ua'            // Ukrainian
  | 'tr-q' | 'tr-f'    // Turkish
  | 'ja-jp'            // Japanese (Romaji)
  | 'ko-kr'            // Korean (Hangul)
  | 'zh-cn'            // Chinese (Pinyin)
  | 'ar-sa'            // Arabic
  | 'hi-in';           // Hindi

export type LanguageCode =
  | 'en' | 'de' | 'fr' | 'es' | 'pt' | 'it' | 'nl' | 'sv' | 'fi' | 'no' | 'da'
  | 'pl' | 'cs' | 'hu' | 'ro' | 'el' | 'he' | 'ru' | 'uk' | 'tr' | 'ja' | 'ko'
  | 'zh' | 'ar' | 'hi' | 'th' | 'vi' | 'id' | 'ms';

/**
 * Defines a single key on the keyboard
 */
export interface KeyDefinition {
  id: string;           // Unique key identifier (e.g., 'q', 'comma', 'shift-l')
  primary: string;      // Primary character for this key
  shifted?: string;     // Character when Shift is pressed (optional)
  altGr?: string;       // Character when AltGr is pressed (optional, for layouts that use it)
  group?: number;       // Finger zone group (1-8)
  width?: 'normal' | 'tab' | 'caps' | 'enter' | 'shift' | 'space';
}

/**
 * Complete keyboard layout definition
 */
export interface KeyboardLayout {
  id: KeyboardLayoutId;
  name: string;         // Display name (e.g., "English (US)", "Türkçe Q")
  language: LanguageCode;
  flag: string;         // Emoji flag for UI
  keys: KeyDefinition[];
  leftHandKeys: string[]; // Array of primary characters typed with left hand
}

/**
 * Metadata for layout selection UI
 */
export interface LayoutMetadata {
  id: KeyboardLayoutId;
  name: string;
  language: LanguageCode;
  flag: string;
  description?: string;
}
