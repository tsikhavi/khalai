import {NextRequest, NextResponse} from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import {locales, defaultLocale, type Locale} from './i18n/config';

/* ------------------------------------------------------------------ */
/*  next-intl middleware — handles locale detection & prefixing       */
/* ------------------------------------------------------------------ */
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // URLs always include /en, /sw, /fr ...
  localeDetection: true, // detect from cookie / Accept-Language header
});

/* ------------------------------------------------------------------ */
/*  Auth config                                                       */
/* ------------------------------------------------------------------ */
const protectedRoutes = ['/dashboard', '/admin'];
const authRoutes = ['/login', '/register'];

/** Strip the leading locale segment:  /en/dashboard  →  /dashboard  */
function stripLocale(pathname: string): {locale: Locale | null; path: string} {
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];

  if (locales.includes(maybeLocale as Locale)) {
    return {
      locale: maybeLocale as Locale,
      path: '/' + segments.slice(1).join('/'),
    };
  }
  return {locale: null, path: pathname};
}

/* ------------------------------------------------------------------ */
/*  Main proxy                                                        */
/* ------------------------------------------------------------------ */
export default function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const {pathname} = request.nextUrl;
  const {locale, path} = stripLocale(pathname);

  // Determine the effective locale (fallback to default)
  const activeLocale: Locale = locale ?? defaultLocale;

  /* ---------- 1. Auth guard: protected routes ---------- */
  const isProtected = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (isProtected && !token) {
    const loginUrl = new URL(`/${activeLocale}/login`, request.url);
    loginUrl.searchParams.set('next', pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  /* ---------- 2. Auth guard: redirect logged-in users ---------- */
  const isAuthRoute = authRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (isAuthRoute && token) {
    return NextResponse.redirect(
      new URL(`/${activeLocale}/dashboard`, request.url)
    );
  }

  /* ---------- 3. Delegate to next-intl ------------------- */
  // Handles:
  //   • Missing locale prefix  →  redirect /about → /en/about
  //   • Locale negotiation from cookie / Accept-Language
  //   • RTL / dir metadata
  return intlMiddleware(request);
}

/* ------------------------------------------------------------------ */
/*  Matcher — skip API, Next internals, and static assets             */
/* ------------------------------------------------------------------ */
export const config = {
  matcher: [
    // Match all paths except:
    //   api, trpc, _next, _vercel, and files with a dot (static assets)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
