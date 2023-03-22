import { createI18n } from 'vue-i18n';
import default_settings from '@/default_settings';

const messages = {
  en: {},
  es: {},
  ca: {},
}; // TODO

export default new createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: default_settings.language, // 'ca',
  fallbackLocale: 'en',
  messages,
});
