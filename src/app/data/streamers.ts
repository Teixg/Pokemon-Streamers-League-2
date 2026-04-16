export interface Streamer {
  id: string;
  name: string;
  twitch: string;
  starter: string;
  badges: number;
  isLive?: boolean;
  isEliminated?: boolean;
  /** URL del sprite del personaje en el juego (opcional; si no se indica, se usa el sprite del inicial) */
  spriteUrl?: string;
}

export const streamers: Streamer[] = [
  { id: '1', name: 'AlexByNight', twitch: '@alexbynight', starter: 'Charmander', badges: 5, isLive: true },
  { id: '2', name: 'Cristinini', twitch: '@cristinini', starter: 'Squirtle', badges: 6, isLive: false },
  { id: '3', name: 'IlloJuan', twitch: '@illojuan', starter: 'Bulbasaur', badges: 4, isLive: true },
  { id: '4', name: 'Auronplay', twitch: '@auronplay', starter: 'Charmander', badges: 7, isLive: false },
  { id: '5', name: 'Rubius', twitch: '@rubius', starter: 'Squirtle', badges: 5, isLive: true },
  { id: '6', name: 'ElRubio', twitch: '@elrubio', starter: 'Bulbasaur', badges: 6, isLive: false },
  { id: '7', name: 'Ibai', twitch: '@ibai', starter: 'Charmander', badges: 8, isLive: false },
  { id: '8', name: 'Rivers', twitch: '@rivers_gg', starter: 'Squirtle', badges: 3, isLive: true },
  { id: '9', name: 'ElSpreen', twitch: '@elspreen', starter: 'Charmander', badges: 2, isEliminated: true },
  { id: '10', name: 'Carrera', twitch: '@carreraaa', starter: 'Bulbasaur', badges: 1, isEliminated: true },
  { id: '11', name: 'Konterfox', twitch: '@konterfox', starter: 'Squirtle', badges: 3, isEliminated: true },
];

export const starters = [
  { name: 'Charmander', type: 'fire', description: 'Tipo Fuego. Evoluciona a Charizard.' },
  { name: 'Squirtle', type: 'water', description: 'Tipo Agua. Evoluciona a Blastoise.' },
  { name: 'Bulbasaur', type: 'grass', description: 'Tipo Planta/Veneno. Evoluciona a Venusaur.' },
];
