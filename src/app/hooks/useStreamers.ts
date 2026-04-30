import { useEffect, useMemo, useState } from 'react';
import { type Streamer, type PokemonTeamMember, type DeadPokemon } from '../data/streamers';
import { useLiveStreamers } from './useLiveStreamers';
import { getStreamersUrl, getTeamUrl, getDeathsUrl } from '../config/sheets';

// ─── CSV Parser ────────────────────────────────────────────────────────────────

/** Parsea una línea CSV respetando valores entre comillas. */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/** Convierte texto CSV en un array de objetos usando la primera fila como headers. */
function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/\r/g, '').trim().split('\n').filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = values[i] ?? ''; });
    return obj;
  });
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export interface UseStreamersResult {
  streamers: Streamer[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook central de datos del torneo.
 *
 * - Obtiene los streamers desde Google Sheets (CSV público).
 * - Obtiene el equipo y las muertes de cada streamer si los GIDs están configurados.
 * - Sobreescribe automáticamente `isLive` con el estado real de Twitch cada 2 minutos.
 *
 * Para añadir equipo/muertes, configura los GIDs en `src/app/config/sheets.ts`.
 */
export function useStreamers(): UseStreamersResult {
  const [rawStreamers, setRawStreamers] = useState<Streamer[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      setError(null);

      try {
        // Pestaña streamers (obligatoria)
        const streamersRes = await fetch(getStreamersUrl());
        if (!streamersRes.ok) {
          throw new Error(`Error ${streamersRes.status} al cargar streamers desde Google Sheets`);
        }
        const streamersText = await streamersRes.text();

        // Pestaña team (opcional)
        let teamRows: Record<string, string>[] = [];
        const teamUrl = getTeamUrl();
        if (teamUrl) {
          try {
            const res = await fetch(teamUrl);
            if (res.ok) teamRows = parseCsv(await res.text());
          } catch { /* Pestaña no disponible — equipo vacío */ }
        }

        // Pestaña deaths (opcional)
        let deathsRows: Record<string, string>[] = [];
        const deathsUrl = getDeathsUrl();
        if (deathsUrl) {
          try {
            const res = await fetch(deathsUrl);
            if (res.ok) deathsRows = parseCsv(await res.text());
          } catch { /* Pestaña no disponible — sin muertes */ }
        }

        if (cancelled) return;

        // Construir objetos Streamer
        const built: Streamer[] = parseCsv(streamersText).map(row => {
          const id = row['id'];

          const team: PokemonTeamMember[] = teamRows
            .filter(t => t['streamerId'] === id)
            .map(t => ({
              name:     t['name'],
              spriteId: Number(t['spriteId']),
              level:    Number(t['level']),
              type1:    t['type1'],
              type2:    t['type2'] || undefined,
              nickname: t['nickname'],
            }));

          const deaths: DeadPokemon[] = deathsRows
            .filter(d => d['streamerId'] === id)
            .map(d => ({
              name:     d['name'],
              spriteId: Number(d['spriteId']),
              nickname: d['nickname'],
              level:    Number(d['level']),
              killedBy: d['killedBy'],
              route:    d['route'],
            }));

          return {
            id,
            name:        row['name'],
            twitch:      row['twitch'],
            starter:     row['starter'],
            badges:      Number(row['badges']) || 0,
            isEliminated: row['isEliminated']?.toUpperCase() === 'TRUE',
            isLive:      false, // sobreescrito por useLiveStreamers más abajo
            currentZone: row['currentZone'] || '',
            team,
            deaths,
          };
        });

        setRawStreamers(built);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido cargando datos');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  // Enriquecer con el estado real de Twitch
  const twitchHandles = useMemo(() => rawStreamers.map(s => s.twitch), [rawStreamers]);
  const liveSet = useLiveStreamers(twitchHandles);

  const streamers = useMemo(() => {
    if (liveSet.size === 0) return rawStreamers;
    return rawStreamers.map(s => ({
      ...s,
      isLive: liveSet.has(s.twitch.replace('@', '').toLowerCase()),
    }));
  }, [rawStreamers, liveSet]);

  return { streamers, loading, error };
}
