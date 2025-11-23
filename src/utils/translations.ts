import { type Language } from './Generator';

type Translations = {
  [key in Language]: {
    title: string;
    novice: string;
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
  };
};

export const translations: Translations = {
  en: {
    title: 'Blind Typing Tutor',
    novice: 'Practice',
    beginner: 'Beginner',
    custom: 'Custom',
    pasteText: 'Paste your text here...',
    start: 'Start',
    soundOn: 'Sound On',
    soundOff: 'Sound Off',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    wpm: 'WPM',
    accuracy: 'Accuracy',
    errors: 'Errors',
    toggleKeyboard: 'Toggle Keyboard',
    toggleHands: 'Toggle Hand Hints',
    toggleColors: 'Toggle Color Zones',
    toggleCorrection: 'Correction Mode',
  },
  uk: {
    title: 'Сліпий друк',
    novice: 'Практика',
    beginner: 'Початківець',
    custom: 'Власний',
    pasteText: 'Вставте свій текст тут...',
    start: 'Почати',
    soundOn: 'Звук ВКЛ',
    soundOff: 'Звук ВИКЛ',
    darkMode: 'Темна тема',
    lightMode: 'Світла тема',
    wpm: 'Слів/хв',
    accuracy: 'Точність',
    errors: 'Помилки',
    toggleKeyboard: 'Показати/Сховати клавіатуру',
    toggleHands: 'Показати/Сховати підказки рук',
    toggleColors: 'Показати/Сховати кольорові зони',
    toggleCorrection: 'Режим виправлення',
  },
};
