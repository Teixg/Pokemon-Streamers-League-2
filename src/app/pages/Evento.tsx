import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { FadeInSection } from '../components/FadeInSection';
import { streamers, starters } from '../data/streamers';
import { TypeBadge } from '../components/TypeBadge';
import { PokemonSprite } from '../components/sprites/PokemonSprite';
import { Skull, Trophy, Flame, Swords, AlertTriangle, CheckCircle } from 'lucide-react';

const FORMAT_RULES = [
  {
    icon: Swords,
    color: '#fbbf24',
    title: 'Formato individual',
    desc: 'Cada streamer juega su propia partida de forma independiente. No hay enfrentamientos directos entre participantes.',
  },
  {
    icon: Skull,
    color: '#f43f5e',
    title: 'Eliminación por muerte total',
    desc: 'Si todos los Pokémon de un streamer mueren y no puede continuar, queda eliminado del torneo.',
  },
  {
    icon: Trophy,
    color: '#fbbf24',
    title: 'Objetivo: 8 medallas',
    desc: 'El objetivo es derrotar a los 8 líderes de gimnasio y completar la Liga Pokémon. El primero en lograrlo gana.',
  },
  {
    icon: Flame,
    color: '#f97316',
    title: 'Streams en directo',
    desc: 'Las partidas se juegan en stream. El progreso se actualiza en tiempo real en esta web.',
  },
];

const NUZLOCKE_RULES = [
  { ok: true,  text: 'Solo el primer encuentro de cada ruta puede ser capturado' },
  { ok: true,  text: 'Todos los Pokémon capturados deben ser nombrados' },
  { ok: false, text: 'Si un Pokémon se debilita, muere para siempre (debe soltarse o guardarse en caja)' },
  { ok: false, text: 'Modo Hardcore: prohibido usar los Centros Pokémon, solo objetos curativos' },
  { ok: true,  text: 'Se permiten objetos en combate' },
  { ok: true,  text: 'Se permite huir de encuentros salvajes' },
];

const RANDOMLOCKE_RULES = [
  { emoji: '🎲', title: 'Encuentros aleatorios', desc: 'Cualquier Pokémon del juego puede aparecer en cualquier ruta. Un Dragonite en la Ruta 1 es posible... o un Magikarp en el Camino Victoria.' },
  { emoji: '🏁', title: 'Inicial aleatorizado', desc: 'El Pokémon inicial de cada streamer fue elegido al azar. No es necesariamente de Kanto ni de la primera generación.' },
  { emoji: '👥', title: 'Equipos de entrenadores aleatorizados', desc: 'Los Pokémon de todos los entrenadores del juego, incluidos líderes de gimnasio y el Campeón, han sido aleatorizados.' },
  { emoji: '📊', title: 'Estadísticas bases iguales', desc: 'Para que sea justo, el aleatorizador mantiene el mismo "nivel de poder" por grupo evolutivo. No aparecen Pokémon imposibles de derrotar.' },
];

const STARTER_SPRITES: Record<string, number> = { Charmander: 4, Squirtle: 7, Bulbasaur: 1 };

export function Evento() {
  const activeCount   = streamers.filter(s => !s.isEliminated).length;
  const eliminatedCount = streamers.filter(s => s.isEliminated).length;
  const leader = [...streamers].filter(s => !s.isEliminated).sort((a, b) => b.badges - a.badges)[0];

  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="PSL2 · Temporada 2"
          title="EL EVENTO"
          subtitle="Todo sobre el Pokémon Streamers League 2 — el torneo Nuzlocke de la comunidad hispana"
        />

        {/* Live status banner */}
        <FadeInSection>
        <div className="mb-12 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <div className="font-['Press_Start_2P'] text-sm text-[#fbbf24] mb-1">ESTADO ACTUAL</div>
            <p className="font-['Nunito'] text-gray-300 text-sm">
              <span className="text-white font-semibold">{activeCount}</span> streamers siguen en carrera ·{' '}
              <span className="text-[#f43f5e] font-semibold">{eliminatedCount}</span> eliminados
            </p>
            {leader && (
              <p className="font-['Nunito'] text-gray-400 text-sm mt-0.5">
                Líder actual:{' '}
                <span className="text-[#fbbf24] font-semibold">{leader.name}</span>{' '}
                con {leader.badges}/8 medallas
              </p>
            )}
          </div>
          <Link
            to="/participantes"
            className="shrink-0 rounded-xl bg-[#fbbf24] px-5 py-2.5 font-['Nunito'] font-semibold text-sm text-[#1e1b4b] hover:bg-[#f59e0b] transition-colors"
          >
            Ver clasificación →
          </Link>
        </div>
        </FadeInSection>

        {/* Format */}
        <FadeInSection delay="0.05s">
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-gradient">
            Formato del torneo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FORMAT_RULES.map((r) => (
              <div key={r.title} className="rounded-xl border border-white/10 bg-white/5 p-5 flex gap-4">
                <r.icon className="h-8 w-8 shrink-0 mt-0.5" style={{ color: r.color }} />
                <div>
                  <h3 className="font-['Nunito'] font-bold text-white mb-1">{r.title}</h3>
                  <p className="font-['Nunito'] text-sm text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        </FadeInSection>

        {/* Nuzlocke rules */}
        <FadeInSection delay="0.1s">
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-gradient">
            Reglas Nuzlocke aplicadas
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/5 divide-y divide-white/5 overflow-hidden">
            {NUZLOCKE_RULES.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4">
                {rule.ok
                  ? <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  : <AlertTriangle className="h-5 w-5 text-[#f43f5e] shrink-0 mt-0.5" />
                }
                <p className="font-['Nunito'] text-sm text-gray-300 leading-relaxed">{rule.text}</p>
              </div>
            ))}
          </div>
          <p className="font-['Nunito'] text-xs text-gray-500 mt-3">
            <AlertTriangle className="inline h-3 w-3 mr-1 text-[#f43f5e]" />
            Las reglas exactas pueden variar según el criterio del organizador. Consulta el stream para detalles.
          </p>
        </section>
        </FadeInSection>

        {/* Randomlocke rules */}
        <FadeInSection delay="0.12s">
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-2 text-gradient">
            El Randomlocke
          </h2>
          <p className="font-['Nunito'] text-sm text-gray-400 mb-6">
            Además de las reglas Nuzlocke, <span className="text-[#fbbf24] font-semibold">todo el juego está aleatorizad</span>: encuentros, equipos de entrenadores, y el propio Pokémon inicial. Esto convierte cada partida en una aventura completamente distinta.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RANDOMLOCKE_RULES.map((r) => (
              <div key={r.title} className="rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/5 p-5 flex gap-4">
                <span className="text-2xl shrink-0 mt-0.5">{r.emoji}</span>
                <div>
                  <h3 className="font-['Nunito'] font-bold text-white mb-1">{r.title}</h3>
                  <p className="font-['Nunito'] text-sm text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        </FadeInSection>

        {/* Starters */}
        <FadeInSection delay="0.15s">
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-gradient">
            Iniciales disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {starters.map((starter) => {
              const count = streamers.filter(s => s.starter === starter.name).length;
              const spriteId = STARTER_SPRITES[starter.name];
              return (
                <div
                  key={starter.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col items-center text-center gap-3 hover:border-white/20 transition-all"
                >
                  <PokemonSprite
                    id={spriteId}
                    alt={starter.name}
                    className="w-20 h-20 object-contain pixelated"
                  />
                  <div>
                    <h3 className="font-['Nunito'] font-bold text-white text-lg mb-1">{starter.name}</h3>
                    <div className="flex justify-center mb-2">
                      <TypeBadge type={starter.type} size="sm" />
                    </div>
                    <p className="font-['Nunito'] text-xs text-gray-400 mb-2">{starter.description}</p>
                    <p className="font-['Nunito'] text-xs text-gray-500">
                      Elegido por <span className="text-[#fbbf24]">{count}</span> participante{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </FadeInSection>

        {/* Elimination rules */}
        <FadeInSection delay="0.2s">
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-gradient">
            Eliminación
          </h2>
          <div className="rounded-xl border border-[#f43f5e]/20 bg-[#f43f5e]/5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Skull className="h-10 w-10 text-[#f43f5e] shrink-0 mt-1" />
              <div>
                <h3 className="font-['Nunito'] font-bold text-white text-lg mb-2">Muerte total del equipo</h3>
                <p className="font-['Nunito'] text-gray-300 leading-relaxed mb-4">
                  Un participante queda <span className="text-[#f43f5e] font-semibold">eliminado del torneo</span> cuando pierde todos sus Pokémon y no puede continuar la partida. Esto puede ocurrir en cualquier momento: contra un entrenador, un líder de gimnasio o incluso un encuentro salvaje.
                </p>
                <p className="font-['Nunito'] text-sm text-gray-400 leading-relaxed">
                  Los jugadores eliminados aparecen marcados en la sección de <Link to="/participantes" className="text-[#fbbf24] hover:underline">Participantes</Link>. Su progreso queda registrado como homenaje a su carrera.
                </p>
              </div>
            </div>
          </div>
        </section>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection delay="0.25s">
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="font-['Press_Start_2P'] text-sm text-[#fbbf24] mb-3">¿LISTO PARA SEGUIR EL TORNEO?</div>
          <p className="font-['Nunito'] text-gray-400 mb-6">Sigue el progreso de todos los participantes en tiempo real</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/participantes" className="rounded-xl bg-[#fbbf24] px-6 py-3 font-['Nunito'] font-semibold text-[#1e1b4b] hover:bg-[#f59e0b] transition-colors">
              Ver participantes
            </Link>
            <Link to="/guia" className="rounded-xl border border-white/20 px-6 py-3 font-['Nunito'] font-semibold text-white hover:bg-white/10 transition-colors">
              Leer la guía
            </Link>
          </div>
        </div>
        </FadeInSection>
      </div>
    </div>
  );
}
