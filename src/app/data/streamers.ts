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

export const streamers: Streamer[] = [
  {
    id: '1', name: 'AlexByNight', twitch: '@alexbynight', starter: 'Charmander', badges: 5,
    isLive: true, currentZone: 'Ciudad Fucsia',
    team: [
      { name: 'Charizard',   spriteId: 6,   level: 48, type1: 'fire',    type2: 'flying',  nickname: 'Infernus'  },
      { name: 'Gengar',      spriteId: 94,  level: 44, type1: 'ghost',   type2: 'poison',  nickname: 'Sombra'    },
      { name: 'Starmie',     spriteId: 121, level: 42, type1: 'water',   type2: 'psychic', nickname: 'Estrellita'},
      { name: 'Arcanine',    spriteId: 59,  level: 46, type1: 'fire',    nickname: 'Llamas'},
      { name: 'Exeggutor',   spriteId: 103, level: 41, type1: 'grass',   type2: 'psychic', nickname: 'Cabezas'   },
    ],
    deaths: [
      { name: 'Rattata',  spriteId: 19,  nickname: 'Ratas',  level: 8,  killedBy: 'Misty (Starmie)',   route: 'Ciudad Celeste'  },
      { name: 'Geodude',  spriteId: 74,  nickname: 'Piedrita', level: 16, killedBy: 'Lt. Surge (Raichu)', route: 'Ciudad Carmín' },
    ],
  },
  {
    id: '2', name: 'Cristinini', twitch: '@cristinini', starter: 'Squirtle', badges: 6,
    isLive: false, currentZone: 'Ciudad Azafrán',
    team: [
      { name: 'Blastoise',   spriteId: 9,   level: 52, type1: 'water',              nickname: 'Tsunami'   },
      { name: 'Jolteon',     spriteId: 135, level: 46, type1: 'electric',            nickname: 'Rayo'      },
      { name: 'Fearow',      spriteId: 22,  level: 43, type1: 'normal',  type2: 'flying', nickname: 'Espadón' },
      { name: 'Alakazam',    spriteId: 65,  level: 50, type1: 'psychic',             nickname: 'Telequino' },
      { name: 'Victreebel',  spriteId: 71,  level: 44, type1: 'grass',   type2: 'poison', nickname: 'Matasuegra'},
      { name: 'Golem',       spriteId: 76,  level: 48, type1: 'rock',    type2: 'ground', nickname: 'Roca'    },
    ],
    deaths: [
      { name: 'Caterpie',  spriteId: 10,  nickname: 'Gusano',   level: 5,  killedBy: 'Entrenador rival', route: 'Ruta 2'         },
      { name: 'Sandshrew', spriteId: 27,  nickname: 'Sandy',    level: 21, killedBy: 'Brock (Onix)',    route: 'Ciudad Plateada'},
      { name: 'Tentacool', spriteId: 72,  nickname: 'Tentáculo',level: 33, killedBy: 'Koga (Weezing)', route: 'Ciudad Fucsia'  },
    ],
  },
  {
    id: '3', name: 'IlloJuan', twitch: '@illojuan', starter: 'Bulbasaur', badges: 4,
    isLive: true, currentZone: 'Ciudad Azulona',
    team: [
      { name: 'Venusaur',    spriteId: 3,   level: 43, type1: 'grass',  type2: 'poison', nickname: 'Botanista' },
      { name: 'Electrode',   spriteId: 101, level: 38, type1: 'electric',               nickname: 'Bomba'     },
      { name: 'Hitmonlee',   spriteId: 106, level: 40, type1: 'fighting',               nickname: 'Patada'    },
      { name: 'Tentacruel',  spriteId: 73,  level: 37, type1: 'water',  type2: 'poison', nickname: 'Tentáculo' },
    ],
    deaths: [
      { name: 'Pidgey',    spriteId: 16,  nickname: 'Alita',   level: 10, killedBy: 'Rival (Charmander)',   route: 'Ruta 1'         },
      { name: 'Zubat',     spriteId: 41,  nickname: 'Ciego',   level: 14, killedBy: 'Mt. Moon (Geodude)',   route: 'Monte Luna'     },
      { name: 'Poliwag',   spriteId: 60,  nickname: 'Rini',    level: 26, killedBy: 'Erika (Vileplume)',    route: 'Ciudad Azulona' },
      { name: 'Paras',     spriteId: 46,  nickname: 'Seta',    level: 20, killedBy: 'SS Anne (marinero)',   route: 'SS Anne'        },
    ],
  },
  {
    id: '4', name: 'Auronplay', twitch: '@auronplay', starter: 'Charmander', badges: 7,
    isLive: false, currentZone: 'Guarida Rocket / Saffron',
    team: [
      { name: 'Arcanine',    spriteId: 59,  level: 55, type1: 'fire',                   nickname: 'Auroncan'  },
      { name: 'Dragonair',   spriteId: 148, level: 52, type1: 'dragon',                 nickname: 'Lanza'     },
      { name: 'Nidoking',    spriteId: 34,  level: 53, type1: 'poison', type2: 'ground', nickname: 'El Rey'   },
      { name: 'Hypno',       spriteId: 97,  level: 50, type1: 'psychic',                nickname: 'Hipnosis'  },
      { name: 'Slowbro',     spriteId: 80,  level: 51, type1: 'water',  type2: 'psychic',nickname: 'Lentísimo'},
      { name: 'Machamp',     spriteId: 68,  level: 54, type1: 'fighting',               nickname: 'Cuatro Brazos'},
    ],
    deaths: [
      { name: 'Pidgeotto', spriteId: 17,  nickname: 'Aguila',  level: 22, killedBy: 'Misty (Starmie)',      route: 'Ciudad Celeste' },
      { name: 'Magnemite', spriteId: 81,  nickname: 'Imán',    level: 29, killedBy: 'Erika (Victreebel)',   route: 'Ciudad Azulona' },
      { name: 'Jigglypuff',spriteId: 39,  nickname: 'Bolita',  level: 24, killedBy: 'Koga (Tóxico)',        route: 'Ciudad Fucsia'  },
      { name: 'Doduo',     spriteId: 84,  nickname: 'DosCuellos',level: 32,killedBy: 'Blaine (Arcanine)',   route: 'Isla Canela'    },
      { name: 'Graveler',  spriteId: 75,  nickname: 'Piedra',  level: 38, killedBy: 'Silph (Ejecutivo)',    route: 'Torre Silph'    },
    ],
  },
  {
    id: '5', name: 'Rubius', twitch: '@rubius', starter: 'Squirtle', badges: 5,
    isLive: true, currentZone: 'Ciudad Fucsia',
    team: [
      { name: 'Blastoise',   spriteId: 9,   level: 47, type1: 'water',                   nickname: 'Tanque'    },
      { name: 'Electabuzz',  spriteId: 125, level: 44, type1: 'electric',                nickname: 'Trueno'    },
      { name: 'Clefable',    spriteId: 36,  level: 42, type1: 'normal',                  nickname: 'Estrella'  },
      { name: 'Snorlax',     spriteId: 143, level: 46, type1: 'normal',                  nickname: 'Dormilón'  },
      { name: 'Rapidash',    spriteId: 78,  level: 43, type1: 'fire',                    nickname: 'Velocidad' },
    ],
    deaths: [
      { name: 'Spearow',   spriteId: 21,  nickname: 'Lanzón',  level: 12, killedBy: 'Rival (Pidgeotto)',    route: 'Ruta 22'        },
      { name: 'Weepinbell',spriteId: 70,  nickname: 'Campana', level: 35, killedBy: 'Sabrina (Alakazam)',   route: 'Ciudad Azafrán' },
      { name: 'Vulpix',    spriteId: 37,  nickname: 'Zorrita', level: 28, killedBy: 'Koga (Muk)',           route: 'Ciudad Fucsia'  },
    ],
  },
  {
    id: '6', name: 'ElRubio', twitch: '@elrubio', starter: 'Bulbasaur', badges: 6,
    isLive: false, currentZone: 'Ciudad Azafrán',
    team: [
      { name: 'Venusaur',    spriteId: 3,   level: 51, type1: 'grass',  type2: 'poison', nickname: 'Rubiosaurio'},
      { name: 'Raichu',      spriteId: 26,  level: 47, type1: 'electric',               nickname: 'Pika'       },
      { name: 'Gengar',      spriteId: 94,  level: 49, type1: 'ghost',  type2: 'poison', nickname: 'Fantasmín'  },
      { name: 'Dewgong',     spriteId: 87,  level: 46, type1: 'water',  type2: 'ice',    nickname: 'Focas'      },
      { name: 'Kangaskhan',  spriteId: 115, level: 48, type1: 'normal',                 nickname: 'Mamá'        },
      { name: 'Poliwrath',   spriteId: 62,  level: 50, type1: 'water',  type2: 'fighting',nickname: 'Renacuajo' },
    ],
    deaths: [
      { name: 'Oddish',    spriteId: 43,  nickname: 'Hierba',  level: 17, killedBy: 'Lt. Surge (Raichu)',   route: 'Ciudad Carmín'  },
      { name: 'Growlithe', spriteId: 58,  nickname: 'Perrito', level: 31, killedBy: 'Silph (Ejecutivo)',    route: 'Torre Silph'    },
    ],
  },
  {
    id: '7', name: 'Ibai', twitch: '@ibai', starter: 'Charmander', badges: 8,
    isLive: false, currentZone: 'Ruta Victoria / Liga',
    team: [
      { name: 'Charizard',   spriteId: 6,   level: 60, type1: 'fire',   type2: 'flying',  nickname: 'Ibaifire'  },
      { name: 'Lapras',      spriteId: 131, level: 57, type1: 'water',  type2: 'ice',      nickname: 'Barquito'  },
      { name: 'Jolteon',     spriteId: 135, level: 58, type1: 'electric',                  nickname: 'Voltio'    },
      { name: 'Nidoqueen',   spriteId: 31,  level: 56, type1: 'poison', type2: 'ground',   nickname: 'Reina'     },
      { name: 'Hitmonchan',  spriteId: 107, level: 55, type1: 'fighting',                  nickname: 'Boxeador'  },
      { name: 'Aerodactyl',  spriteId: 142, level: 59, type1: 'rock',   type2: 'flying',   nickname: 'Dino'      },
    ],
    deaths: [
      { name: 'Caterpie',  spriteId: 10,  nickname: 'Primo',   level: 6,  killedBy: 'Rival (inicio)',        route: 'Ruta 1'         },
      { name: 'Meowth',    spriteId: 52,  nickname: 'Monedas', level: 19, killedBy: 'Misty (Golduck)',       route: 'Ciudad Celeste' },
      { name: 'Primeape',  spriteId: 57,  nickname: 'Furia',   level: 34, killedBy: 'Erika (Exeggutor)',     route: 'Ciudad Azulona' },
      { name: 'Tentacruel',spriteId: 73,  nickname: 'Kappa',   level: 40, killedBy: 'Koga (Weezing)',        route: 'Ciudad Fucsia'  },
      { name: 'Rhydon',    spriteId: 112, nickname: 'Rino',    level: 44, killedBy: 'Blaine (Rapidash)',     route: 'Isla Canela'    },
      { name: 'Magneton',  spriteId: 82,  nickname: 'Imanes',  level: 38, killedBy: 'Giovanni (Rhydon)',     route: 'Ciudad Verde'   },
    ],
  },
  {
    id: '8', name: 'Rivers', twitch: '@rivers_gg', starter: 'Squirtle', badges: 3,
    isLive: true, currentZone: 'Ciudad Carmín',
    team: [
      { name: 'Wartortle',   spriteId: 8,   level: 29, type1: 'water',                   nickname: 'Colita'    },
      { name: 'Pidgeot',     spriteId: 18,  level: 27, type1: 'normal', type2: 'flying',  nickname: 'Halcón'   },
      { name: 'Clefairy',    spriteId: 35,  level: 25, type1: 'normal',                   nickname: 'Fairy'    },
    ],
    deaths: [
      { name: 'Beedrill',  spriteId: 15,  nickname: 'Aguijón', level: 9,  killedBy: 'Brock (Graveler)',     route: 'Ciudad Plateada'},
      { name: 'Nidoran♂',  spriteId: 32,  nickname: 'Nido',    level: 18, killedBy: 'Misty (Starmie)',      route: 'Ciudad Celeste' },
      { name: 'Diglett',   spriteId: 50,  nickname: 'Topo',    level: 22, killedBy: 'SS Anne (marinero)',   route: 'SS Anne'        },
      { name: 'Magikarp',  spriteId: 129, nickname: 'Inútil',  level: 15, killedBy: 'Lt. Surge (Voltorb)',  route: 'Ciudad Carmín'  },
      { name: 'Slowpoke',  spriteId: 79,  nickname: 'Pachorra',level: 20, killedBy: 'Rival (Ruta 22)',      route: 'Ruta 22'        },
    ],
  },
  {
    id: '9', name: 'ElSpreen', twitch: '@elspreen', starter: 'Charmander', badges: 2,
    isEliminated: true, currentZone: 'Eliminado en Ciudad Celeste',
    team: [],
    deaths: [
      { name: 'Charmeleon', spriteId: 5,   nickname: 'Spreenfire', level: 20, killedBy: 'Misty (Starmie)',     route: 'Ciudad Celeste' },
      { name: 'Pidgey',     spriteId: 16,  nickname: 'Volador',    level: 11, killedBy: 'Rival (Birdtrap)',    route: 'Ruta 3'         },
      { name: 'Ekans',      spriteId: 23,  nickname: 'Serpiente',  level: 15, killedBy: 'Brock (Onix)',        route: 'Ciudad Plateada'},
      { name: 'Mankey',     spriteId: 56,  nickname: 'Mono',       level: 17, killedBy: 'Misty (Golduck)',     route: 'Ciudad Celeste' },
      { name: 'Psyduck',    spriteId: 54,  nickname: 'Pato',       level: 19, killedBy: 'Misty (Starmie)',     route: 'Ciudad Celeste' },
      { name: 'Abra',       spriteId: 63,  nickname: 'Teletransporte', level: 14, killedBy: 'Rival (Ruta 22)',route: 'Ruta 22'        },
      { name: 'Rattata',    spriteId: 19,  nickname: 'Raton',      level: 8,  killedBy: 'Brock (Geodude)',     route: 'Ciudad Plateada'},
      { name: 'Nidoran♀',   spriteId: 29,  nickname: 'Lola',       level: 14, killedBy: 'Misty (Staryu)',      route: 'Ciudad Celeste' },
    ],
  },
  {
    id: '10', name: 'Carrera', twitch: '@carreraaa', starter: 'Bulbasaur', badges: 1,
    isEliminated: true, currentZone: 'Eliminado en Monte Luna',
    team: [],
    deaths: [
      { name: 'Ivysaur',   spriteId: 2,   nickname: 'Floreado',   level: 18, killedBy: 'Entrenador (Mt. Moon)', route: 'Monte Luna'     },
      { name: 'Pidgeotto', spriteId: 17,  nickname: 'Vuelo',      level: 15, killedBy: 'Equipo Rocket',         route: 'Monte Luna'     },
      { name: 'Zubat',     spriteId: 41,  nickname: 'Vampiro',    level: 12, killedBy: 'Equipo Rocket (Koffing)',route: 'Monte Luna'     },
      { name: 'Geodude',   spriteId: 74,  nickname: 'Canuto',     level: 14, killedBy: 'Brock (Onix)',          route: 'Ciudad Plateada'},
      { name: 'Paras',     spriteId: 46,  nickname: 'Champiñón',  level: 10, killedBy: 'Rival (Wartortle)',     route: 'Ruta 2'         },
    ],
  },
  {
    id: '11', name: 'Konterfox', twitch: '@konterfox', starter: 'Squirtle', badges: 3,
    isEliminated: true, currentZone: 'Eliminado en Ciudad Carmín',
    team: [],
    deaths: [
      { name: 'Wartortle', spriteId: 8,   nickname: 'Foxwater',   level: 25, killedBy: 'Lt. Surge (Raichu)',   route: 'Ciudad Carmín'  },
      { name: 'Pikachu',   spriteId: 25,  nickname: 'Chispas',    level: 22, killedBy: 'Lt. Surge (Electrode)',route: 'Ciudad Carmín'  },
      { name: 'Growlithe', spriteId: 58,  nickname: 'Perro',      level: 20, killedBy: 'Lt. Surge (Voltorb)',  route: 'Ciudad Carmín'  },
      { name: 'Butterfree',spriteId: 12,  nickname: 'Mariposita', level: 17, killedBy: 'Lt. Surge (Raichu)',   route: 'Ciudad Carmín'  },
    ],
  },
];

export const starters = [
  { name: 'Charmander', type: 'fire', description: 'Tipo Fuego. Evoluciona a Charizard.' },
  { name: 'Squirtle', type: 'water', description: 'Tipo Agua. Evoluciona a Blastoise.' },
  { name: 'Bulbasaur', type: 'grass', description: 'Tipo Planta/Veneno. Evoluciona a Venusaur.' },
];

/** Calcula el nivel de peligro de un streamer (0=seguro, 1=precaución, 2=peligro, 3=crítico) */
export function getDangerLevel(streamer: Streamer): 0 | 1 | 2 | 3 {
  if (streamer.isEliminated) return 3;
  const teamSize = streamer.team?.length ?? 6;
  if (teamSize <= 1) return 3;
  if (teamSize <= 2) return 2;
  if (teamSize <= 3) return 1;
  return 0;
}

/** Devuelve el total de muertes de todos los streamers */
export function getTotalDeaths(): number {
  return streamers.reduce((acc, s) => acc + (s.deaths?.length ?? 0), 0);
}
