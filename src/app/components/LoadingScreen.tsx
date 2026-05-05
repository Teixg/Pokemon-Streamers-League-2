import { useEffect, useState } from 'react';
import { getPokemonSpriteUrl } from '../config/api';

const LOADING_MESSAGES = [
  'Cargando datos del torneo…',
  'Consultando la Pokédex…',
  'Preparando las medallas…',
  'Buscando streamers…',
  'Revisando el estado de la liga…',
];

const MAX_POKEMON = 1025;
const POOL_SIZE = 25;

// genera IDs aleatorios sin repetir dentro del pool
const generatePool = () => {
  const set = new Set<number>();

  while (set.size < POOL_SIZE) {
    const id = Math.floor(Math.random() * MAX_POKEMON) + 1;
    set.add(id);
  }

  return Array.from(set);
};

// fetch real Pokémon data
const fetchPokemon = async (id: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return {
    id,
    name: data.name,
  };
};

interface Pokemon {
  id: number;
  name: string;
}

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [index, setIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [dots, setDots] = useState('');
  const [fadeKey, setFadeKey] = useState(0);
  const [loading, setLoading] = useState(true);

  // ─────────────────────────────
  // CARGA INICIAL DEL POOL
  // ─────────────────────────────
  useEffect(() => {
    const load = async () => {
      const pool = generatePool();

      const results = await Promise.all(
        pool.map(id => fetchPokemon(id))
      );

      setPokemonList(results);
      setLoading(false);
    };

    load();
  }, []);

  // ─────────────────────────────
  // ROTACIÓN DE POKÉMON
  // ─────────────────────────────
  useEffect(() => {
    if (pokemonList.length === 0) return;

    const interval = setInterval(() => {
      setFadeKey(k => k + 1);
      setIndex(i => (i + 1) % pokemonList.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [pokemonList]);

  // ─────────────────────────────
  // MENSAJES
  // ─────────────────────────────
  useEffect(() => {
    if (message) return;

    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [message]);

  // ─────────────────────────────
  // PUNTOS ANIMADOS
  // ─────────────────────────────
  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setDots('.'.repeat(count));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // ─────────────────────────────
  // ESTADOS DE CARGA
  // ─────────────────────────────
  if (loading || pokemonList.length === 0) {
    return (
      <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center text-white">
        Cargando Pokémon…
      </div>
    );
  }

  const current = pokemonList[index];
  const displayMessage = message ?? LOADING_MESSAGES[msgIndex];

  return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center relative overflow-hidden">

      {/* ── CONTENIDO CENTRAL ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">

        {/* Pokémon destacado */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute rounded-full animate-ping"
            style={{
              width: 140,
              height: 140,
              background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
            }}
          />

          <div
            className="rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/5 flex items-center justify-center"
            style={{ width: 140, height: 140 }}
          >
            <img
              key={fadeKey}
              src={getPokemonSpriteUrl(current.id)}
              alt={current.name}
              width={96}
              height={96}
              className="pixelated object-contain pokemon-loading-fade"
            />
          </div>
        </div>

        {/* Nombre */}
        <div
          key={`name-${fadeKey}`}
          className="font-['Press_Start_2P'] text-xs text-[#fbbf24]/60 pokemon-loading-fade capitalize"
        >
          {current.name}
        </div>

        {/* Barra */}
        <div className="w-64 flex flex-col items-center gap-2">
          <div
            className="w-full rounded-full overflow-hidden border border-white/10"
            style={{ height: 10, background: 'rgba(255,255,255,0.05)' }}
          >
            <div
              className="h-full rounded-full loading-bar-fill"
              style={{
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        </div>

        {/* Mensaje */}
        <p
          key={`msg-${msgIndex}`}
          className="font-['Nunito'] text-sm text-gray-400 pokemon-loading-fade"
        >
          {displayMessage}{dots}
        </p>

        {/* Mini galería */}
        <div className="flex items-center gap-2 opacity-40">
          {pokemonList.slice(0, 5).map((p, i) => (
            <img
              key={p.id}
              src={getPokemonSpriteUrl(p.id)}
              alt=""
              width={32}
              height={32}
              className="pixelated object-contain"
              style={{
                filter: i === index % 5 ? 'none' : 'grayscale(80%)',
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}