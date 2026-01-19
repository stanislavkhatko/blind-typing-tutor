import { type Language } from './Generator';

// Lazy loading wrapper for word lists
export async function loadWords(language: Language): Promise<string[]> {
  switch (language) {
    case 'uk': return (await import('../words/words_uk')).words;
    case 'tr': return (await import('../words/words_tr')).words;
    case 'de': return (await import('../words/words_de')).words;
    case 'fr': return (await import('../words/words_fr')).words;
    case 'es': return (await import('../words/words_es')).words;
    case 'pt': return (await import('../words/words_pt')).words;
    case 'ru': return (await import('../words/words_ru')).words;
    case 'it': return (await import('../words/words_it')).words;
    case 'pl': return (await import('../words/words_pl')).words;
    case 'nl': return (await import('../words/words_nl')).words;
    case 'sv': return (await import('../words/words_sv')).words;
    case 'no': return (await import('../words/words_no')).words;
    case 'da': return (await import('../words/words_da')).words;
    case 'fi': return (await import('../words/words_fi')).words;
    case 'cs': return (await import('../words/words_cs')).words;
    case 'hu': return (await import('../words/words_hu')).words;
    case 'ro': return (await import('../words/words_ro')).words;
    case 'el': return (await import('../words/words_el')).words;
    case 'he': return (await import('../words/words_he')).words;
    case 'ja': return (await import('../words/words_ja')).words;
    case 'ko': return (await import('../words/words_ko')).words;
    case 'zh': return (await import('../words/words_zh')).words;
    case 'ar': return (await import('../words/words_ar')).words;
    case 'hi': return (await import('../words/words_hi')).words;
    case 'th': return (await import('../words/words_th')).words;
    case 'vi': return (await import('../words/words_vi')).words;
    case 'id': return (await import('../words/words_id')).words;
    case 'ms': return (await import('../words/words_ms')).words;
    case 'en':
    default:
      return (await import('../words/words_en')).words;
  }
}
