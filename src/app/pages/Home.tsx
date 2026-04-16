import { Link } from 'react-router';
import { Users, Trophy, MapPin, Sparkles } from 'lucide-react';
import { streamers } from '../data/streamers';
import logo from '../../imports/Recurso_3.png';

const HERO_SILHOUETTES = Array.from({ length: 8 }, () => ({
  id: Math.floor(Math.random() * 151) + 1,
  top: `${Math.floor(Math.random() * 75)}%`,
  left: `${Math.floor(Math.random() * 85)}%`,
  size: Math.floor(Math.random() * 56) + 56,
}));

export function Home() {
  const activeStreamers = streamers.filter(s => !s.isEliminated);
  const liveStreamers = streamers.filter(s => s.isLive && !s.isEliminated);

  return (
    <div className="min-h-screen bg-[#1e1b4b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1e1b4b] to-[#312e81] px-4 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-[#fbbf24] blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#f43f5e] blur-3xl"></div>
          {/* Pokéball decoration */}
          <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full border-4 border-white/20"></div>
          <div className="absolute bottom-1/4 right-1/3 h-16 w-16 rounded-full border-4 border-[#fbbf24]/20"></div>
        </div>

        {/* Kanto Pokémon silhouettes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {HERO_SILHOUETTES.map((s, i) => (
            <img
              key={i}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${s.id}.png`}
              alt=""
              width={s.size}
              height={s.size}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                opacity: 0.04,
                filter: 'brightness(0) invert(1)',
                imageRendering: 'pixelated',
              }}
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
            <h1 className="font-['Press_Start_2P'] text-3xl sm:text-4xl lg:text-5xl leading-tight text-white text-center md:text-left">
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
      <section className="border-b border-white/10 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <Users className="mx-auto mb-3 h-8 w-8 text-[#fbbf24]" />
              <div className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2">
                {streamers.length}
              </div>
              <div className="font-['Nunito'] text-sm text-gray-400">Participantes</div>
            </div>
            
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <Trophy className="mx-auto mb-3 h-8 w-8 text-[#fbbf24]" />
              <div className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2">
                {activeStreamers.length}
              </div>
              <div className="font-['Nunito'] text-sm text-gray-400">En carrera</div>
            </div>
            
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <MapPin className="mx-auto mb-3 h-8 w-8 text-[#fbbf24]" />
              <div className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-white mb-2">8</div>
              <div className="font-['Nunito'] text-sm text-gray-400">Gimnasios</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Streamers Bar */}
      <section className="border-b border-white/10 px-4 py-6 bg-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse"></div>
            <span className="font-['Nunito'] text-sm text-gray-300">En vivo ahora</span>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
            {liveStreamers.map((streamer) => (
              <div
                key={streamer.id}
                className="flex items-center gap-2 rounded-full border border-[#f43f5e]/30 bg-[#f43f5e]/10 px-4 py-2 whitespace-nowrap"
              >
                <div className="h-2 w-2 rounded-full bg-[#f43f5e]"></div>
                <span className="font-['Nunito'] text-sm text-white">{streamer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Cards Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/"
              className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#fbbf24]/50 hover:bg-white/10"
            >
              <Sparkles className="mb-4 h-10 w-10 text-[#fbbf24]" />
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
              <Users className="mb-4 h-10 w-10 text-[#fbbf24]" />
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
              <MapPin className="mb-4 h-10 w-10 text-[#fbbf24]" />
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
              <Trophy className="mb-4 h-10 w-10 text-[#fbbf24]" />
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
    </div>
  );
}