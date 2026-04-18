import { PageHeader } from '../components/PageHeader';
import { streamers } from '../data/streamers';
import { typeColors } from '../data/types';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { FadeInSection } from '../components/FadeInSection';
import { SkeletonImage } from '../components/SkeletonImage';

// Kanto badges in gym order (PokeAPI sprite IDs 1-8)
const KANTO_BADGES = [
  { id: 1, name: 'Medalla Roca' },
  { id: 2, name: 'Medalla Cascada' },
  { id: 3, name: 'Medalla Trueno' },
  { id: 4, name: 'Medalla Arcoíris' },
  { id: 5, name: 'Medalla Alma' },
  { id: 6, name: 'Medalla Pantano' },
  { id: 7, name: 'Medalla Volcán' },
  { id: 8, name: 'Medalla Tierra' },
];

const STARTER_SPRITE_IDS: Record<string, number> = {
  Charmander: 4,
  Squirtle: 7,
  Bulbasaur: 1,
};

function getBadgeSpriteUrl(badgeId: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/${badgeId}.png`;
}

function getStarterSpriteUrl(starter: string, spriteUrl?: string) {
  if (spriteUrl) return spriteUrl;
  const id = STARTER_SPRITE_IDS[starter];
  if (!id) return null;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function getStarterType(starter: string) {
  if (starter === 'Charmander') return 'fire';
  if (starter === 'Squirtle') return 'water';
  if (starter === 'Bulbasaur') return 'grass';
  return 'normal';
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function Participantes() {
  const activeStreamers = [...streamers.filter(s => !s.isEliminated)]
    .sort((a, b) => b.badges - a.badges);
  const eliminatedStreamers = streamers.filter(s => s.isEliminated);

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
              const starterType = getStarterType(streamer.starter);
              const twitchHandle = streamer.twitch.replace('@', '');

              return (
                <a
                  key={streamer.id}
                  href={`https://twitch.tv/${twitchHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#fbbf24]/30 hover:bg-white/10 relative"
                >
                  {/* Rank position */}
                  <div className="absolute top-3 right-3 font-['Press_Start_2P'] text-[10px] text-white/30">
                    #{index + 1}
                  </div>

                  {/* Header: avatar + info + sprite */}
                  <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full overflow-hidden border border-white/20">
                    <SkeletonImage
                      src={`https://unavatar.io/twitch/${streamer.twitch.replace('@', '')}`}
                      alt={streamer.name}
                      className="h-14 w-14 rounded-full object-cover"
                      skeletonClassName="rounded-full"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-full font-['Press_Start_2P'] text-xs text-white"
                      style={{ backgroundColor: typeColors[starterType] }}
                    >
                      {getInitials(streamer.name)}
                    </div>
                  </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Nunito'] font-bold text-base text-white mb-0.5 truncate">
                        {streamer.name}
                      </h3>
                      <p className="font-['Nunito'] text-xs text-gray-400 mb-1.5">
                        {streamer.twitch}
                      </p>
                      {streamer.isLive && (
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse"></div>
                          <span className="font-['Nunito'] text-xs text-[#f43f5e]">EN VIVO</span>
                        </div>
                      )}
                    </div>

                    {/* Game sprite */}
                    {spriteUrl && (
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
                        style={{ width: 72, height: 72 }}
                      >
                        <SkeletonImage
                          src={spriteUrl}
                          alt={`Sprite de ${streamer.starter}`}
                          className="w-14 h-14 object-contain"
                          style={{ imageRendering: 'pixelated' }}
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
                    <div className="flex gap-2 flex-wrap">
                      {KANTO_BADGES.map((badge, i) => {
                        const earned = i < streamer.badges;
                        return (
                          <div key={badge.id} title={badge.name} className="flex flex-col items-center">
                            <ImageWithFallback
                              src={getBadgeSpriteUrl(badge.id)}
                              alt={badge.name}
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
                const starterType = getStarterType(streamer.starter);

                const twitchHandle = streamer.twitch.replace('@', '');

              return (
                <a
                  key={streamer.id}
                  href={`https://twitch.tv/${twitchHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/5 bg-white/5 p-6 opacity-50 hover:opacity-60 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full font-['Press_Start_2P'] text-xs text-white grayscale"
                        style={{ backgroundColor: typeColors[starterType] }}
                      >
                        {getInitials(streamer.name)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-['Nunito'] font-bold text-lg text-white line-through mb-0.5 truncate">
                          {streamer.name}
                        </h3>
                        <p className="font-['Nunito'] text-sm text-gray-500 mb-2">
                          {streamer.twitch}
                        </p>
                      </div>

                      {spriteUrl && (
                        <div
                          className="flex-shrink-0 flex items-center justify-center rounded-lg border border-white/5 bg-white/5"
                          style={{ width: 72, height: 72 }}
                        >
                          <ImageWithFallback
                            src={spriteUrl}
                            alt={`Sprite de ${streamer.starter}`}
                            className="w-14 h-14 object-contain grayscale"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="font-['Nunito'] text-xs text-gray-600 mb-1">Inicial</div>
                      <div className="font-['Nunito'] text-sm text-gray-400 line-through">
                        {streamer.starter}
                      </div>
                    </div>

                    <div>
                      <div className="font-['Nunito'] text-xs text-gray-600 mb-2">
                        Medallas: {streamer.badges}/8
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {KANTO_BADGES.map((badge, i) => {
                          const earned = i < streamer.badges;
                          return (
                            <div key={badge.id} title={badge.name}>
                              <ImageWithFallback
                                src={getBadgeSpriteUrl(badge.id)}
                                alt={badge.name}
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