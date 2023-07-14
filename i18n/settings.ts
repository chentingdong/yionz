export const fallbackLang = 'en'
export const languages = [fallbackLang, 'zh']
export const defaultNS = 'translation'

export function getOptions (lang = fallbackLang, ns = defaultNS) {
  return {
    debug: false,
    supportedLngs: languages,
    fallbackLng: fallbackLang,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    react: {
      useSuspense: false, 
    }
  }
}