import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { TypeBadge } from '../components/TypeBadge';
import { types, getTypeEffectiveness } from '../data/types';
import { ExternalLink, Sword, Shield } from 'lucide-react';

export function Utilidades() {
  const [attackType, setAttackType] = useState<string>('');
  const [defendTypes, setDefendTypes] = useState<string[]>([]);

  const toggleDefendType = (type: string) => {
    setDefendTypes((prev) => {
      if (prev.includes(type)) return prev.filter((t) => t !== type);
      if (prev.length < 2) return [...prev, type];
      // replace the last selected when already 2
      return [prev[0], type];
    });
  };

  const combinedEffectiveness =
    attackType && defendTypes.length > 0
      ? defendTypes.reduce((acc, dt) => acc * getTypeEffectiveness(attackType, dt), 1)
      : null;

  const getEffectivenessLabel = (mult: number) => {
    if (mult === 0)    return { text: 'Sin efecto',    color: '#666666', symbol: '0×' };
    if (mult === 0.25) return { text: 'Muy resistente', color: '#f43f5e', symbol: '¼×' };
    if (mult === 0.5)  return { text: 'No muy eficaz', color: '#f87171', symbol: '½×' };
    if (mult === 2)    return { text: 'Super eficaz',  color: '#4ade80', symbol: '2×' };
    if (mult === 4)    return { text: '¡Muy eficaz!',  color: '#00FF00', symbol: '4×' };
    return { text: 'Eficaz', color: '#fbbf24', symbol: '1×' };
  };

  const resources = [
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
  ];

  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="Herramientas y recursos"
          title="UTILIDADES"
          subtitle="Calculadora de tipos, tabla de efectividad y enlaces útiles"
        />

        {/* Type Calculator */}
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Calculadora de Tipos
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Attacker Type */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sword className="h-5 w-5 text-[#f43f5e]" />
                <h3 className="font-['Nunito'] font-bold text-lg text-white">
                  Tipo Atacante
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setAttackType(type)}
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

            {/* Defender Type */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-5 w-5 text-[#fbbf24]" />
                <h3 className="font-['Nunito'] font-bold text-lg text-white">
                  Tipo Defensor
                </h3>
              </div>
              <p className="font-['Nunito'] text-xs text-gray-500 mb-4">Selecciona hasta 2 tipos</p>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleDefendType(type)}
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
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-['Nunito'] text-xs text-gray-500">Seleccionado:</span>
                  {defendTypes.map((t) => <TypeBadge key={t} type={t} size="sm" />)}
                  <button
                    onClick={() => setDefendTypes([])}
                    className="ml-1 font-['Nunito'] text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          {combinedEffectiveness !== null && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
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
                style={{ backgroundColor: getEffectivenessLabel(combinedEffectiveness).color + '20' }}
              >
                <div
                  className="font-['Press_Start_2P'] text-4xl mb-2"
                  style={{ color: getEffectivenessLabel(combinedEffectiveness).color }}
                >
                  {getEffectivenessLabel(combinedEffectiveness).symbol}
                </div>
                <div
                  className="font-['Nunito'] font-bold text-lg"
                  style={{ color: getEffectivenessLabel(combinedEffectiveness).color }}
                >
                  {getEffectivenessLabel(combinedEffectiveness).text}
                </div>
              </div>

              {defendTypes.length === 2 && (
                <p className="font-['Nunito'] text-xs text-gray-500 mt-2">
                  {getTypeEffectiveness(attackType, defendTypes[0])}× · {getTypeEffectiveness(attackType, defendTypes[1])}× = {combinedEffectiveness}×
                </p>
              )}
            </div>
          )}
        </section>

        {/* Type Chart */}
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-4 text-white">
            Tabla de Efectividad
          </h2>
          <p className="font-['Nunito'] text-sm text-gray-400 mb-6">
            Efectividad de cada tipo como <span className="text-white font-semibold">atacante</span>. Los tipos sin entradas hacen daño neutro (1×).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {types.map((atkType) => {
              const superEff = types.filter(def => getTypeEffectiveness(atkType, def) === 2);
              const notEff   = types.filter(def => getTypeEffectiveness(atkType, def) === 0.5);
              const immune   = types.filter(def => getTypeEffectiveness(atkType, def) === 0);

              return (
                <div
                  key={atkType}
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col"
                >
                  {/* Header */}
                  <div className="flex justify-center p-3 border-b border-white/10">
                    <TypeBadge type={atkType} size="sm" />
                  </div>

                  {/* 2× */}
                  {superEff.length > 0 && (
                    <div className="p-2.5 bg-green-950/40 border-b border-green-900/40">
                      <div className="font-['Nunito'] text-xs font-bold text-green-400 mb-1.5">⚡ 2×</div>
                      <div className="flex flex-wrap gap-1">
                        {superEff.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                      </div>
                    </div>
                  )}

                  {/* ½× */}
                  {notEff.length > 0 && (
                    <div className="p-2.5 bg-red-950/40 border-b border-red-900/40">
                      <div className="font-['Nunito'] text-xs font-bold text-red-400 mb-1.5">🛡 ½×</div>
                      <div className="flex flex-wrap gap-1">
                        {notEff.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                      </div>
                    </div>
                  )}

                  {/* 0× */}
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
        <section>
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Recursos Externos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#FFD700]/30 hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{resource.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-['Nunito'] font-bold text-lg text-white mb-2 flex items-center gap-2">
                      {resource.name}
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#FFD700]" />
                    </h3>
                    <p className="font-['Nunito'] text-gray-400">
                      {resource.description}
                    </p>
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