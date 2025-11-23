export default class Keyboard {
    constructor() {
        this.root = $('.keyboard-container');
        this.keys = $('.keyboard-container .key');
        this.tools = $('.keyboard-toolbar .tool')
        this.keyTargetClass = 'key-target';
        this.righthandedSpace = 'righthand';

        this.keyboardMatrix = [
            {id: '1', en: '1', uk: '1',},
            {id: '2', en: '2', uk: '2',},
            {id: '3', en: '3', uk: '3',},
            {id: '4', en: '4', uk: '4',},
            {id: '5', en: '5', uk: '5',},
            {id: '6', en: '6', uk: '6',},
            {id: '7', en: '7', uk: '7',},
            {id: '8', en: '8', uk: '8',},
            {id: '9', en: '9', uk: '9',},
            {id: '0', en: '0', uk: '0',},
            {id: 'underscore', en: '-', uk: '-',},
            {id: 'equal', en: '=', uk: '=',},
            {id: 'q', en: 'q', uk: 'й',},
            {id: 'w', en: 'w', uk: 'ц',},
            {id: 'e', en: 'e', uk: 'у',},
            {id: 'r', en: 'r', uk: 'к',},
            {id: 't', en: 't', uk: 'е',},
            {id: 'y', en: 'y', uk: 'н',},
            {id: 'u', en: 'u', uk: 'г',},
            {id: 'i', en: 'i', uk: 'ш',},
            {id: 'o', en: 'o', uk: 'щ',},
            {id: 'p', en: 'p', uk: 'з',},
            {id: 'leftSquareBracket', en: '[', uk: 'х',},
            {id: 'rightSquareBracket', en: ']', uk: 'ї',},
            {id: 'a', en: 'a', uk: 'ф',},
            {id: 's', en: 's', uk: 'і',},
            {id: 'd', en: 'd', uk: 'в',},
            {id: 'f', en: 'f', uk: 'а',},
            {id: 'g', en: 'g', uk: 'п',},
            {id: 'h', en: 'h', uk: 'р',},
            {id: 'j', en: 'j', uk: 'о',},
            {id: 'k', en: 'k', uk: 'л',},
            {id: 'l', en: 'l', uk: 'д',},
            {id: 'cologn', en: ';', uk: 'ж',},
            {id: 'quote', en: "'", uk: 'є',},
            {id: 'backSlash', en: '\\', uk: 'ʼ',},
            {id: 'z', en: 'z', uk: 'я',},
            {id: 'x', en: 'x', uk: 'ч',},
            {id: 'c', en: 'c', uk: 'с',},
            {id: 'v', en: 'v', uk: 'м',},
            {id: 'b', en: 'b', uk: 'и',},
            {id: 'n', en: 'n', uk: 'т',},
            {id: 'm', en: 'm', uk: 'ь',},
            {id: 'comma', en: ',', uk: 'б',},
            {id: 'period', en: '.', uk: 'ю',},
            {id: 'slash', en: '/', uk: '.',}
        ]

        this.leftHalf = 'q w e r t a s d f g z x c v b'.split(/\s/);
        this.leftHalfUK = 'й ц у к е ф і в а п я ч с м и'.split(/\s/);

        this._bindEvents();
    }

    _bindEvents() {
        this.tools.filter('#keyboard-toggle').click(e => {
            this.root.toggleClass('hidden');
        });

        this.tools.filter('#hands-toggle').click(e => {
            this.root.toggleClass('non-hands');
        });

        this.tools.filter('#color-toggle').click(e => {
            this.root.toggleClass('colorful');
        });
    }

    _isUpper(letter) {
        return letter == letter.toUpperCase()
    }

    _isIn(array, item) {
        return array.includes(item);
    }

    _handForSpace(pressed) {
        return (this.leftHalf.includes(pressed) || this.leftHalfUK.includes(pressed)) ? this.righthandedSpace : ''
    }

    highlight(pressed, toPress) {

        this.keys.removeClass(this.keyTargetClass);

        if (toPress == 'space') {
            let space = this.keys.filter('#space');

            if (space.hasClass(this.righthandedSpace)) {
                space.removeClass(this.righthandedSpace);
            }

            space.addClass(this.keyTargetClass + ' ' + this._handForSpace(pressed));
        } else {

            let isUpper = this._isUpper(toPress);

            toPress = toPress.toLowerCase();

            let matrix = this.keyboardMatrix.find(it => it.en === toPress || it.uk === toPress);
            let idToPress = matrix.id

            if (isUpper) {

                let side = this.leftHalf.includes(idToPress) ? 'r' : 'l'; // r - right hand (l - left)

                this.keys.filter(`#shift-${side}`).addClass(this.keyTargetClass);
            }


            // this.keys.filter(`#${toPress}`).addClass(this.keyTargetClass);
            this.keys.filter(`#${idToPress}`).addClass(this.keyTargetClass);

        }

    }
}
