// /app/[locale]/[service]/[city]/ServicePageClient.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';

interface Provider {
  id: string;
  name: string;
  rating: number;
  price: number;
  currency: string;
  city: string;
}

interface ServicePageClientProps {
  providers: Provider[];
  service: string;
  city: string;
  locale: string;
  t: (key: string) => string;
}

export default function ServicePageClient({
  providers,
  service,
  city,
  locale
}: ServicePageClientProps) {
  const t = useTranslations();

  // Cargar traducciones específicas por servicio
  const getServiceTitle = () => {
    const titles: Record<string, string> = {
      'paseo': t('dogWalking'),
      'guarderia': t('daycare'),
      'entrenamiento': t('training'),
      'grooming': t('grooming'),
      'veterinario': t('vet'),
      'fotografia': t('photography'),
      'taxi-pet': t('petTaxi'),
      'pension': t('boarding')
    };
    return titles[service] || service;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {getServiceTitle()} en {city}
        </h1>
        
        {providers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('noProviders')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider.id} className="border rounded-lg p-6 hover:shadow-md transition">
                <h2 className="text-xl font-semibold">{provider.name}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{provider.rating}</span>
                </div>
                <p className="mt-2 text-lg font-medium">
                  {provider.price} {provider.currency}
                </p>
                <Link 
                  href={`/${locale}/booking/${provider.id}`}
                  className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                >
                  {t('bookNow')}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}