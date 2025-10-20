import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, countryToLocale, type Locale } from './i18n';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('/favicon.ico') ||
    pathname.includes('/robots.txt') ||
    pathname.includes('/sitemap.xml')
  ) {
    return NextResponse.next();
  }

  // Get country from Cloudflare header or Vercel geolocation
  const country = 
    request.headers.get('cf-ipcountry') || 
    request.geo?.country || 
    'US';

  // Detect if user already has a locale in the URL
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale in URL, redirect to appropriate locale based on geolocation
  if (!pathnameHasLocale) {
    const detectedLocale = countryToLocale[country] || defaultLocale;
    const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    
    // Preserve query parameters
    newUrl.search = request.nextUrl.search;
    
    return NextResponse.redirect(newUrl);
  }

  // Add custom headers for analytics and tracking
  const response = intlMiddleware(request);
  
  if (response) {
    response.headers.set('x-user-country', country);
    response.headers.set('x-detected-locale', countryToLocale[country] || defaultLocale);
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
