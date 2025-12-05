import { words as ukWords } from './words_uk';
import { words as enWords } from './words_en';
import { words as trWords } from './words_tr';
import { words as deWords } from './words_de';
import { words as frWords } from './words_fr';
import { words as esWords } from './words_es';
import { words as ptWords } from './words_pt';
import { words as ruWords } from './words_ru';
import type { LanguageCode } from '../types/keyboard';

export type Language = LanguageCode;

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
    switch (lang) {
      case 'uk':
        return ukWords;
      case 'tr':
        return trWords;
      case 'de':
        return deWords;
      case 'fr':
        return frWords;
      case 'es':
        return esWords;
      case 'pt':
        return ptWords;
      case 'ru':
        return ruWords;
      case 'en':
      default:
        return enWords;
    }
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

