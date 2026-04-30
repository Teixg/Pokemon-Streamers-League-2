/**
 * Configuración de Google Sheets — fuente de verdad del torneo.
 *
 * CÓMO AÑADIR LAS PESTAÑAS DE EQUIPO Y MUERTES:
 * 1. Abre el Google Sheet en el navegador
 * 2. Haz clic en la pestaña "team" o "deaths"
 * 3. Fíjate en la URL: ...spreadsheets/d/TU_ID/edit#gid=XXXXXXX
 * 4. Copia el número que aparece después de #gid= y pégalo en GID.team o GID.deaths
 *
 * COLUMNAS ESPERADAS:
 *   streamers → id, name, twitch, starter, badges, isEliminated, currentZone
 *   team      → streamerId, name, spriteId, level, type1, type2, nickname
 *   deaths    → streamerId, name, spriteId, nickname, level, killedBy, route
 */

const PUBLISHED_BASE =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpFcFPfWF0NRqc84albUhvyXf1p_iNXFvkCMqhgNyD7ZQfaatIOKO4H_rrX2exLurQnqQGvtpqCvpa/pub';

/**
 * GIDs de cada pestaña del spreadsheet.
 * - null  → pestaña no configurada todavía (se devuelven datos vacíos)
 * - 'XXXXXXXXXX' → GID numérico de la pestaña (cópialo desde la URL del sheet)
 */
const GID = {
  /** Datos básicos de cada streamer. Es la primera pestaña → no necesita GID. */
  streamers: null as null,
  /** Equipo activo (hasta 6 Pokémon por streamer). Pon aquí el GID cuando crees la pestaña. */
  team: "792981690",
  /** Pokémon muertos (cementerio). Pon aquí el GID cuando crees la pestaña. */
  deaths: "631631346",
};

/** URL del CSV de la pestaña streamers (primera pestaña, sin GID). */
export function getStreamersUrl(): string {
  return `${PUBLISHED_BASE}?output=csv`;
}

/** URL del CSV de la pestaña team, o null si aún no está configurada. */
export function getTeamUrl(): string | null {
  if (!GID.team) return null;
  return `${PUBLISHED_BASE}?gid=${GID.team}&single=true&output=csv`;
}

/** URL del CSV de la pestaña deaths, o null si aún no está configurada. */
export function getDeathsUrl(): string | null {
  if (!GID.deaths) return null;
  return `${PUBLISHED_BASE}?gid=${GID.deaths}&single=true&output=csv`;
}
