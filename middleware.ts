// /middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Una lista de todos los locales que son soportados
  locales,

  // Usado cuando no se encuentra una coincidencia de locale
  defaultLocale
});

export const config = {
  // No ejecutar el middleware en rutas que no necesitan internacionalización.
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};
