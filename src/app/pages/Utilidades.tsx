import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { TypeBadge } from '../components/TypeBadge';
import { types, getTypeEffectiveness, getCombinedEffectiveness, getEffectivenessLabel } from '../data/types';
import { ExternalLink, Sword, Shield } from 'lucide-react';

const MAX_DEFEND_TYPES = 2;

const RESOURCES = [
  {
    icon: '📊',
    name: 'Pokémon DB',
    description: 'Base de datos completa de Pokémon, movimientos y habilidades',
    url: 'https://pokemondb.net',
  },
  {
    icon: '🎮',
    name: 'Serebii',
    description: 'Guías detalladas, noticias y recursos de Pokémon',
    url: 'https://serebii.net',
  },
  {
    icon: '⚔️',
    name: 'Damage Calculator',
    description: 'Calculadora avanzada de daño para batallas competitivas',
    url: 'https://calc.pokemonshowdown.com',
  },
  {
    icon: '📖',
    name: 'Nuzlocke University',
    description: 'Guías y estrategias para completar Nuzlockes exitosamente',
    url: 'https://nuzlockeuniversity.ca',
  },
] as const;

export function Utilidades() {
  const [attackType, setAttackType] = useState<string>('');
  const [defendTypes, setDefendTypes] = useState<string[]>([]);

  const toggleDefendType = (type: string) => {
    setDefendTypes((prev) => {
      if (prev.includes(type)) return prev.filter((t) => t !== type);
      if (prev.length < MAX_DEFEND_TYPES) return [...prev, type];
      // Cuando ya hay 2 seleccionados: reemplazar el último
      return [prev[0], type];
    });
  };

  const combinedEffectiveness =
    attackType && defendTypes.length > 0
      ? getCombinedEffectiveness(attackType, defendTypes)
      : null;

  const effectivenessInfo = combinedEffectiveness !== null
    ? getEffectivenessLabel(combinedEffectiveness)
    : null;

  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="PSL2 · Temporada 2"
          title="UTILIDADES"
          subtitle="Calculadora de tipos, tabla de efectividad y enlaces útiles"
        />

        {/* Type Calculator */}
        <section className="mb-16" aria-label="Calculadora de tipos">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Calculadora de Tipos
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Attacker */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sword className="h-5 w-5 text-[#f43f5e]" aria-hidden="true" />
                <h3 className="font-['Nunito'] font-bold text-lg text-white">Tipo Atacante</h3>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar tipo atacante">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setAttackType(type === attackType ? '' : type)}
                    aria-pressed={attackType === type}
                    aria-label={`Atacante: ${type}`}
                    className={`transition-all rounded-lg ${
                      attackType === type
                        ? 'ring-2 ring-white scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <TypeBadge type={type} size="sm" />
                  </button>
                ))}
              </div>
            </div>

            {/* Defender */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-5 w-5 text-[#fbbf24]" aria-hidden="true" />
                <h3 className="font-['Nunito'] font-bold text-lg text-white">Tipo Defensor</h3>
              </div>
              <p className="font-['Nunito'] text-xs text-gray-500 mb-4">
                Selecciona hasta {MAX_DEFEND_TYPES} tipos
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar tipos defensores">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleDefendType(type)}
                    aria-pressed={defendTypes.includes(type)}
                    aria-label={`Defensor: ${type}`}
                    className={`transition-all rounded-lg ${
                      defendTypes.includes(type)
                        ? 'ring-2 ring-white scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <TypeBadge type={type} size="sm" />
                  </button>
                ))}
              </div>

              {defendTypes.length > 0 && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="font-['Nunito'] text-xs text-gray-500">Seleccionado:</span>
                  {defendTypes.map((t) => <TypeBadge key={t} type={t} size="sm" />)}
                  <button
                    onClick={() => setDefendTypes([])}
                    aria-label="Limpiar tipos defensores"
                    className="ml-1 font-['Nunito'] text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          {effectivenessInfo && combinedEffectiveness !== null && (
            <div
              className="rounded-xl border border-white/10 bg-white/5 p-8 text-center"
              role="status"
              aria-live="polite"
              aria-label={`Resultado: ${effectivenessInfo.text} — ${effectivenessInfo.symbol}`}
            >
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                <span className="font-['Nunito'] text-gray-400">Ataque tipo</span>
                <TypeBadge type={attackType} size="md" />
                <span className="font-['Nunito'] text-gray-400">contra</span>
                {defendTypes.map((t, i) => (
                  <span key={t} className="flex items-center gap-1">
                    {i > 0 && <span className="font-['Nunito'] text-gray-500 text-xs">+</span>}
                    <TypeBadge type={t} size="md" />
                  </span>
                ))}
              </div>

              <div
                className="inline-block rounded-xl px-8 py-4 mb-2"
                style={{ backgroundColor: effectivenessInfo.color + '20' }}
              >
                <div
                  className="font-['Press_Start_2P'] text-4xl mb-2"
                  style={{ color: effectivenessInfo.color }}
                >
                  {effectivenessInfo.symbol}
                </div>
                <div
                  className="font-['Nunito'] font-bold text-lg"
                  style={{ color: effectivenessInfo.color }}
                >
                  {effectivenessInfo.text}
                </div>
              </div>

              {defendTypes.length === 2 && (
                <p className="font-['Nunito'] text-xs text-gray-500 mt-2">
                  {getTypeEffectiveness(attackType, defendTypes[0])}×
                  {' · '}
                  {getTypeEffectiveness(attackType, defendTypes[1])}×
                  {' = '}
                  {combinedEffectiveness}×
                </p>
              )}
            </div>
          )}

          {/* Estado vacío: guiar al usuario */}
          {!attackType && (
            <p className="font-['Nunito'] text-sm text-gray-600 text-center mt-4">
              Selecciona un tipo atacante para comenzar
            </p>
          )}
          {attackType && defendTypes.length === 0 && (
            <p className="font-['Nunito'] text-sm text-gray-600 text-center mt-4">
              Ahora selecciona uno o dos tipos defensores
            </p>
          )}
        </section>

        {/* Type Chart */}
        <section className="mb-16" aria-label="Tabla de efectividad de tipos">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-4 text-white">
            Tabla de Efectividad
          </h2>
          <p className="font-['Nunito'] text-sm text-gray-400 mb-6">
            Efectividad de cada tipo como{' '}
            <span className="text-white font-semibold">atacante</span>.
            Los tipos sin entradas hacen daño neutro (1×).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {types.map((atkType) => {
              const superEff  = types.filter(def => getTypeEffectiveness(atkType, def) === 2);
              const superEff4 = types.filter(def => getTypeEffectiveness(atkType, def) === 4);
              const notEff    = types.filter(def => getTypeEffectiveness(atkType, def) === 0.5);
              const immune    = types.filter(def => getTypeEffectiveness(atkType, def) === 0);

              return (
                <div
                  key={atkType}
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col"
                >
                  <div className="flex justify-center p-3 border-b border-white/10">
                    <TypeBadge type={atkType} size="sm" />
                  </div>

                  {superEff4.length > 0 && (
                    <div className="p-2.5 bg-emerald-950/60 border-b border-emerald-900/40">
                      <div className="font-['Nunito'] text-xs font-bold text-emerald-300 mb-1.5">⚡ 4×</div>
                      <div className="flex flex-wrap gap-1">
                        {superEff4.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                      </div>
                    </div>
                  )}

                  {superEff.length > 0 && (
                    <div className="p-2.5 bg-green-950/40 border-b border-green-900/40">
                      <div className="font-['Nunito'] text-xs font-bold text-green-400 mb-1.5">⚡ 2×</div>
                      <div className="flex flex-wrap gap-1">
                        {superEff.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                      </div>
                    </div>
                  )}

                  {notEff.length > 0 && (
                    <div className="p-2.5 bg-red-950/40 border-b border-red-900/40">
                      <div className="font-['Nunito'] text-xs font-bold text-red-400 mb-1.5">🛡 ½×</div>
                      <div className="flex flex-wrap gap-1">
                        {notEff.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                      </div>
                    </div>
                  )}

                  {immune.length > 0 && (
                    <div className="p-2.5 bg-white/5">
                      <div className="font-['Nunito'] text-xs font-bold text-gray-500 mb-1.5">✗ 0×</div>
                      <div className="flex flex-wrap gap-1">
                        {immune.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* External Resources */}
        <section aria-label="Recursos externos">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Recursos Externos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${resource.name} — ${resource.description} (abre en nueva pestaña)`}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#FFD700]/30 hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl" aria-hidden="true">{resource.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-['Nunito'] font-bold text-lg text-white mb-2 flex items-center gap-2">
                      {resource.name}
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#FFD700]" aria-hidden="true" />
                    </h3>
                    <p className="font-['Nunito'] text-gray-400">{resource.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
