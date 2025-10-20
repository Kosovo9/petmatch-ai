// /app/[locale]/[service]/[city]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import ServicePageClient from './ServicePageClient';

// Lista de locales soportados
const locales = [
  'en-US', 'es-MX', 'ja-JP', 'en-CA', 'es-CL',
  'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'ko-KR',
  'zh-CN', 'ru-RU', 'ar-SA', 'es-ES', 'es-CO',
  'es-AR', 'fr-CA', 'pt-PT', 'en-AU', 'en-GB'
] as const;

// Servicios válidos
const services = [
  'paseo', 'guarderia', 'entrenamiento', 'grooming',
  'veterinario', 'fotografia', 'taxi-pet', 'pension'
] as const;

export async function generateStaticParams() {
  const cities = ['cdmx', 'guadalajara', 'monterrey', 'puebla', 'tijuana', 'merida', 'leon', 'juarez', 'cancun', 'queretaro'];
  return locales.flatMap(locale =>
    services.flatMap(service =>
      cities.map(city => ({ locale, service, city }))
    )
  );
}

export default async function ServicePage({
  params
}: {
  params: { locale: string; service: string; city: string };
}) {
  const { locale, service, city } = params;

  // Validar locale
  if (!locales.includes(locale as any)) notFound();
  
  // Validar servicio
  if (!services.includes(service as any)) notFound();

  // Establecer locale para next-intl
  setRequestLocale(locale);

  // Obtener traducciones
  const t = await getTranslations({ locale, namespace: 'common' });

  // Obtener proveedores desde Supabase
  const supabase = createClient();
  const { data: providers, error } = await supabase
    .from('white_pages_providers')
    .select('*')
    .eq('service_type', service)
    .eq('city_slug', city)
    .eq('is_active', true);

  if (error) {
    console.error('Supabase error:', error);
    // No fallar el build — mostrar página vacía
    return <ServicePageClient providers={[]} service={service} city={city} locale={locale} t={t} />;
  }

  return (
    <ServicePageClient 
      providers={providers} 
      service={service} 
      city={city} 
      locale={locale} 
      t={t} 
    />
  );
}