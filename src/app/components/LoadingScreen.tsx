import { useEffect, useState } from 'react';
import { getPokemonSpriteUrl } from '../config/api';

// Pokémon icónicos de Kanto que rotan durante la carga
const LOADING_POKEMON = [
  { id: 25,  name: 'Pikachu'    },
  { id: 39,  name: 'Jigglypuff' },
  { id: 52,  name: 'Meowth'     },
  { id: 132, name: 'Ditto'      },
  { id: 143, name: 'Snorlax'    },
  { id: 94,  name: 'Gengar'     },
  { id: 6,   name: 'Charizard'  },
  { id: 131, name: 'Lapras'     },
  { id: 54,  name: 'Psyduck'    },
  { id: 113, name: 'Chansey'    },
];

// Pokémon de fondo decorativos (flotantes)
const BG_POKEMON = Array.from({ length: 12 }, (_, i) => ({
  id: Math.floor(((i * 17 + 5) % 151) + 1),
  top: `${(i * 8.33) % 90}%`,
  left: `${(i * 13.7) % 90}%`,
  size: 40 + (i % 4) * 12,
  animDelay: `${(i * 0.4).toFixed(1)}s`,
  animDuration: `${5 + (i % 4)}s`,
}));

const LOADING_MESSAGES = [
  'Cargando datos del torneo…',
  'Consultando la Pokédex…',
  'Preparando las medallas…',
  'Buscando streamers…',
  'Revisando el estado de la liga…',
];

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [msgIndex, setMsgIndex]         = useState(0);
  const [dots, setDots]                 = useState('');
  const [fadeKey, setFadeKey]           = useState(0);

  // Rota el Pokémon destacado cada 1.8 s
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeKey(k => k + 1);
      setPokemonIndex(i => (i + 1) % LOADING_POKEMON.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Rota el mensaje cada 2.5 s
  useEffect(() => {
    if (message) return;
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [message]);

  // Anima los puntos suspensivos
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setDots('.'.repeat(count));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const current = LOADING_POKEMON[pokemonIndex];
  const displayMessage = message ?? LOADING_MESSAGES[msgIndex];

  return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center relative overflow-hidden">

      {/* ── Pokémon de fondo flotantes ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {BG_POKEMON.map((p, i) => (
          <img
            key={i}
            src={getPokemonSpriteUrl(p.id)}
            alt=""
            width={p.size}
            height={p.size}
            className="silhouette-drift pixelated"
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              opacity: 0.05,
              filter: 'brightness(0) invert(1)',
              '--drift-duration': p.animDuration,
              '--drift-delay': p.animDelay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Contenido central ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">

        {/* Pokémon giratorio con glow */}
        <div className="relative flex items-center justify-center">
          {/* Aura exterior pulsante */}
          <div
            className="absolute rounded-full animate-ping"
            style={{
              width: 140,
              height: 140,
              background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
            }}
          />
          {/* Círculo de fondo */}
          <div
            className="rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/5 flex items-center justify-center"
            style={{ width: 140, height: 140 }}
          >
            {/* Pokémon destacado con fade */}
            <img
              key={fadeKey}
              src={getPokemonSpriteUrl(current.id)}
              alt={current.name}
              width={96}
              height={96}
              className="pixelated object-contain pokemon-loading-fade"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>

        {/* Nombre del Pokémon */}
        <div
          key={`name-${fadeKey}`}
          className="font-['Press_Start_2P'] text-xs text-[#fbbf24]/60 pokemon-loading-fade"
        >
          {current.name}
        </div>

        {/* Barra de carga estilo Pokémon */}
        <div className="w-64 flex flex-col items-center gap-2">
          {/* Barra */}
          <div
            className="w-full rounded-full overflow-hidden border border-white/10"
            style={{ height: 10, background: 'rgba(255,255,255,0.05)' }}
            role="progressbar"
            aria-label="Cargando"
          >
            <div
              className="h-full rounded-full loading-bar-fill"
              style={{
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          {/* Indicadores de puntos */}
          <div className="flex gap-1.5">
            {LOADING_POKEMON.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === pokemonIndex ? 16 : 6,
                  height: 6,
                  background: i === pokemonIndex
                    ? '#fbbf24'
                    : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Mensaje rotante */}
        <p
          key={`msg-${msgIndex}`}
          className="font-['Nunito'] text-sm text-gray-400 pokemon-loading-fade"
        >
          {displayMessage}{dots}
        </p>

        {/* Mini-fila de Pokémon como galería */}
        <div className="flex items-center gap-2 opacity-40">
          {LOADING_POKEMON.slice(0, 5).map((p, i) => (
            <img
              key={i}
              src={getPokemonSpriteUrl(p.id)}
              alt=""
              width={32}
              height={32}
              className="pixelated object-contain"
              style={{
                imageRendering: 'pixelated',
                filter: i === pokemonIndex % 5 ? 'none' : 'grayscale(80%)',
                transition: 'filter 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
