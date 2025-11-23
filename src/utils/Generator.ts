import { words as ukWords } from './words_uk';
import { words as enWords } from './words_en';

export type Language = 'uk' | 'en';

export class Generator {
  private words: string[] = [];
  private allWords: string[];
  private number: number;

  constructor(lang: Language = 'uk', number: number = 8) {
    this.allWords = lang === 'uk' ? ukWords : enWords;
    this.number = number;
    this.update();
  }

  private rand(low: number, high: number) {
    return Math.floor((high - low + 1) * Math.random()) + Math.floor(low);
  }

  public update() {
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
    return this.shuffle(this.words).join(' ');
  }

  public getOne() {
    const word = this.allWords[this.rand(0, this.allWords.length - 1)];
    return Array(this.number).fill(word).join(' ');
  }
}
