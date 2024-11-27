// import { useTranslation as useTranslationOrg} from "next-i18next";

// export function useTranslation(lang: string) {
//   const ret = useTranslationOrg()
//   const { i18n } = ret
//   console.log('i18n:', i18n);
//   i18n.changeLanguage(lang);
//   return ret;
// }

// import { useTranslation as useTranslationOrg} from "next-i18next";
// import { defaultNS } from './settings'

// export function useTranslation(lang: string, ns?: string) {
//   const ret = useTranslationOrg(ns || defaultNS)
//   const { i18n } = ret
//   i18n.changeLanguage(lang);
//   return ret
// }

'use client'

import React from "react";
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { defaultNS, getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./translations/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, 
    // preload: runsOnServerSide ? languages : []
    preload: languages
  })

export function useTranslation(lang: string, ns = defaultNS) {
  const ret = useTranslationOrg(ns)
  const { i18n } = ret
  if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = React.useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (!lang || i18n.resolvedLanguage === lang) return
      i18n.changeLanguage(lang)
    }, [lang, i18n])
  }
  // i18n.changeLanguage(lang)
  return ret
}
