import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales with their currencies and regions
export const locales = [
  'es-MX', // Spanish (Mexico) - MXN
  'es-ES', // Spanish (Spain) - EUR
  'es-AR', // Spanish (Argentina) - ARS
  'es-CO', // Spanish (Colombia) - COP
  'es-CL', // Spanish (Chile) - CLP
  'en-US', // English (USA) - USD
  'en-GB', // English (UK) - GBP
  'en-CA', // English (Canada) - CAD
  'en-AU', // English (Australia) - AUD
  'pt-BR', // Portuguese (Brazil) - BRL
  'pt-PT', // Portuguese (Portugal) - EUR
  'fr-FR', // French (France) - EUR
  'fr-CA', // French (Canada) - CAD
  'de-DE', // German (Germany) - EUR
  'it-IT', // Italian (Italy) - EUR
  'ja-JP', // Japanese (Japan) - JPY
  'ko-KR', // Korean (South Korea) - KRW
  'zh-CN', // Chinese (China) - CNY
  'ru-RU', // Russian (Russia) - RUB
  'ar-SA', // Arabic (Saudi Arabia) - SAR
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es-MX';

// Currency mapping by locale
export const currencyByLocale: Record<Locale, string> = {
  'es-MX': 'MXN',
  'es-ES': 'EUR',
  'es-AR': 'ARS',
  'es-CO': 'COP',
  'es-CL': 'CLP',
  'en-US': 'USD',
  'en-GB': 'GBP',
  'en-CA': 'CAD',
  'en-AU': 'AUD',
  'pt-BR': 'BRL',
  'pt-PT': 'EUR',
  'fr-FR': 'EUR',
  'fr-CA': 'CAD',
  'de-DE': 'EUR',
  'it-IT': 'EUR',
  'ja-JP': 'JPY',
  'ko-KR': 'KRW',
  'zh-CN': 'CNY',
  'ru-RU': 'RUB',
  'ar-SA': 'SAR',
};

// Country code mapping for geolocation
export const countryToLocale: Record<string, Locale> = {
  MX: 'es-MX',
  ES: 'es-ES',
  AR: 'es-AR',
  CO: 'es-CO',
  CL: 'es-CL',
  US: 'en-US',
  GB: 'en-GB',
  CA: 'en-CA',
  AU: 'en-AU',
  BR: 'pt-BR',
  PT: 'pt-PT',
  FR: 'fr-FR',
  DE: 'de-DE',
  IT: 'it-IT',
  JP: 'ja-JP',
  KR: 'ko-KR',
  CN: 'zh-CN',
  RU: 'ru-RU',
  SA: 'ar-SA',
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
