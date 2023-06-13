import Link from "next/link";
import { Locale } from "@/i18n/i18n-config";
import React from "react";
import { i18n } from "./i18n-config";

export default function LanguageSwitcher({ lang }: { lang: Locale; }) {
  const locales = i18n.locales;

  const btnClass = (locale: Locale) =>
    lang === locale ? 'btn-secondary' : 'btn-info';
  const displayLocale = (locale) => {
    switch (locale) {
      case 'zh':
        return '中';
      case 'en':
      default:
        return 'en';
    }
  };
  return (
    <div className="d-flex mx-2">
      {locales.map((locale, index) => {
        return (
          <Link
            key={index}
            className={`btn btn-sm m-1 ${btnClass(locale)}`}
            href={`/${locale}`}
          >
            {displayLocale(locale)}
          </Link>
        );
      })}
    </div>
  );
}
