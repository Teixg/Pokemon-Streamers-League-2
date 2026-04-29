import { useMemo } from 'react';
import { streamers as staticStreamers, type Streamer } from '../data/streamers';
import { useLiveStreamers } from './useLiveStreamers';

interface UseStreamersResult {
  streamers: Streamer[];
  /** Por ahora siempre false (datos estáticos). Será true durante el fetch de Google Sheets. */
  loading: boolean;
}

/**
 * Hook central de datos del torneo.
 *
 * - Actualmente devuelve los datos hardcodeados de `streamers.ts`.
 * - Sobreescribe automáticamente `isLive` con el estado real de Twitch
 *   (consultado vía `/api/twitch-live` cada 2 minutos).
 * - Cuando se integre Google Sheets, solo habrá que cambiar este hook;
 *   las páginas no necesitarán ningún cambio.
 */
export function useStreamers(): UseStreamersResult {
  const twitchHandles = useMemo(
    () => staticStreamers.map(s => s.twitch),
    []
  );

  const liveSet = useLiveStreamers(twitchHandles);

  // Enriquecer con el estado real de Twitch.
  // Si liveSet está vacío (antes de que llegue la respuesta o en local sin /api),
  // se mantiene el valor original de isLive del archivo estático como fallback.
  const streamers = useMemo(() => {
    if (liveSet.size === 0) return staticStreamers;

    return staticStreamers.map(s => ({
      ...s,
      isLive: liveSet.has(s.twitch.replace('@', '').toLowerCase()),
    }));
  }, [liveSet]);

  return { streamers, loading: false };
}
