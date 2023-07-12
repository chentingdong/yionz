import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLang, languages } from './i18n/settings';

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lang*'
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}

// const cookieName = 'i18next'

export function middleware(req: NextRequest) {
  let lang: string | null | undefined;
  const pathname = req.nextUrl.pathname;

  // if (req.cookies.has(cookieName)) lang = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  if (!lang) lang = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lang) lang = fallbackLang

  // Redirect if lang in path is not supported
  const pathnameMissingLang = 
    !languages.some(loc => pathname.startsWith(`/${loc}`))
      && pathname !== `/${lang}`
      && !req.nextUrl.pathname.startsWith('/_next');

    if ( pathnameMissingLang ) {
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url))
  }

  // const refererUrl = new URL(req.headers?.get('referer'));
  // if (refererUrl) {
  //   const langInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
  //   const response = NextResponse.next()
  //   // if (langInReferer) response.cookies.set(cookieName, langInReferer)
  //   return response
  // }

  return NextResponse.next()
}

// import Negotiator from 'negotiator';
// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import { i18n } from './i18n/i18n-config';
// import { match as matchLocale } from '@formatjs/intl-localematcher';

// function getLocale(request: NextRequest): string | undefined {
//   // Negotiator expects plain object so we need to transform headers
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // Use negotiator and intl-localematcher to get best locale
//   let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
//   // @ts-ignore locales are readonly
//   const locales: string[] = i18n.locales;
//   return matchLocale(languages, locales, i18n.defaultLocale);
// }

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // Check if there is any supported locale in the pathname
//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);

//     return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
//   }
// }

// export const config = {
//   // Matcher ignoring `/_next/` and `/api/`
//   matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
// };