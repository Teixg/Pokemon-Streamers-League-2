import { Link } from 'react-router';
import { streamers } from '../data/streamers';
import { FadeInSection } from '../components/FadeInSection';
import { useCountUp } from '../hooks/useCountUp';
import logo from '../../imports/Recurso_3.png';

const HERO_SILHOUETTES = Array.from({ length: 8 }, () => ({
  id: Math.floor(Math.random() * 151) + 1,
  top: `${Math.floor(Math.random() * 75)}%`,
  left: `${Math.floor(Math.random() * 85)}%`,
  size: Math.floor(Math.random() * 56) + 56,
  duration: `${(Math.random() * 4 + 5).toFixed(1)}s`,
  delay: `${(Math.random() * 4).toFixed(1)}s`,
}));

export function Home() {
  const activeStreamers = streamers.filter(s => !s.isEliminated);
  const liveStreamers = streamers.filter(s => s.isLive && !s.isEliminated);

  const totalCounter  = useCountUp(streamers.length);
  const activeCounter = useCountUp(activeStreamers.length);
  const gymCounter    = useCountUp(8);

  return (
    <div className="min-h-screen bg-[#1e1b4b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1e1b4b] to-[#312e81] px-4 py-16 sm:py-24">
        {/* Kanto Pokémon silhouettes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {HERO_SILHOUETTES.map((s, i) => (
            <img
              key={i}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${s.id}.png`}
              alt=""
              width={s.size}
              height={s.size}
              className="silhouette-drift"
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                opacity: 0.04,
                filter: 'brightness(0) invert(1)',
                imageRendering: 'pixelated',
                '--drift-duration': s.duration,
                '--drift-delay': s.delay,
              } as React.CSSProperties}
            />
          ))}
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
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                alt=""
                className="pokeball-icon"
                style={{ width: 20, height: 20, objectFit: 'contain' }}
              />
              Ver participantes
            </Link>
            <Link
              to="/guia"
              className="guide-btn flex items-center justify-center rounded-xl border-2 border-white/30 px-6 py-3 font-['Nunito'] font-semibold text-white transition-all hover:bg-white/10 hover:border-white/60 hover:scale-105"
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png"
                alt=""
                className="item-icon"
                style={{ width: 20, height: 20, objectFit: 'contain' }}
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
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
                alt=""
                className="mx-auto mb-3"
                style={{ width: 48, height: 48, objectFit: 'contain', imageRendering: 'pixelated' }}
              />
              <div ref={totalCounter.ref} className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2">
                {totalCounter.count}
              </div>
              <div className="font-['Nunito'] text-sm text-gray-400">Participantes</div>
            </div>
            
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/bicycle.png"
                alt=""
                className="mx-auto mb-3"
                style={{ width: 48, height: 48, objectFit: 'contain', imageRendering: 'pixelated' }}
              />
              <div ref={activeCounter.ref} className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2">
                {activeCounter.count}
              </div>
              <div className="font-['Nunito'] text-sm text-gray-400">En carrera</div>
            </div>
            
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/silph-scope.png"
                alt=""
                className="mx-auto mb-3"
                style={{ width: 48, height: 48, objectFit: 'contain', imageRendering: 'pixelated' }}
              />
              <div ref={gymCounter.ref} className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2">
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
      <section className="border-b border-white/10 px-4 py-6 bg-white/5">
        <div className="mx-auto max-w-7xl">
          {liveStreamers.length > 0 ? (
            <>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse"></div>
                <span className="font-['Nunito'] text-sm text-gray-300">En vivo ahora</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                {liveStreamers.map((streamer) => (
                  <a
                    key={streamer.id}
                    href={`https://twitch.tv/${streamer.twitch.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-[#f43f5e]/30 bg-[#f43f5e]/10 px-4 py-2 whitespace-nowrap hover:bg-[#f43f5e]/20 transition-colors"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#f43f5e]"></div>
                    <span className="font-['Nunito'] text-sm text-white">{streamer.name}</span>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-600"></div>
              <span className="font-['Nunito'] text-sm text-gray-500">Nadie en directo ahora mismo</span>
            </div>
          )}
        </div>
      </section>
      </FadeInSection>

      {/* Section Cards Grid */}
      <FadeInSection delay="0.15s">
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/evento"
              className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#fbbf24]/50 hover:bg-white/10"
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-amber.png"
                alt=""
                className="mb-4"
                style={{ width: 40, height: 40, objectFit: 'contain', imageRendering: 'pixelated' }}
              />
              <h2 className="font-['Press_Start_2P'] text-xl mb-3 text-white">
                Evento
              </h2>
              <p className="font-['Nunito'] text-gray-400">
                Conoce más sobre el torneo, formato y premios de PSL2
              </p>
            </Link>

            <Link
              to="/participantes"
            className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#fbbf24]/50 hover:bg-white/10"
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png"
                alt=""
                className="mb-4"
                style={{ width: 40, height: 40, objectFit: 'contain', imageRendering: 'pixelated' }}
              />
              <h2 className="font-['Press_Start_2P'] text-xl mb-3 text-white">
                Participantes
              </h2>
              <p className="font-['Nunito'] text-gray-400">
                Listado completo de streamers, equipos y progreso actual
              </p>
            </Link>

            <Link
              to="/guia"
              className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#fbbf24]/50 hover:bg-white/10"
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png"
                alt=""
                className="mb-4"
                style={{ width: 40, height: 40, objectFit: 'contain', imageRendering: 'pixelated' }}
              />
              <h2 className="font-['Press_Start_2P'] text-xl mb-3 text-white">
                Guía
              </h2>
              <p className="font-['Nunito'] text-gray-400">
                Reglas Nuzlocke, iniciales, líderes de gimnasio y consejos
              </p>
            </Link>

            <Link
              to="/utilidades"
            className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#fbbf24]/50 hover:bg-white/10"
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-rod.png"
                alt=""
                className="mb-4"
                style={{ width: 40, height: 40, objectFit: 'contain', imageRendering: 'pixelated' }}
              />
              <h2 className="font-['Press_Start_2P'] text-xl mb-3 text-white">
                Utilidades
              </h2>
              <p className="font-['Nunito'] text-gray-400">
                Calculadora de tipos, tabla de efectividad y recursos útiles
              </p>
            </Link>
          </div>
        </div>
      </section>
      </FadeInSection>
    </div>
  );
}