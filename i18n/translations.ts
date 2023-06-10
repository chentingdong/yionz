// import 'server-only';
"use server";

import { Locale } from "./i18n-config";
import en from './translations/en.json';
import zh from './translations/zh.json';

export const getTranslation = async (locale: Locale) => {
  switch (locale) {
    default:
    case 'en':
      return en;
    case 'zh':
      return zh;
  }
};
