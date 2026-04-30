import { Link } from 'react-router';
import { FadeInSection } from '../components/FadeInSection';
import { useCountUp } from '../hooks/useCountUp';
import { useStreamers } from '../hooks/useStreamers';
import logo from '../../imports/Recurso_3.png';
import { ItemSprite } from '../components/sprites/ItemSprite';
import { getPokemonSpriteUrl } from '../config/api';

// FIX: Constante fuera del componente — antes estaba dentro con Math.random()
// lo que causaba nuevos valores en cada render.
const HERO_SILHOUETTES = Array.from({ length: 8 }, () => ({
  id: Math.floor(Math.random() * 151) + 1,
  top: `${Math.floor(Math.random() * 75)}%`,
  left: `${Math.floor(Math.random() * 85)}%`,
  size: Math.floor(Math.random() * 56) + 56,
  duration: `${(Math.random() * 4 + 5).toFixed(1)}s`,
  delay: `${(Math.random() * 4).toFixed(1)}s`,
}));



export function Home() {
  const { streamers, loading, error } = useStreamers();
  const activeStreamers = streamers.filter(s => !s.isEliminated);
  const liveStreamers = streamers.filter(s => s.isLive && !s.isEliminated);

  // Los hooks deben estar antes de cualquier return condicional
  const totalCounter  = useCountUp(streamers.length);
  const activeCounter = useCountUp(activeStreamers.length);
  const gymCounter    = useCountUp(8);

  if (loading) return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#fbbf24] border-t-transparent" />
        <p className="font-['Nunito'] text-gray-400 text-sm">Cargando datos del torneo…</p>
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
    <div className="min-h-screen bg-[#1e1b4b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1e1b4b] to-[#312e81] px-4 py-16 sm:py-24">
        {/* Kanto Pokémon silhouettes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {HERO_SILHOUETTES.map((s, i) => {

            return (
              <img
                key={i}
                src={getPokemonSpriteUrl(s.id)}
                alt=""
                width={s.size}
                height={s.size}
                className="silhouette-drift pixelated"
                style={{
                  position: 'absolute',
                  top: s.top,
                  left: s.left,
                  opacity: 0.04,
                  filter: 'brightness(0) invert(1)',
                  '--drift-duration': s.duration,
                  '--drift-delay': s.delay,
                } as any}
              />
            );
          })}
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-4">
            <img
              src={logo}
              alt="PSL2 Logo"
              className="h-28 sm:h-36 md:h-44 w-auto logo-animated flex-shrink-0"
            />
            <h1 className="font-['Press_Start_2P'] text-3xl sm:text-4xl lg:text-5xl leading-tight text-center md:text-left text-gradient">
              POKÉMON
              <br />
              STREAMERS
              <br />
              LEAGUE
            </h1>
          </div>

          <div className="mb-6 inline-block rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/10 px-4 py-2 font-['Nunito'] text-sm sm:text-base text-[#fbbf24]">
            ✦ Temporada 2 · Twitch ✦
          </div>

          <p className="font-['Nunito'] text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            10+ streamers de habla hispana compiten en Pokémon Añil Definitive Edition bajo las implacables reglas Nuzlocke
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/participantes"
              className="pokeball-btn flex items-center justify-center rounded-xl bg-[#fbbf24] px-6 py-3 font-['Nunito'] font-semibold text-[#1e1b4b] transition-all hover:bg-[#f59e0b] hover:scale-105"
            >
              <ItemSprite
                name="poke-ball"
                alt=""
                className="pokeball-icon w-5 h-5 object-contain"
              />
              Ver participantes
            </Link>
            <Link
              to="/guia"
              className="guide-btn flex items-center justify-center rounded-xl border-2 border-white/30 px-6 py-3 font-['Nunito'] font-semibold text-white transition-all hover:bg-white/10 hover:border-white/60 hover:scale-105"
            >
              <ItemSprite
                name="town-map"
                alt=""
                className="item-icon w-5 h-5 object-contain"
              />
              Guía del juego
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <FadeInSection>
        <section className="border-b border-white/10 px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <ItemSprite
                  name="master-ball"
                  alt=""
                  className="mx-auto mb-3 w-12 h-12"
                />
                <div
                  ref={totalCounter.ref}
                  className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2"
                  aria-label={`${totalCounter.count} participantes`}
                >
                  {totalCounter.count}
                </div>
                <div className="font-['Nunito'] text-sm text-gray-400">Participantes</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <ItemSprite
                  name="bicycle"
                  alt=""
                  className="mx-auto mb-3 w-12 h-12"
                />
                <div
                  ref={activeCounter.ref}
                  className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2"
                  aria-label={`${activeCounter.count} en carrera`}
                >
                  {activeCounter.count}
                </div>
                <div className="font-['Nunito'] text-sm text-gray-400">En carrera</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <ItemSprite
                  name="silph-scope"
                  alt=""
                  className="mx-auto mb-3 w-12 h-12"
                />
                <div
                  ref={gymCounter.ref}
                  className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2"
                  aria-label="8 gimnasios"
                >
                  {gymCounter.count}
                </div>
                <div className="font-['Nunito'] text-sm text-gray-400">Gimnasios</div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Live Streamers Bar */}
      <FadeInSection delay="0.1s">
        <section className="border-b border-white/10 px-4 py-6 bg-white/5" aria-label="Streamers en directo">
          <div className="mx-auto max-w-7xl">
            {liveStreamers.length > 0 ? (
              <>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse" aria-hidden="true" />
                  <span className="font-['Nunito'] text-sm text-gray-300">En vivo ahora</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                  {liveStreamers.map((streamer) => (
                    <a
                      key={streamer.id}
                      href={`https://twitch.tv/${streamer.twitch.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver ${streamer.name} en Twitch (en directo)`}
                      className="flex items-center gap-2 rounded-full border border-[#f43f5e]/30 bg-[#f43f5e]/10 px-4 py-2 whitespace-nowrap hover:bg-[#f43f5e]/20 transition-colors"
                    >
                      <div className="h-2 w-2 rounded-full bg-[#f43f5e]" aria-hidden="true" />
                      <span className="font-['Nunito'] text-sm text-white">{streamer.name}</span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-600" aria-hidden="true" />
                <span className="font-['Nunito'] text-sm text-gray-500">Nadie en directo ahora mismo</span>
              </div>
            )}
          </div>
        </section>
      </FadeInSection>

      {/* Section Cards Grid */}
      <FadeInSection delay="0.15s">
        <section className="px-4 py-16" aria-label="Secciones del sitio">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  to: '/evento',
                  item: 'old-amber',
                  title: 'Evento',
                  desc: 'Conoce más sobre el torneo, formato y premios de PSL2',
                },
                {
                  to: '/participantes',
                  item: 'exp-share',
                  title: 'Participantes',
                  desc: 'Listado completo de streamers, equipos y progreso actual',
                },
                {
                  to: '/guia',
                  item: 'town-map',
                  title: 'Guía',
                  desc: 'Reglas Nuzlocke, iniciales, líderes de gimnasio y consejos',
                },
                {
                  to: '/utilidades',
                  item: 'super-rod',
                  title: 'Utilidades',
                  desc: 'Calculadora de tipos, tabla de efectividad y recursos útiles',
                },
              ].map((card) => (
                <Link
                  key={card.to}
                  to={card.to}
                  className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#fbbf24]/50 hover:bg-white/10"
                >
                  <ItemSprite
                    name={card.item}
                    alt=""
                    className="mb-4 w-10 h-10"
                  />
                  <h2 className="font-['Press_Start_2P'] text-xl mb-3 text-white">{card.title}</h2>
                  <p className="font-['Nunito'] text-gray-400">{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}
