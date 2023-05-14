// import 'server-only';

"use server";

import { Locale } from "./i18n-config";

const translations = {
  en: () => import('./translations/en.json').then((module) => module.default),
  zh: () => import('./translations/zh.json').then((module) => module.default),
};

export const getTranslation = async (locale: Locale) => translations[locale]();