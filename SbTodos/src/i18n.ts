import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {ns1, ns2, ns1_ko, ns2_ko, ns1_ja, ns2_ja} from './locales';

export const defaultNS = 'ns1';
export const resources = {
  en: {
    ns1,
    ns2,
  },
  ja: {
    ns1: ns1_ja,
    ns2: ns2_ja,
  },
  ko: {
    ns1: ns1_ko,
    ns2: ns2_ko,
  },
} as const;

const deviceLanguage = RNLocalize.getLocales()[0].languageCode;

const fallbackLanguage = 'en';

i18n.use(initReactI18next).init({
  lng: deviceLanguage || fallbackLanguage,
  ns: ['ns1', 'ns2'],
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
