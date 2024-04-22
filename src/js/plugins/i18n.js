import {createI18n} from 'vue-i18n'

const messages = {
    en: {
        general: {
            typot: 'Typing trainer',
            toggleTheme: 'Toggle color theme',
        }
    },
    uk: {
        general: {
            typot: 'Тренер набору тексту',
            toggleTheme: 'Змінити кольорову тему',
        }
    },
}

const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'uk',
    fallbackLocale: 'en',
    messages,
})

export default i18n
