import { PageHeader } from '../components/PageHeader';
import { typeColors } from '../data/types';
import { FadeInSection } from '../components/FadeInSection';
import { Skull, TrendingDown } from 'lucide-react';
import { SkeletonImage } from '../components/SkeletonImage';
import { PokemonSprite } from '../components/sprites/PokemonSprite';
import { useStreamers } from '../hooks/useStreamers';
import { LoadingScreen } from '../components/LoadingScreen';

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function Cementerio() {
  const { streamers, loading, error } = useStreamers();

  if (loading) return <LoadingScreen message="Descansando en paz a los caidos..." />;


  if (error) return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center">
      <div className="text-center space-y-2 p-6">
        <p className="font-['Press_Start_2P'] text-[#f43f5e] text-sm">Error al cargar</p>
        <p className="font-['Nunito'] text-gray-400 text-sm">{error}</p>
      </div>
    </div>
  );

  const streamerWithDeaths = [...streamers]
    .filter((s) => (s.deaths?.length ?? 0) > 0)
    .sort((a, b) => (b.deaths?.length ?? 0) - (a.deaths?.length ?? 0));

  const totalDeaths = streamers.reduce((acc, s) => acc + (s.deaths?.length ?? 0), 0);

  /** Color de tipo para el streamer (basado en su inicial) */
  const STARTER_COLORS: Record<string, string> = {
    Charmander: typeColors['fire'],
    Squirtle: typeColors['water'],
    Bulbasaur: typeColors['grass'],
  };

  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="PSL2 · Temporada 2"
          title="CEMENTERIO"
          subtitle="Todos los Pokémon que perdieron la vida en el camino. Sus nombres no serán olvidados."
        />

        {/* Stats banner */}
        <FadeInSection>
          <div className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#f43f5e]/30 bg-[#f43f5e]/5 p-5 text-center">
              <Skull className="mx-auto mb-2 h-8 w-8 text-[#f43f5e]" />
              <div className="font-['Press_Start_2P'] text-2xl text-white mb-1">{totalDeaths}</div>
              <div className="font-['Nunito'] text-xs text-gray-400">Muertes totales</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
              <TrendingDown className="mx-auto mb-2 h-8 w-8 text-[#fbbf24]" />
              <div className="font-['Press_Start_2P'] text-2xl text-white mb-1">
                {streamerWithDeaths.length}
              </div>
              <div className="font-['Nunito'] text-xs text-gray-400">Streamers afectados</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="font-['Press_Start_2P'] text-2xl text-[#f43f5e] mb-1">
                {streamerWithDeaths[0]?.name ?? '—'}
              </div>
              <div className="font-['Nunito'] text-xs text-gray-400">Más muertes</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="font-['Press_Start_2P'] text-2xl text-[#fbbf24] mb-1">
                {streamers.filter((s) => s.isEliminated).length}
              </div>
              <div className="font-['Nunito'] text-xs text-gray-400">Eliminados</div>
            </div>
          </div>
        </FadeInSection>

        {/* Per-streamer graveyards */}
        <div className="space-y-10">
          {streamerWithDeaths.map((streamer, sIdx) => {
            const deaths = streamer.deaths ?? [];
            const twitchHandle = streamer.twitch.replace('@', '');
            const accentColor = STARTER_COLORS[streamer.starter] ?? typeColors['normal'];

            return (
              <FadeInSection key={streamer.id} delay={`${sIdx * 0.05}s`}>
                {/* Streamer header */}
                <div className="mb-4 flex items-center gap-4">
                  <a
                    href={`https://twitch.tv/${twitchHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full overflow-hidden border-2"
                      style={{ borderColor: streamer.isEliminated ? '#f43f5e' : accentColor + '80' }}
                    >
                      <SkeletonImage
                        src={`https://unavatar.io/twitch/${twitchHandle}`}
                        alt={streamer.name}
                        className="h-12 w-12 rounded-full object-cover"
                        skeletonClassName="rounded-full"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-initials') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div
                        className="fallback-initials hidden h-12 w-12 items-center justify-center rounded-full font-['Press_Start_2P'] text-xs text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        {getInitials(streamer.name)}
                      </div>
                    </div>
                    <div>
                      <span className="font-['Press_Start_2P'] text-sm text-white">{streamer.name}</span>
                      {streamer.isEliminated && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#f43f5e]/20 border border-[#f43f5e]/40 px-2 py-0.5 font-['Nunito'] text-[10px] text-[#f43f5e]">
                          <Skull className="h-3 w-3" /> Eliminado
                        </span>
                      )}
                    </div>
                  </a>
                  <div className="ml-auto font-['Nunito'] text-sm text-gray-400">
                    <span className="text-[#f43f5e] font-bold">{deaths.length}</span> bajas
                  </div>
                </div>

                {/* Tombstone grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {deaths.map((dead, dIdx) => (
                    <div
                      key={dIdx}
                      className="group rounded-xl border border-[#f43f5e]/20 bg-[#f43f5e]/5 p-3 text-center transition-all hover:border-[#f43f5e]/40 hover:bg-[#f43f5e]/10"
                    >
                      {/* Sprite with grayscale + cross */}
                      <div className="relative mx-auto mb-2 h-14 w-14">
                        <PokemonSprite
                          id={dead.spriteId}
                          alt={dead.name}
                          className="h-14 w-14 object-contain pixelated"
                          style={{
                            filter: 'grayscale(100%) brightness(0.7)',
                          }}
                        />
                        {/* Skull overlay */}
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f43f5e] text-white">
                          <Skull className="h-3 w-3" />
                        </div>
                      </div>

                      {/* Nickname */}
                      <div className="font-['Nunito'] font-bold text-xs text-white mb-0.5 truncate">
                        "{dead.nickname}"
                      </div>
                      {/* Species */}
                      <div className="font-['Nunito'] text-[10px] text-gray-500 mb-1">
                        {dead.name} · Nv.{dead.level}
                      </div>

                      {/* Tooltip-style cause of death — visible on hover */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300">
                        <div className="pt-1 border-t border-[#f43f5e]/20">
                          <p className="font-['Nunito'] text-[9px] text-[#f43f5e] leading-tight">
                            ✝ {dead.killedBy}
                          </p>
                          <p className="font-['Nunito'] text-[9px] text-gray-500 leading-tight mt-0.5">
                            {dead.route}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {sIdx < streamerWithDeaths.length - 1 && (
                  <div className="mt-8 border-b border-white/5" />
                )}
              </FadeInSection>
            );
          })}
        </div>

        {/* Bottom epitaph */}
        <FadeInSection delay="0.3s">
          <div className="mt-16 text-center">
            <p className="font-['Press_Start_2P'] text-xs text-gray-600 leading-relaxed">
              QUE DESCANSEN EN PAZ.<br />EL RANDOMLOCKE NO TIENE PIEDAD.
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
