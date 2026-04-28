// Colores de tipo — sin cambios
export const typeColors: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const types = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
] as const;

export type PokemonType = (typeof types)[number];

// ---------------------------------------------------------------------------
// IMPORTANTE: Pokémon Añil Definitive Edition es un ROMhack que mezcla
// mecánicas. Por defecto usamos la tabla MODERNA (Gen 6+) que es la más
// completa y estándar. Si el juego usa tabla Gen 1, hay diferencias notables:
//
// Gen 1 vs Gen 6+:
//   - Poison vs Bug:    Gen1 = 2×   |  Gen6 = 1×
//   - Bug vs Poison:    Gen1 = 2×   |  Gen6 = 0.5×
//   - Bug vs Ghost:     Gen1 = 0×   |  Gen6 = 0.5×
//   - Ghost vs Psychic: Gen1 = 0×   |  Gen6 = 2×
//   - Ice vs Fire:      Gen1 = 1×   |  Gen6 = 0.5×
//
// Hay un flag `GEN1_MODE` para alternar entre tablas.
// ---------------------------------------------------------------------------

type EffectivenessMap = Partial<Record<PokemonType, number>>;

/** Tabla de efectividad moderna (Gen 6+) — atacante → defensor → multiplicador */
const MODERN_EFFECTIVENESS: Record<string, EffectivenessMap> = {
  normal:   { rock: 0.5, ghost: 0, steel: 0.5 },
  fire:     { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water:    { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass:    { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice:      { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison:   { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground:   { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying:   { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic:  { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug:      { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock:     { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost:    { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon:   { dragon: 2, steel: 0.5, fairy: 0 },
  dark:     { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel:    { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy:    { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};

/** Diferencias específicas de Gen 1 respecto a la tabla moderna */
const GEN1_OVERRIDES: Partial<Record<string, EffectivenessMap>> = {
  poison:  { bug: 2, ghost: 0.5 },   // Gen1: Veneno 2× contra Bicho (moderno: 1×)
  bug:     { poison: 2, ghost: 0 },  // Gen1: Bicho 2× contra Veneno (moderno: 0.5×); inmune a Fantasma (moderno: 0.5×)
  ghost:   { psychic: 0 },           // Gen1: Fantasma 0× contra Psíquico (!!) — bug famoso de Gen1
  ice:     { fire: 1 },              // Gen1: Hielo neutro contra Fuego (moderno: 0.5×)
};

// Cambiar a true si el ROMhack usa mecánicas de Gen 1
const GEN1_MODE = false;

function buildEffectivenessTable(): Record<string, EffectivenessMap> {
  if (!GEN1_MODE) return MODERN_EFFECTIVENESS;

  const table = structuredClone(MODERN_EFFECTIVENESS) as Record<string, EffectivenessMap>;
  for (const [attacker, overrides] of Object.entries(GEN1_OVERRIDES)) {
    table[attacker] = { ...table[attacker], ...overrides };
  }
  return table;
}

export const typeEffectiveness = buildEffectivenessTable();

/**
 * Devuelve el multiplicador de daño de attackType contra defendType.
 * Por defecto es 1× si no hay entrada en la tabla.
 */
export function getTypeEffectiveness(attackType: string, defendType: string): number {
  return typeEffectiveness[attackType]?.[defendType as PokemonType] ?? 1;
}

/**
 * Calcula el multiplicador combinado contra un Pokémon con 1 o 2 tipos.
 * Ejemplo: Agua contra Roca/Tierra = 2× * 2× = 4×
 */
export function getCombinedEffectiveness(attackType: string, defendTypes: string[]): number {
  return defendTypes.reduce(
    (acc, dt) => acc * getTypeEffectiveness(attackType, dt),
    1,
  );
}

/** Etiqueta legible para un multiplicador de efectividad */
export function getEffectivenessLabel(mult: number): {
  text: string;
  color: string;
  symbol: string;
} {
  if (mult === 0)    return { text: 'Sin efecto',      color: '#666666', symbol: '0×' };
  if (mult <= 0.25)  return { text: 'Muy resistente',  color: '#f43f5e', symbol: '¼×' };
  if (mult <= 0.5)   return { text: 'No muy eficaz',   color: '#f87171', symbol: '½×' };
  if (mult >= 4)     return { text: '¡Muy super eficaz!', color: '#00FF00', symbol: '4×' };
  if (mult >= 2)     return { text: 'Super eficaz',    color: '#4ade80', symbol: '2×' };
  return              { text: 'Eficaz',               color: '#fbbf24', symbol: '1×' };
}
