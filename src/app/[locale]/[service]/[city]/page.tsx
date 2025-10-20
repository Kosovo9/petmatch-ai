import { notFound } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import { MapPin, Star, Phone, Mail, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

const VALID_SERVICES = [
  'paseo',
  'guarderia',
  'veterinario',
  'grooming',
  'entrenamiento',
  'pension',
  'taxi-pet',
  'fotografia',
];

const VALID_CITIES = [
  'cdmx',
  'guadalajara',
  'monterrey',
  'puebla',
  'queretaro',
  'tijuana',
  'cancun',
  'merida',
  'leon',
  'juarez',
];

interface ServiceProvider {
  id: string;
  business_name: string;
  description: string;
  city: string;
  country: string;
  address: string | null;
  phone: string;
  email: string;
  verified: boolean;
  rating: number;
  total_reviews: number;
  price_range: string | null;
  photos: string[];
}

export async function generateStaticParams() {
  const params = [];
  for (const service of VALID_SERVICES) {
    for (const city of VALID_CITIES) {
      params.push({ service, city });
    }
  }
  return params;
}

export async function generateMetadata({
  params: { locale, service, city },
}: {
  params: { locale: string; service: string; city: string };
}) {
  const serviceNames: Record<string, string> = {
    paseo: 'Paseadores de Perros',
    guarderia: 'Guarderías para Mascotas',
    veterinario: 'Veterinarios',
    grooming: 'Estética Canina',
    entrenamiento: 'Entrenadores',
    pension: 'Pensiones',
    'taxi-pet': 'Taxi para Mascotas',
    fotografia: 'Fotografía de Mascotas',
  };

  const cityNames: Record<string, string> = {
    cdmx: 'Ciudad de México',
    guadalajara: 'Guadalajara',
    monterrey: 'Monterrey',
    puebla: 'Puebla',
    queretaro: 'Querétaro',
    tijuana: 'Tijuana',
    cancun: 'Cancún',
    merida: 'Mérida',
    leon: 'León',
    juarez: 'Ciudad Juárez',
  };

  return {
    title: `${serviceNames[service] || service} en ${cityNames[city] || city} | PetMatch AI`,
    description: `Encuentra los mejores ${serviceNames[service]?.toLowerCase() || service} en ${cityNames[city] || city}. Profesionales verificados, precios transparentes y reseñas reales.`,
  };
}

export default async function ServiceCityPage({
  params: { locale, service, city },
}: {
  params: { locale: string; service: string; city: string };
}) {
  if (!VALID_SERVICES.includes(service) || !VALID_CITIES.includes(city)) {
    notFound();
  }

  const supabase = createSupabaseServer();

  // Fetch service providers
  const { data: providers, error } = await supabase
    .from('service_providers')
    .select('*')
    .eq('service_type', service)
    .eq('city', city)
    .eq('verified', true)
    .order('rating', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching providers:', error);
  }

  const serviceNames: Record<string, string> = {
    paseo: 'Paseadores de Perros',
    guarderia: 'Guarderías para Mascotas',
    veterinario: 'Veterinarios',
    grooming: 'Estética Canina',
    entrenamiento: 'Entrenadores',
    pension: 'Pensiones',
    'taxi-pet': 'Taxi para Mascotas',
    fotografia: 'Fotografía de Mascotas',
  };

  const cityNames: Record<string, string> = {
    cdmx: 'Ciudad de México',
    guadalajara: 'Guadalajara',
    monterrey: 'Monterrey',
    puebla: 'Puebla',
    queretaro: 'Querétaro',
    tijuana: 'Tijuana',
    cancun: 'Cancún',
    merida: 'Mérida',
    leon: 'León',
    juarez: 'Ciudad Juárez',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href={`/${locale}`} className="hover:text-primary-600">
              Inicio
            </Link>
            {' > '}
            <Link href={`/${locale}/servicios`} className="hover:text-primary-600">
              Servicios
            </Link>
            {' > '}
            <span className="text-gray-900 font-medium">
              {serviceNames[service]} en {cityNames[city]}
            </span>
          </nav>
          <h1 className="text-4xl font-display font-bold mb-2">
            {serviceNames[service]} en {cityNames[city]}
          </h1>
          <p className="text-gray-600">
            {providers?.length || 0} profesionales verificados disponibles
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b py-4">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg font-medium">
              Todos
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Mejor valorados
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Más económicos
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Disponibles hoy
            </button>
          </div>
        </div>
      </div>

      {/* Providers List */}
      <div className="container-custom py-8">
        {providers && providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider: ServiceProvider) => (
              <div
                key={provider.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 relative">
                  {provider.photos && provider.photos.length > 0 ? (
                    <img
                      src={provider.photos[0]}
                      alt={provider.business_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                      🐾
                    </div>
                  )}
                  {provider.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      ✓ Verificado
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{provider.business_name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{provider.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      ({provider.total_reviews} reseñas)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {provider.description}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.address || cityNames[city]}</span>
                    </div>
                    {provider.price_range && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{provider.price_range}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/${locale}/provider/${provider.id}`}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-center font-medium hover:bg-primary-700 transition-colors"
                    >
                      Ver perfil
                    </Link>
                    <a
                      href={`tel:${provider.phone}`}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">
              No hay proveedores disponibles
            </h2>
            <p className="text-gray-600 mb-6">
              Aún no tenemos {serviceNames[service]?.toLowerCase()} registrados en {cityNames[city]}.
            </p>
            <Link
              href={`/${locale}/registro-proveedor`}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700"
            >
              Registrar mi negocio
            </Link>
          </div>
        )}
      </div>

      {/* GeoAd Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              🎯 Anuncio Premium - Purina México
            </h3>
            <p className="text-gray-600 mb-6">
              Nutrición completa para tu mascota. Envío gratis en pedidos mayores a $500 MXN.
            </p>
            <a
              href="https://www.purina.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700"
            >
              Ver productos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
