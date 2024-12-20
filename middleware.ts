import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLang, languages } from "./i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lang*'
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

export function middleware(req) {
  let lang;
  if (req.cookies.has(cookieName))
    lang = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = fallbackLang;

  // Redirect if lang in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const langInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (langInReferer) response.cookies.set(cookieName, langInReferer);
    return response;
  }

  return NextResponse.next();
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

//     // e.g. incoming request is /products
//     // The new URL is now /en-US/products
//     return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
//   }
// }

// export const config = {
//   // Matcher ignoring `/_next/` and `/api/`
//   matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
// };
