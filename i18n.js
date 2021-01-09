import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './public/locales/en/common.json';
import fr from './public/locales/fr/common.json';

const global = () => {
  i18n.addResourceBundle('en', 'global', en);
  i18n.addResourceBundle('fr', 'global', fr);
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    lng: 'en',
    initImmediate: false,
    preload: ['en', 'fr'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      useSuspense: false,
    },
  });

// Apply
global(i18n);

export default i18n;
