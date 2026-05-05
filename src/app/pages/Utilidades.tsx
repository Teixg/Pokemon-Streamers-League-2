
import { PageHeader } from '../components/PageHeader';
import { ExternalLink } from 'lucide-react';



const SECTIONS = [
  {
    title: '📚 Información',
    resources: [
      {
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png" className="h-12 w-12" />,
        name: 'Pokémon DB',
        description: 'Base de datos completa de Pokémon, movimientos y habilidades',
        url: 'https://pokemondb.net',
      },
      {
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-band.png" className="h-12 w-12" />,
        name: 'Serebii',
        description: 'Guías detalladas, noticias y recursos de Pokémon',
        url: 'https://serebii.net',
      },
    ],
  },
  {
    title: '⚔️ Combate',
    resources: [
      {
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/focus-sash.png" className="h-12 w-12" />,
        name: 'Damage Calculator',
        description: 'Calculadora avanzada de daño para batallas competitivas',
        url: 'https://calc.pokemonshowdown.com',
      },
      {
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-specs.png" className="h-12 w-12" />,
        name: 'Team Builder',
        description: 'Constructor de equipos y cobertura de tipos',
        url: 'https://marriland.com/tools/team-builder/es/',
      },
    ],
  },
  {
    title: '🧠 Nuzlocke',
    resources: [
      {
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/metronome.png" className="h-12 w-12" />,
        name: 'Nuzlocke University',
        description: 'Guías y estrategias para completar Nuzlockes exitosamente',
        url: 'https://nuzlockeuniversity.ca',
      },
    ],
  },
  {
    title: '⚡ Referencia rápida',
    resources: [
      {
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" className="h-12 w-12" />,
        name: 'Tabla de tipos',
        description: 'Tabla de efectividad de tipos',
        url: 'https://www.pkmn.help/defense/solo/',
      },
    ],
  },
] as const;

export function Utilidades() {


  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="PSL2 · Temporada 2"
          title="UTILIDADES"
          subtitle="Calculadora de tipos, tabla de efectividad y enlaces útiles"
        />

        {/* External Resources */}
        <section aria-label="Recursos externos">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Recursos Externos
          </h2>

          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                {/* Título de sección */}
                <h3 className="font-['Press_Start_2P'] text-lg text-[#FFD700] mb-4">
                  {section.title}
                </h3>

                {/* Grid de recursos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.resources.map((resource) => (
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
              </div>
            ))}
          </div>
        </section>
      </div >
    </div >
  );
}
