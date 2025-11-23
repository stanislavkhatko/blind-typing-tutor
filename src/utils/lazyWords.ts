import { type Language } from './Generator';

// Lazy loading wrapper for word lists
export async function loadWords(language: Language): Promise<string[]> {
  if (language === 'uk') {
    const module = await import('./words_uk');
    return module.words;
  } else {
    const module = await import('./words_en');
    return module.words;
  }
}
