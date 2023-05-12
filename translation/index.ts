import { cookies, headers } from "next/headers";

import en from "./en.json";
import { parse } from "accept-language-parser";
import zh from "./zh.json";

export const fallbackLanguage = "en";
export const supportedLanguages = ["zh", fallbackLanguage] as const;
export type SupportedLanguages = typeof supportedLanguages[number];

export type Translations = typeof en;
export const translations: Record<SupportedLanguages, Translations> = {
  en,
  zh,
};

export const preferredRequestLanguage = (
  languageQuery: string | null
): SupportedLanguages => {
  // Start by checking the `?language=xx` query parameter, that takes precedence
  if (languageQuery !== null)
    return (
      supportedLanguages.find((language) => language === languageQuery) ||
      fallbackLanguage
    );

  // Next, check for a `language` cookie
  const languageCookie = cookies().get("language");

  if (languageCookie !== undefined)
    return (
      supportedLanguages.find(
        (language) => language === languageCookie.value
      ) || fallbackLanguage
    );

  // No luck so far? Continue by checking the `Accept-Language` header
  const acceptLanguageHeader = headers().get("Accept-Language");

  if (acceptLanguageHeader === null) return fallbackLanguage;

  const acceptedLanguages = parse(acceptLanguageHeader);
  for (const acceptedLanguage of acceptedLanguages) {
    const preferredLanguage = supportedLanguages.find(
      (language) => language === acceptedLanguage.code
    );
    if (preferredLanguage !== undefined) return preferredLanguage;
  }

  return fallbackLanguage;
};

export const preferredTranslations = (
  languageQuery: string | null
): Translations => translations[preferredRequestLanguage(languageQuery)];
