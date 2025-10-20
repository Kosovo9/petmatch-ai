import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { 
  Heart, 
  MapPin, 
  Plane, 
  Stethoscope, 
  ChefHat, 
  Users, 
  ShoppingBag, 
  Watch,
  Accessibility,
  Leaf,
  MessageCircle,
  GraduationCap
} from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white py-20 px-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              PetMatch AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
              El Ecosistema Global Completo para el Cuidado de Mascotas
            </p>
            <p className="text-lg mb-10 text-white/80">
              47 servicios • 120+ páginas SEO • 20 idiomas • 50+ países
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/love-stories`}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ver Historias de Amor
              </Link>
              <Link
                href={`/${locale}/paseo/cdmx`}
                className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white/30"
              >
                Encontrar Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-4">
            8 Módulos Core
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Soluciones completas para cada necesidad de tu mascota
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Love Stories */}
            <Link href={`/${locale}/love-stories`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Historias de Amor</h3>
                <p className="text-gray-600 text-sm">
                  Comparte y verifica historias reales con fotos de adopción
                </p>
              </div>
            </Link>

            {/* GeoAds Premium */}
            <Link href={`/${locale}/geoads`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GeoAds Premium</h3>
                <p className="text-gray-600 text-sm">
                  Publicidad de marcas localizadas por país con dashboard
                </p>
              </div>
            </Link>

            {/* PetMatch Fly */}
            <Link href={`/${locale}/volar-con-mascota`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-200 transition-colors">
                  <Plane className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">PetMatch Fly</h3>
                <p className="text-gray-600 text-sm">
                  Políticas de aerolíneas en tiempo real para viajar con mascotas
                </p>
              </div>
            </Link>

            {/* PetMatch Care */}
            <Link href={`/${locale}/care`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">PetMatch Care</h3>
                <p className="text-gray-600 text-sm">
                  White Pages verificadas de profesionales + SOS 24/7
                </p>
              </div>
            </Link>

            {/* PetMatch Chef */}
            <Link href={`/${locale}/chef`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <ChefHat className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">PetMatch Chef</h3>
                <p className="text-gray-600 text-sm">
                  IA nutricional personalizada + receta gratis semanal
                </p>
              </div>
            </Link>

            {/* Microinfluencers */}
            <Link href={`/${locale}/microinfluencers`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Microinfluencers</h3>
                <p className="text-gray-600 text-sm">
                  20% comisión + dashboard de seguimiento de ventas
                </p>
              </div>
            </Link>

            {/* Gadgets Afiliados */}
            <Link href={`/${locale}/gadgets`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                  <ShoppingBag className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gadgets Afiliados</h3>
                <p className="text-gray-600 text-sm">
                  Productos de Temu, Amazon y Mercado Libre por región
                </p>
              </div>
            </Link>

            {/* Smart Collar + SaaS */}
            <Link href={`/${locale}/smart-collar`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Watch className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Collar Smart + SaaS</h3>
                <p className="text-gray-600 text-sm">
                  Geolocalización en tiempo real + métricas de salud
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Completeness Modules */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-4">
            8 Módulos de Completitud
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Funcionalidades avanzadas para un ecosistema completo
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href={`/${locale}/accessibility`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary-200">
                <Accessibility className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Accesibilidad</h3>
                <p className="text-gray-600 text-sm">Mascotas con discapacidad</p>
              </div>
            </Link>

            <Link href={`/${locale}/esg`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200">
                <Leaf className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">ESG</h3>
                <p className="text-gray-600 text-sm">Huella de carbono + árboles</p>
              </div>
            </Link>

            <Link href={`/${locale}/comunidad`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200">
                <MessageCircle className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Comunidad</h3>
                <p className="text-gray-600 text-sm">Foros + duelo + webinars</p>
              </div>
            </Link>

            <Link href={`/${locale}/exoticos`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200">
                <Heart className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Especies Exóticas</h3>
                <p className="text-gray-600 text-sm">Hurones, reptiles, aves</p>
              </div>
            </Link>

            <Link href={`/${locale}/post-adopcion`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-pink-200">
                <Heart className="w-8 h-8 text-pink-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Post-Adopción</h3>
                <p className="text-gray-600 text-sm">90 días + NFT + donaciones</p>
              </div>
            </Link>

            <Link href={`/${locale}/education/cursos`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200">
                <GraduationCap className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Educación</h3>
                <p className="text-gray-600 text-sm">Cursos certificados</p>
              </div>
            </Link>

            <Link href={`/${locale}/integraciones`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-200">
                <Watch className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Integraciones</h3>
                <p className="text-gray-600 text-sm">Wearables + API vet</p>
              </div>
            </Link>

            <Link href={`/${locale}/seguridad`} className="group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-red-200">
                <Watch className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Seguridad</h3>
                <p className="text-gray-600 text-sm">Biometría + geolocalización</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">47</div>
              <div className="text-white/80">Rutas Activas</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">120+</div>
              <div className="text-white/80">Páginas SEO</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">20</div>
              <div className="text-white/80">Idiomas</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80">Países</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Únete a miles de dueños de mascotas que confían en PetMatch AI
            </p>
            <Link
              href={`/${locale}/registro`}
              className="inline-block bg-primary-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
            >
              Crear Cuenta Gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
