import { createSupabaseServer } from '@/lib/supabase/server';
import { Heart, ThumbsUp, Share2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Historias de Amor - Adopciones Verificadas | PetMatch AI',
  description: 'Lee historias reales de adopción de mascotas con fotos verificadas. Comparte tu historia de amor con tu mascota adoptada.',
};

interface LoveStory {
  id: string;
  title: string;
  story: string;
  photos: string[];
  verified: boolean;
  likes: number;
  created_at: string;
  user_id: string;
  pet_id: string;
}

export default async function LoveStoriesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const supabase = createSupabaseServer();

  const { data: stories, error } = await supabase
    .from('love_stories')
    .select('*')
    .eq('verified', true)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching love stories:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white py-16">
        <div className="container-custom text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 fill-white" />
          <h1 className="text-5xl font-display font-bold mb-4">
            Historias de Amor
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Historias reales de adopción verificadas con fotos. Cada historia es una vida transformada.
          </p>
          <Link
            href={`/${locale}/love-stories/nueva`}
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Comparte tu Historia
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b py-8">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">
                {stories?.length || 0}
              </div>
              <div className="text-gray-600">Historias Verificadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">
                {stories?.reduce((acc, s) => acc + s.likes, 0) || 0}
              </div>
              <div className="text-gray-600">Corazones Recibidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600">Historias Reales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="container-custom py-12">
        {stories && stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story: LoveStory) => (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {story.photos && story.photos.length > 0 ? (
                    <img
                      src={story.photos[0]}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white text-6xl">
                      ❤️
                    </div>
                  )}
                  {story.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      ✓ Verificada
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {story.story}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(story.created_at, locale)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{story.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Compartir</span>
                    </button>
                    <Link
                      href={`/${locale}/love-stories/${story.id}`}
                      className="ml-auto text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Leer más →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-2">
              Aún no hay historias
            </h2>
            <p className="text-gray-600 mb-6">
              Sé el primero en compartir tu historia de adopción
            </p>
            <Link
              href={`/${locale}/love-stories/nueva`}
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700"
            >
              Compartir mi Historia
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-50 to-red-50 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            ¿Adoptaste una mascota?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comparte tu historia y ayuda a inspirar a otros a adoptar. Todas las historias son verificadas con fotos.
          </p>
          <Link
            href={`/${locale}/love-stories/nueva`}
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
          >
            Compartir mi Historia de Amor
          </Link>
        </div>
      </div>
    </div>
  );
}
