import Link from "next/link";
import React from "react";
import { useTranslation } from './i18n.server';
import { languages } from './settings';

export default async function LanguageSwitcher({ lang }: {lang: string}) {
  const { t } = await useTranslation(lang);

  const btnClass = (l: string) =>
    l === lang ? 'btn-secondary' : 'btn-info';

  // TODO: use t
  const displayLanguage = (lang: string) => {
    switch (lang) {
      case 'zh':
        return '中';
      case 'en':
      default:
        return 'EN';
    }
  };

  return (
    <div className="d-flex mx-2">
      {languages.map((l, index) => {
        return (
          <Link
            key={index}
            className={`btn btn-sm m-1 ${btnClass(l)}`}
            href={`/${l}`}
          >              
            {displayLanguage(l)}
          </Link>
        )
      })}
    </div>
  );
}
