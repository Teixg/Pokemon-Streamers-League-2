import { PageHeader } from '../components/PageHeader';
import { typeColors } from '../data/types';
import { SmartImage } from '../components/SmartImage';
import { FadeInSection } from '../components/FadeInSection';
import { getPokemonSpriteUrl, getBadgeSpriteUrl } from '../config/api';
import { useStreamers } from '../hooks/useStreamers';

const KANTO_BADGES = [
  { id: 1, name: 'Medalla Roca' },
  { id: 2, name: 'Medalla Cascada' },
  { id: 3, name: 'Medalla Trueno' },
  { id: 4, name: 'Medalla Arcoíris' },
  { id: 5, name: 'Medalla Alma' },
  { id: 6, name: 'Medalla Pantano' },
  { id: 7, name: 'Medalla Volcán' },
  { id: 8, name: 'Medalla Tierra' },
] as const;

const STARTER_SPRITE_IDS: Record<string, number> = {
  Charmander: 4,
  Squirtle: 7,
  Bulbasaur: 1,
};

const STARTER_TYPES: Record<string, string> = {
  Charmander: 'fire',
  Squirtle: 'water',
  Bulbasaur: 'grass',
};

function getStarterSpriteUrl(starter: string, spriteUrl?: string): string | null {
  if (spriteUrl) return spriteUrl;
  const id = STARTER_SPRITE_IDS[starter];
  if (!id) return null;
  return getPokemonSpriteUrl(id);
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function Participantes() {
  const { streamers, loading, error } = useStreamers();
  const activeStreamers = [...streamers.filter(s => !s.isEliminated)]
    .sort((a, b) => b.badges - a.badges);
  const eliminatedStreamers = streamers.filter(s => s.isEliminated);

  if (loading) return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#fbbf24] border-t-transparent" />
        <p className="font-['Nunito'] text-gray-400 text-sm">Cargando participantes…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center">
      <div className="text-center space-y-2 p-6">
        <p className="font-['Press_Start_2P'] text-[#f43f5e] text-sm">Error al cargar</p>
        <p className="font-['Nunito'] text-gray-400 text-sm">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="PSL2"
          title="Participantes"
          description="Streamers de habla hispana compitiendo en Pokémon Añil bajo reglas Nuzlocke"
        />

        {/* Active Streamers */}
        <FadeInSection>
          <div className="mb-16">
            <h2 className="font-['Press_Start_2P'] text-xl mb-6 text-gradient">
              En carrera
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeStreamers.map((streamer, index) => {
                const spriteUrl = getStarterSpriteUrl(streamer.starter, streamer.spriteUrl);
                const starterType = STARTER_TYPES[streamer.starter] ?? 'normal';
                const twitchHandle = streamer.twitch.replace('@', '');
                const avatarUrl = `https://unavatar.io/twitch/${twitchHandle}`;

                return (
                  <a
                    key={streamer.id}
                    href={`https://twitch.tv/${twitchHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${streamer.name} en Twitch${streamer.isLive ? ' (en directo)' : ''} — ${streamer.badges}/8 medallas`}
                    className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#fbbf24]/30 hover:bg-white/10 relative"
                  >
                    {/* Rank */}
                    <div className="absolute top-3 right-3 font-['Press_Start_2P'] text-[10px] text-white/30" aria-hidden="true">
                      #{index + 1}
                    </div>

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Avatar con fallback a iniciales */}
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full overflow-hidden border border-white/20">
                        <SmartImage
                          src={avatarUrl}
                          alt={`Avatar de ${streamer.name}`}
                          skeleton
                          fallbackSrc={undefined}
                          className="h-14 w-14 rounded-full object-cover"
                          skeletonClassName="rounded-full"
                          onError={(e) => {
                            // Si falla unavatar, mostrar iniciales coloreadas
                            const img = e.currentTarget;
                            const container = img.closest('.rounded-full') as HTMLElement | null;
                            if (container) {
                              container.innerHTML = `<span
                                class="flex h-14 w-14 items-center justify-center font-['Press_Start_2P'] text-xs text-white"
                                style="background-color:${typeColors[starterType]}"
                              >${getInitials(streamer.name)}</span>`;
                            }
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-['Nunito'] font-bold text-base text-white mb-0.5 truncate">
                          {streamer.name}
                        </h3>
                        <p className="font-['Nunito'] text-xs text-gray-400 mb-1.5">{streamer.twitch}</p>
                        {streamer.isLive && (
                          <div className="flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse" aria-hidden="true" />
                            <span className="font-['Nunito'] text-xs text-[#f43f5e]">EN VIVO</span>
                          </div>
                        )}
                      </div>

                      {/* Sprite del inicial */}
                      {spriteUrl && (
                        <div
                          className="flex-shrink-0 flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
                          style={{ width: 72, height: 72 }}
                        >
                          <SmartImage
                            src={spriteUrl}
                            alt={`Sprite de ${streamer.starter}`}
                            skeleton
                            className="w-14 h-14 object-contain pixelated"
                          />
                        </div>
                      )}
                    </div>

                    {/* Starter */}
                    <div className="mb-4">
                      <div className="font-['Nunito'] text-xs text-gray-500 mb-1">Inicial</div>
                      <div className="font-['Nunito'] text-sm text-white">{streamer.starter}</div>
                    </div>

                    {/* Badges */}
                    <div>
                      <div className="font-['Nunito'] text-xs text-gray-500 mb-2">
                        Medallas: {streamer.badges}/8
                      </div>
                      <div className="flex gap-2 flex-wrap" role="list" aria-label={`${streamer.badges} de 8 medallas conseguidas`}>
                        {KANTO_BADGES.map((badge, i) => {
                          const earned = i < streamer.badges;
                          return (
                            <div key={badge.id} role="listitem" title={earned ? badge.name : `${badge.name} (no conseguida)`}>
                              <SmartImage
                                src={getBadgeSpriteUrl(badge.id)}
                                alt={earned ? badge.name : ''}
                                aria-hidden={!earned}
                                className="w-8 h-8 object-contain transition-all duration-300"
                                style={{
                                  filter: earned ? 'none' : 'grayscale(100%) brightness(0.4)',
                                  opacity: earned ? 1 : 0.5,
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </FadeInSection>

        {/* Eliminated Streamers */}
        {eliminatedStreamers.length > 0 && (
          <FadeInSection delay="0.1s">
            <div>
              <h2 className="font-['Press_Start_2P'] text-xl mb-6 text-gray-500">
                Eliminados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eliminatedStreamers.map((streamer) => {
                  const spriteUrl = getStarterSpriteUrl(streamer.starter, streamer.spriteUrl);
                  const starterType = STARTER_TYPES[streamer.starter] ?? 'normal';
                  const twitchHandle = streamer.twitch.replace('@', '');

                  return (
                    <a
                      key={streamer.id}
                      href={`https://twitch.tv/${twitchHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${streamer.name} — eliminado con ${streamer.badges}/8 medallas`}
                      className="block rounded-xl border border-white/5 bg-white/5 p-6 opacity-50 hover:opacity-60 transition-all"
                    >
                      <div className="flex items-start gap-4 mb-5">
                        <div
                          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full font-['Press_Start_2P'] text-xs text-white grayscale"
                          style={{ backgroundColor: typeColors[starterType] }}
                          aria-hidden="true"
                        >
                          {getInitials(streamer.name)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-['Nunito'] font-bold text-lg text-white line-through mb-0.5 truncate">
                            {streamer.name}
                          </h3>
                          <p className="font-['Nunito'] text-sm text-gray-500 mb-2">{streamer.twitch}</p>
                        </div>

                        {spriteUrl && (
                          <div
                            className="flex-shrink-0 flex items-center justify-center rounded-lg border border-white/5 bg-white/5"
                            style={{ width: 72, height: 72 }}
                          >
                            <SmartImage
                              src={spriteUrl}
                              alt={`Sprite de ${streamer.starter}`}
                              className="w-14 h-14 object-contain grayscale pixelated"
                            />
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="font-['Nunito'] text-xs text-gray-600 mb-1">Inicial</div>
                        <div className="font-['Nunito'] text-sm text-gray-400 line-through">{streamer.starter}</div>
                      </div>

                      <div>
                        <div className="font-['Nunito'] text-xs text-gray-600 mb-2">
                          Medallas: {streamer.badges}/8
                        </div>
                        <div className="flex gap-2 flex-wrap" role="list">
                          {KANTO_BADGES.map((badge, i) => {
                            const earned = i < streamer.badges;
                            return (
                              <div key={badge.id} role="listitem" title={badge.name}>
                                <SmartImage
                                  src={getBadgeSpriteUrl(badge.id)}
                                  alt={earned ? badge.name : ''}
                                  aria-hidden={!earned}
                                  className="w-8 h-8 object-contain"
                                  style={{
                                    filter: 'grayscale(100%) brightness(0.4)',
                                    opacity: earned ? 0.6 : 0.25,
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </FadeInSection>
        )}
      </div>
    </div>
  );
}
