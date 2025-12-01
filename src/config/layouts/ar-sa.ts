import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Arabic QWERTY keyboard layout
 * Standard layout used in Arabic-speaking countries
 */
export const arSaLayout: KeyboardLayout = {
  id: 'ar-sa',
  name: 'العربية',
  language: 'ar',
  flag: '🇸🇦',
  leftHandKeys: ['ض', 'ص', 'ث', 'ق', 'ف', 'ش', 'س', 'ي', 'ب', 'ل'],
  keys: [
    // Row 1 - Number row
    { id: 'backtick', primary: '`', shifted: '~', group: 1 },
    { id: '1', primary: '1', shifted: '!', group: 1 },
    { id: '2', primary: '2', shifted: '@', group: 1 },
    { id: '3', primary: '3', shifted: '#', group: 2 },
    { id: '4', primary: '4', shifted: '$', group: 3 },
    { id: '5', primary: '5', shifted: '%', group: 4 },
    { id: '6', primary: '6', shifted: '^', group: 4 },
    { id: '7', primary: '7', shifted: '&', group: 5 },
    { id: '8', primary: '8', shifted: '*', group: 5 },
    { id: '9', primary: '9', shifted: '(', group: 6 },
    { id: '0', primary: '0', shifted: ')', group: 7 },
    { id: 'underscore', primary: '-', shifted: '_', group: 8 },
    { id: 'equal', primary: '=', shifted: '+', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'ض', shifted: 'َ', group: 1 },
    { id: 'w', primary: 'ص', shifted: 'ً', group: 2 },
    { id: 'e', primary: 'ث', shifted: 'ُ', group: 3 },
    { id: 'r', primary: 'ق', shifted: 'ٌ', group: 4 },
    { id: 't', primary: 'ف', shifted: 'لإ', group: 4 },
    { id: 'y', primary: 'غ', shifted: 'إ', group: 5 },
    { id: 'u', primary: 'ع', shifted: '`', group: 5 },
    { id: 'i', primary: 'ه', shifted: '÷', group: 6 },
    { id: 'o', primary: 'خ', shifted: '×', group: 7 },
    { id: 'p', primary: 'ح', shifted: '؛', group: 8 },
    { id: 'leftSquareBracket', primary: 'ج', shifted: '<', group: 8 },
    { id: 'rightSquareBracket', primary: 'د', shifted: '>', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ش', shifted: 'ِ', group: 1 },
    { id: 's', primary: 'س', shifted: 'ٍ', group: 2 },
    { id: 'd', primary: 'ي', shifted: ']', group: 3 },
    { id: 'f', primary: 'ب', shifted: '[', group: 4 },
    { id: 'g', primary: 'ل', shifted: 'لأ', group: 4 },
    { id: 'h', primary: 'ا', shifted: 'أ', group: 5 },
    { id: 'j', primary: 'ت', shifted: 'ـ', group: 5 },
    { id: 'k', primary: 'ن', shifted: '،', group: 6 },
    { id: 'l', primary: 'م', shifted: '/', group: 7 },
    { id: 'cologn', primary: 'ك', shifted: ':', group: 8 },
    { id: 'quote', primary: 'ط', shifted: '"', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom row
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ئ', shifted: '~', group: 1 },
    { id: 'x', primary: 'ء', shifted: 'ْ', group: 2 },
    { id: 'c', primary: 'ؤ', shifted: '}', group: 3 },
    { id: 'v', primary: 'ر', shifted: '{', group: 4 },
    { id: 'b', primary: 'لا', shifted: 'لآ', group: 4 },
    { id: 'n', primary: 'ى', shifted: 'آ', group: 5 },
    { id: 'm', primary: 'ة', shifted: "'", group: 5 },
    { id: 'comma', primary: 'و', shifted: ',', group: 6 },
    { id: 'period', primary: 'ز', shifted: '.', group: 7 },
    { id: 'slash', primary: 'ظ', shifted: '؟', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar
    { id: 'space', primary: ' ', width: 'space' },
  ],
};

