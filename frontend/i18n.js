import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './public/locales/en/translation.json';
import translationFR from './public/locales/fr/translation.json';

let defaultLanguage = 'fr';

// the translations
const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: defaultLanguage,

        keySeparator: '.', // to support nested translations

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
