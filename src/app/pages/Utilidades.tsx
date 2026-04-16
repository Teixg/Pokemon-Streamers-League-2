import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { TypeBadge } from '../components/TypeBadge';
import { types, typeColors, getTypeEffectiveness } from '../data/types';
import { ExternalLink, Sword, Shield } from 'lucide-react';

export function Utilidades() {
  const [attackType, setAttackType] = useState<string>('');
  const [defendType, setDefendType] = useState<string>('');

  const effectiveness = attackType && defendType ? getTypeEffectiveness(attackType, defendType) : null;

  const getEffectivenessLabel = (mult: number) => {
    if (mult === 0) return { text: 'Sin efecto', color: '#666', symbol: '0×' };
    if (mult === 0.5) return { text: 'No muy eficaz', color: '#f43f5e', symbol: '½×' };
    if (mult === 2) return { text: 'Super eficaz', color: '#00FF00', symbol: '2×' };
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
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setAttackType(type)}
                    className={`rounded-lg px-3 py-2 font-['Nunito'] text-sm capitalize transition-all ${
                      attackType === type
                        ? 'ring-2 ring-white scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: typeColors[type], color: 'white' }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Defender Type */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-[#fbbf24]" />
                <h3 className="font-['Nunito'] font-bold text-lg text-white">
                  Tipo Defensor
                </h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setDefendType(type)}
                    className={`rounded-lg px-3 py-2 font-['Nunito'] text-sm capitalize transition-all ${
                      defendType === type
                        ? 'ring-2 ring-white scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: typeColors[type], color: 'white' }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          {effectiveness !== null && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="mb-4">
                <span className="font-['Nunito'] text-gray-400">
                  Ataque tipo{' '}
                </span>
                <TypeBadge type={attackType} size="md" />
                <span className="font-['Nunito'] text-gray-400 mx-2">
                  contra{' '}
                </span>
                <TypeBadge type={defendType} size="md" />
              </div>
              
              <div
                className="inline-block rounded-xl px-8 py-4 mb-2"
                style={{ backgroundColor: getEffectivenessLabel(effectiveness).color + '20' }}
              >
                <div
                  className="font-['Press_Start_2P'] text-4xl mb-2"
                  style={{ color: getEffectivenessLabel(effectiveness).color }}
                >
                  {getEffectivenessLabel(effectiveness).symbol}
                </div>
                <div
                  className="font-['Nunito'] font-bold text-lg"
                  style={{ color: getEffectivenessLabel(effectiveness).color }}
                >
                  {getEffectivenessLabel(effectiveness).text}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Type Chart */}
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Tabla de Efectividad
          </h2>
          
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
            <div className="min-w-max">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-[#1e1b4b] border-b border-r border-white/10 p-3">
                      <span className="font-['Nunito'] text-xs text-gray-400">ATK → DEF ↓</span>
                    </th>
                    {types.map((type) => (
                      <th key={type} className="border-b border-white/10 p-2">
                        <div className="flex items-center justify-center">
                          <div
                            className="h-8 w-8 rounded-md flex items-center justify-center font-['Nunito'] text-xs font-bold text-white capitalize"
                            style={{ backgroundColor: typeColors[type] }}
                            title={type}
                          >
                            {type.slice(0, 1).toUpperCase()}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {types.map((defendType) => (
                    <tr key={defendType}>
                      <td className="sticky left-0 z-10 bg-[#1e1b4b] border-r border-white/10 p-2">
                        <div
                          className="rounded-md px-3 py-1.5 font-['Nunito'] text-xs font-bold text-white capitalize text-center"
                          style={{ backgroundColor: typeColors[defendType] }}
                        >
                          {defendType}
                        </div>
                      </td>
                      {types.map((attackType) => {
                        const eff = getTypeEffectiveness(attackType, defendType);
                        const bgColor = 
                          eff === 0 ? '#333' :
                          eff === 0.5 ? '#663333' :
                          eff === 2 ? '#336633' :
                          'transparent';
                        
                        return (
                          <td
                            key={attackType}
                            className="border border-white/5 p-2 text-center"
                            style={{ backgroundColor: bgColor }}
                          >
                            {eff !== 1 && (
                              <span className="font-['Nunito'] text-xs text-white">
                                {eff === 0 ? '0' : eff === 0.5 ? '½' : '2'}×
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 font-['Nunito'] text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#336633]"></div>
              <span>Super eficaz (2×)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#663333]"></div>
              <span>No muy eficaz (½×)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#333]"></div>
              <span>Sin efecto (0×)</span>
            </div>
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