import { createSupabaseServer } from '@/lib/supabase/server';
import { Plane, CheckCircle, XCircle, DollarSign, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Volar con Mascota - Políticas de Aerolíneas | PetMatch AI',
  description: 'Consulta políticas actualizadas de aerolíneas para viajar con tu mascota. Información sobre cabina, bodega, costos y documentación requerida.',
};

export default async function PetMatchFlyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const supabase = createSupabaseServer();

  const { data: airlines, error } = await supabase
    .from('airline_policies')
    .select('*')
    .order('airline_name');

  if (error) {
    console.error('Error fetching airlines:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <Plane className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-display font-bold mb-4">
            PetMatch Fly
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Políticas actualizadas de aerolíneas para viajar con tu mascota. Información en tiempo real.
          </p>
        </div>
      </div>

      {/* Quick Search */}
      <div className="bg-white border-b py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Buscar Vuelo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Aerolínea"
                className="px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Origen"
                className="px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Destino"
                className="px-4 py-3 border rounded-lg"
              />
            </div>
            <button className="mt-4 w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700">
              Buscar Políticas
            </button>
          </div>
        </div>
      </div>

      {/* Airlines List */}
      <div className="container-custom py-12">
        <h2 className="text-3xl font-display font-bold mb-8">
          Aerolíneas Disponibles
        </h2>
        
        {airlines && airlines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airlines.map((airline: any) => (
              <div
                key={airline.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{airline.airline_name}</h3>
                  <span className="text-sm text-gray-500">{airline.airline_code}</span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    {airline.cabin_allowed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm">
                      Cabina: {airline.cabin_allowed ? 'Permitido' : 'No permitido'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {airline.cargo_allowed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm">
                      Bodega: {airline.cargo_allowed ? 'Permitido' : 'No permitido'}
                    </span>
                  </div>

                  {airline.max_weight_cabin && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">
                        Peso máx. cabina: {airline.max_weight_cabin} kg
                      </span>
                    </div>
                  )}

                  {airline.fees && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">
                        Tarifa desde: {airline.fees.cabin} {airline.fees.currency}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/${locale}/volar-con-mascota/${airline.airline_code.toLowerCase()}`}
                  className="block w-full bg-sky-600 text-white py-2 rounded-lg text-center font-medium hover:bg-sky-700 transition-colors"
                >
                  Ver Detalles
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Plane className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">Cargando políticas de aerolíneas...</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-sky-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Documentación Requerida
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FileText className="w-12 h-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certificado Veterinario</h3>
              <p className="text-gray-600">
                Emitido máximo 10 días antes del viaje con vacunas al día.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FileText className="w-12 h-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certificado de Salud</h3>
              <p className="text-gray-600">
                Documento oficial que certifica que tu mascota está sana.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FileText className="w-12 h-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Microchip</h3>
              <p className="text-gray-600">
                Requerido para viajes internacionales en la mayoría de países.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
