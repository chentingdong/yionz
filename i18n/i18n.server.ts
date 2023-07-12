// serverside translation hook
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { defaultNS, getOptions } from './settings'

const initI18next = async (lang: string, ns: string ) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((lang: string, namespace: string) =>
      import(`./translations/${lang}/${namespace}.json`)
    ))
    .init(getOptions(lang, ns))
  return i18nInstance
}

export async function useTranslation(lang: string, ns?: defaultNs) {
  const i18nextInstance = await initI18next(lang, ns);
  return {
    t: i18nextInstance.getFixedT(lang, ns),
    i18n: i18nextInstance
  }
}