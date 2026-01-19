import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_INTERFACE_LANGS = [
  "en",
  "uk",
  "tr",
  "de",
  "fr",
  "es",
  "pt",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "it",
  "pl",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "cs",
  "hu",
  "ro",
  "el",
  "he",
  "th",
  "vi",
  "id",
  "ms",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle legacy URLs: /{interfaceLang}/{contentType}-{lang} -> /{interfaceLang}/{lang}/{contentType}
  // Example: /en/phrases-es -> /en/es/phrases
  const legacyPattern = /^\/([a-z]{2}(?:-[a-z]{2})?)\/(words|phrases)-([a-z]{2}(?:-[a-z]{2})?)$/;
  const legacyMatch = pathname.match(legacyPattern);

  if (legacyMatch) {
    const [, interfaceLang, contentType, learningLang] = legacyMatch;
    if (VALID_INTERFACE_LANGS.includes(interfaceLang)) {
      return NextResponse.redirect(
        new URL(`/${interfaceLang}/${learningLang}/${contentType}`, request.url)
      );
    }
  }

  // Handle legacy custom URLs: /{interfaceLang}/custom -> /{interfaceLang}/{interfaceLang}/custom
  const customPattern = /^\/([a-z]{2}(?:-[a-z]{2})?)\/custom$/;
  const customMatch = pathname.match(customPattern);

  if (customMatch) {
    const [, interfaceLang] = customMatch;
    if (VALID_INTERFACE_LANGS.includes(interfaceLang)) {
      return NextResponse.redirect(
        new URL(`/${interfaceLang}/${interfaceLang}/custom`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)).*)",
  ],
};
