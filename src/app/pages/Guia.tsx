import { PageHeader } from '../components/PageHeader';
import { gymLeaders } from '../data/gym-leaders';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Skull, Ban, Heart, Zap } from 'lucide-react';

export function Guia() {
  const nuzlockeRules = [
    {
      icon: Skull,
      title: 'Si un Pokémon se debilita, muere',
      description: 'Debes liberarlo o dejarlo en la caja para siempre',
      color: '#f43f5e',
    },
    {
      icon: Ban,
      title: 'Solo el primer Pokémon por ruta',
      description: 'Solo puedes capturar el primer encuentro de cada ruta',
      color: '#fbbf24',
    },
    {
      icon: Heart,
      title: 'Nombra a todos tus Pokémon',
      description: 'Crea un vínculo emocional con tu equipo',
      color: '#f43f5e',
    },
    {
      icon: Zap,
      title: 'Sin uso de Centro Pokémon',
      description: 'Modo Hardcore: solo objetos curativos',
      color: '#fbbf24',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="Pokémon Añil Definitive Edition"
          title="GUÍA"
          subtitle="Todo lo que necesitas saber sobre el juego y las reglas Nuzlocke"
        />

        {/* What is this game */}
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            ¿Qué es este juego?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="font-['Nunito'] text-base sm:text-lg text-gray-300 leading-relaxed">
              <span className="text-[#fbbf24] font-semibold">Pokémon Añil Definitive Edition</span> es un
              ROMhack mejorado de Pokémon Azul/Rojo que incluye Pokémon de generaciones posteriores, 
              mecánicas actualizadas, y mayor dificultad. Los participantes juegan bajo{' '}
              <span className="text-[#f43f5e] font-semibold">reglas Nuzlocke</span>, convirtiendo 
              cada batalla en una decisión de vida o muerte.
            </p>
          </div>
        </section>

        {/* Nuzlocke Rules */}
        <section className="mb-16">
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Reglas Nuzlocke
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nuzlockeRules.map((rule, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20"
              >
                <rule.icon className="mb-4 h-10 w-10" style={{ color: rule.color }} />
                <h3 className="font-['Nunito'] font-bold text-lg text-white mb-2">
                  {rule.title}
                </h3>
                <p className="font-['Nunito'] text-gray-400">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gym Leaders */}
        <section>
          <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl mb-6 text-white">
            Líderes de Gimnasio
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gymLeaders.map((leader) => (
              <div
                key={leader.number}
                className="rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 flex flex-col items-center text-center gap-3"
              >
                {/* Number badge */}
                <div className="self-start flex h-7 w-7 shrink-0 items-center justify-center rounded font-['Press_Start_2P'] text-xs text-[#fbbf24] bg-white/10">
                  {leader.number}
                </div>

                {/* Leader sprite */}
                <ImageWithFallback
                  src={leader.trainerSpriteUrl}
                  alt={leader.name}
                  className="w-20 h-20 object-contain"
                />

                {/* Info */}
                <div className="w-full">
                  <h3 className="font-['Nunito'] font-bold text-base text-white leading-tight mb-1.5">{leader.name}</h3>
                  <p className="font-['Nunito'] text-sm text-gray-400 mb-0.5">{leader.city}</p>
                  <p className="font-['Nunito'] text-sm text-[#fbbf24] font-semibold">Nv. {leader.topLevel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}