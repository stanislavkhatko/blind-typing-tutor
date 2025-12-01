import type { KeyboardLayout } from '../../types/keyboard';

/**
 * French AZERTY keyboard layout
 * Standard layout used in France and Belgium
 */
export const frFrLayout: KeyboardLayout = {
    id: 'fr-fr',
    name: 'Français (AZERTY)',
    language: 'fr',
    flag: '🇫🇷',
    leftHandKeys: ['a', 'z', 'e', 'r', 't', 'q', 's', 'd', 'f', 'g', 'w', 'x', 'c', 'v', 'b'],
    keys: [
        // Row 1 - Number row
        { id: 'backtick', primary: '²', shifted: '³', group: 1 },
        { id: '1', primary: '&', shifted: '1', group: 1 },
        { id: '2', primary: 'é', shifted: '2', altGr: '~', group: 1 },
        { id: '3', primary: '"', shifted: '3', altGr: '#', group: 2 },
        { id: '4', primary: "'", shifted: '4', altGr: '{', group: 3 },
        { id: '5', primary: '(', shifted: '5', altGr: '[', group: 4 },
        { id: '6', primary: '-', shifted: '6', altGr: '|', group: 4 },
        { id: '7', primary: 'è', shifted: '7', altGr: '`', group: 5 },
        { id: '8', primary: '_', shifted: '8', altGr: '\\', group: 5 },
        { id: '9', primary: 'ç', shifted: '9', altGr: '^', group: 6 },
        { id: '0', primary: 'à', shifted: '0', altGr: '@', group: 7 },
        { id: 'underscore', primary: ')', shifted: '°', altGr: ']', group: 8 },
        { id: 'equal', primary: '=', shifted: '+', altGr: '}', group: 8 },
        { id: 'backspace', primary: 'backspace', width: 'tab' },

        // Row 2 - AZERTY row
        { id: 'tab', primary: 'tab', width: 'tab' },
        { id: 'q', primary: 'a', shifted: 'A', group: 1 }, // A in AZERTY
        { id: 'w', primary: 'z', shifted: 'Z', group: 2 }, // Z in AZERTY
        { id: 'e', primary: 'e', shifted: 'E', altGr: '€', group: 3 },
        { id: 'r', primary: 'r', shifted: 'R', group: 4 },
        { id: 't', primary: 't', shifted: 'T', group: 4 },
        { id: 'y', primary: 'y', shifted: 'Y', group: 5 },
        { id: 'u', primary: 'u', shifted: 'U', group: 5 },
        { id: 'i', primary: 'i', shifted: 'I', group: 6 },
        { id: 'o', primary: 'o', shifted: 'O', group: 7 },
        { id: 'p', primary: 'p', shifted: 'P', group: 8 },
        { id: 'leftSquareBracket', primary: '^', shifted: '¨', group: 8 },
        { id: 'rightSquareBracket', primary: '$', shifted: '£', altGr: '¤', group: 8 },
        { id: 'backSlash', primary: '*', shifted: 'µ', group: 8 },

        // Row 3 - Home row
        { id: 'caps_lock', primary: 'caps', width: 'caps' },
        { id: 'a', primary: 'q', shifted: 'Q', group: 1 }, // Q in AZERTY
        { id: 's', primary: 's', shifted: 'S', group: 2 },
        { id: 'd', primary: 'd', shifted: 'D', group: 3 },
        { id: 'f', primary: 'f', shifted: 'F', group: 4 },
        { id: 'g', primary: 'g', shifted: 'G', group: 4 },
        { id: 'h', primary: 'h', shifted: 'H', group: 5 },
        { id: 'j', primary: 'j', shifted: 'J', group: 5 },
        { id: 'k', primary: 'k', shifted: 'K', group: 6 },
        { id: 'l', primary: 'l', shifted: 'L', group: 7 },
        { id: 'cologn', primary: 'm', shifted: 'M', group: 8 }, // M in AZERTY
        { id: 'quote', primary: 'ù', shifted: '%', group: 8 },
        { id: 'enter', primary: 'enter', width: 'enter' },

        // Row 4 - Bottom row
        { id: 'shift-l', primary: 'shift', width: 'shift' },
        { id: 'z', primary: 'w', shifted: 'W', group: 1 }, // W in AZERTY
        { id: 'x', primary: 'x', shifted: 'X', group: 2 },
        { id: 'c', primary: 'c', shifted: 'C', group: 3 },
        { id: 'v', primary: 'v', shifted: 'V', group: 4 },
        { id: 'b', primary: 'b', shifted: 'B', group: 4 },
        { id: 'n', primary: 'n', shifted: 'N', group: 5 },
        { id: 'm', primary: ',', shifted: '?', group: 5 },
        { id: 'comma', primary: ';', shifted: '.', group: 6 },
        { id: 'period', primary: ':', shifted: '/', group: 7 },
        { id: 'slash', primary: '!', shifted: '§', group: 8 },
        { id: 'shift-r', primary: 'shift', width: 'shift' },

        // Row 5 - Space bar
        { id: 'space', primary: ' ', width: 'space' },
    ],
};
