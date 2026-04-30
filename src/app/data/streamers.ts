export interface PokemonTeamMember {
  name: string;
  /** Número de la Pokédex Nacional para el sprite de PokeAPI */
  spriteId: number;
  level: number;
  type1: string;
  type2?: string;
  nickname: string;
}

export interface DeadPokemon {
  name: string;
  spriteId: number;
  nickname: string;
  level: number;
  /** Quién o qué mató al Pokémon */
  killedBy: string;
  /** Zona/ruta donde ocurrió la muerte */
  route: string;
}

export interface Streamer {
  id: string;
  name: string;
  twitch: string;
  /** Inicial recibida (puede ser aleatorizada en el Randomlocke) */
  starter: string;
  badges: number;
  isLive?: boolean;
  isEliminated?: boolean;
  /** URL del sprite del personaje en el juego (opcional; si no se indica, se usa el sprite del inicial) */
  spriteUrl?: string;
  /** Equipo activo actual (hasta 6 Pokémon) */
  team?: PokemonTeamMember[];
  /** Lista de Pokémon muertos (cementerio) */
  deaths?: DeadPokemon[];
  /** Zona actual del juego */
  currentZone?: string;
}

export const starters = [
  { name: 'Charmander', type: 'fire',  description: 'Tipo Fuego. Evoluciona a Charizard.' },
  { name: 'Squirtle',   type: 'water', description: 'Tipo Agua. Evoluciona a Blastoise.' },
  { name: 'Bulbasaur',  type: 'grass', description: 'Tipo Planta/Veneno. Evoluciona a Venusaur.' },
];
