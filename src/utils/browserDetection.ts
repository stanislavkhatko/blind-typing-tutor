/**
 * Browser language detection utilities
 * Provides functions to detect user's preferred language from browser settings
 */

/**
 * Language mapping configuration
 */
interface LanguageMapping {
  [prefix: string]: string;
  default: string;
}

/**
 * Detect a value from browser language using prefix matching
 * @param mappings Object mapping language prefixes to values, with 'default' as fallback
 * @returns The matched value or default
 */
export function detectFromBrowserLanguage(mappings: LanguageMapping): string {
  const browserLang = navigator.language.toLowerCase();
  
  // Sort keys by length (longest first) to match more specific prefixes first
  const sortedPrefixes = Object.keys(mappings)
    .filter(key => key !== 'default')
    .sort((a, b) => b.length - a.length);
  
  for (const prefix of sortedPrefixes) {
    if (browserLang.startsWith(prefix)) {
      return mappings[prefix];
    }
  }
  
  return mappings.default || '';
}

/**
 * Detect keyboard layout from browser language
 */
export function detectKeyboardLayout(): string {
  return detectFromBrowserLanguage({
    'en-gb': 'en-gb',
    'uk': 'uk-ua',
    'tr': 'tr-q',
    'de': 'de-de',
    'fr': 'fr-fr',
    'es': 'es-es',
    'pt': 'pt-pt',
    'ru': 'ru-ru',
    'it': 'it-it',
    'nl': 'nl-nl',
    'sv': 'sv-se',
    'fi': 'fi-fi',
    'no': 'no-no',
    'da': 'da-dk',
    'pl': 'pl-pl',
    'cs': 'cs-cz',
    'hu': 'hu-hu',
    'ro': 'ro-ro',
    'el': 'el-gr',
    'he': 'he-il',
    'ja': 'ja-jp',
    'ko': 'ko-kr',
    'zh': 'zh-cn',
    'ar': 'ar-sa',
    'hi': 'hi-in',
    default: 'en-us',
  });
}

/**
 * Detect learning language from browser language
 */
export function detectLearningLanguage(): string {
  return detectFromBrowserLanguage({
    'uk': 'uk',
    'tr': 'tr',
    'de': 'de',
    'fr': 'fr',
    'es': 'es',
    'pt': 'pt',
    'ru': 'ru',
    default: 'en',
  });
}

/**
 * Detect interface language from browser language
 */
export function detectInterfaceLanguage(): string {
  return detectFromBrowserLanguage({
    'uk': 'uk',
    'tr': 'tr',
    'de': 'de',
    'fr': 'fr',
    'es': 'es',
    'pt': 'pt',
    'ru': 'ru',
    'zh': 'zh',
    'ja': 'ja',
    'ko': 'ko',
    'ar': 'ar',
    'hi': 'hi',
    'it': 'it',
    'pl': 'pl',
    'nl': 'nl',
    'sv': 'sv',
    'no': 'no',
    'da': 'da',
    'fi': 'fi',
    'cs': 'cs',
    'hu': 'hu',
    'ro': 'ro',
    'el': 'el',
    'he': 'he',
    'th': 'th',
    'vi': 'vi',
    'id': 'id',
    'ms': 'ms',
    default: 'en',
  });
}

