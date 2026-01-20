import { words as ukWords } from '../words/words_uk';
import { words as enWords } from '../words/words_en';
import { words as trWords } from '../words/words_tr';
import { words as deWords } from '../words/words_de';
import { words as frWords } from '../words/words_fr';
import { words as esWords } from '../words/words_es';
import { words as ptWords } from '../words/words_pt';
import { words as ruWords } from '../words/words_ru';
import { words as itWords } from '../words/words_it';
import { words as plWords } from '../words/words_pl';
import { words as nlWords } from '../words/words_nl';
import { words as svWords } from '../words/words_sv';
import { words as noWords } from '../words/words_no';
import { words as daWords } from '../words/words_da';
import { words as fiWords } from '../words/words_fi';
import { words as csWords } from '../words/words_cs';
import { words as huWords } from '../words/words_hu';
import { words as roWords } from '../words/words_ro';
import { words as elWords } from '../words/words_el';
import { words as heWords } from '../words/words_he';
import { words as jaWords } from '../words/words_ja';
import { words as koWords } from '../words/words_ko';
import { words as zhWords } from '../words/words_zh';
import { words as arWords } from '../words/words_ar';
import { words as hiWords } from '../words/words_hi';
import { words as thWords } from '../words/words_th';
import { words as viWords } from '../words/words_vi';
import { words as idWords } from '../words/words_id';
import { words as msWords } from '../words/words_ms';
import type { LanguageCode } from '../types/keyboard';

export type Language = LanguageCode;

/**
 * Registry mapping language codes to their word lists
 * This replaces the switch statement pattern for better maintainability
 */
const LANGUAGE_WORDS_REGISTRY: Record<LanguageCode, () => string[]> = {
  'en': () => enWords,
  'uk': () => ukWords,
  'tr': () => trWords,
  'de': () => deWords,
  'fr': () => frWords,
  'es': () => esWords,
  'pt': () => ptWords,
  'ru': () => ruWords,
  'it': () => itWords,
  'pl': () => plWords,
  'nl': () => nlWords,
  'sv': () => svWords,
  'no': () => noWords,
  'da': () => daWords,
  'fi': () => fiWords,
  'cs': () => csWords,
  'hu': () => huWords,
  'ro': () => roWords,
  'el': () => elWords,
  'he': () => heWords,
  'ja': () => jaWords,
  'ko': () => koWords,
  'zh': () => zhWords,
  'ar': () => arWords,
  'hi': () => hiWords,
  'th': () => thWords,
  'vi': () => viWords,
  'id': () => idWords,
  'ms': () => msWords,
};

export class Generator {
  private words: string[] = [];
  private allWords: string[];
  private number: number;
  private language: Language;

  constructor(lang: Language = 'en', number: number = 8) {
    this.language = lang;
    this.allWords = this.getWordsForLanguage(lang);

    // Validate that we have words to work with
    if (this.allWords.length === 0) {
      console.error(`No words found for language: ${lang}. Falling back to English.`);
      this.allWords = this.getWordsForLanguage('en');
      this.language = 'en';
    }

    this.number = number;
    this.update();
  }

  private getWordsForLanguage(lang: Language): string[] {
    const getter = LANGUAGE_WORDS_REGISTRY[lang];
    if (!getter) {
      console.error(`No word list registered for language: ${lang}. Falling back to English.`);
      return LANGUAGE_WORDS_REGISTRY['en']();
    }
    return getter();
  }

  private rand(low: number, high: number) {
    return Math.floor((high - low + 1) * Math.random()) + Math.floor(low);
  }

  public update() {
    if (this.allWords.length === 0) {
      console.error('Cannot update: word list is empty');
      this.words = [];
      return;
    }

    const output: string[] = [];
    for (let i = 0; i < this.number; i++) {
      output.push(this.allWords[this.rand(0, this.allWords.length - 1)]);
    }
    this.words = output;
  }

  private shuffle(array: string[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  public getWords() {
    if (this.words.length === 0) {
      console.error('Cannot get words: word list is empty. Attempting to update...');
      this.update();
      if (this.words.length === 0) {
        return '';
      }
    }
    return this.shuffle(this.words).join(' ');
  }

  public getOne() {
    if (this.allWords.length === 0) {
      console.error('Cannot get word: word list is empty');
      return '';
    }
    const word = this.allWords[this.rand(0, this.allWords.length - 1)];
    return Array(this.number).fill(word).join(' ');
  }

  public getLanguage() {
    return this.language;
  }
}

