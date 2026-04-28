import { useEffect, useRef, useState } from 'react';

const REFRESH_INTERVAL_MS = 2 * 60 * 1000; // Refresca cada 2 minutos

/**
 * Hook que comprueba qué streamers están en directo en Twitch.
 *
 * @param twitchHandles - Array de handles de Twitch (con o sin @)
 * @returns Un Set con los logins (en minúsculas) que están actualmente en directo.
 *
 * @example
 * const liveSet = useLiveStreamers(['@alexbynight', '@cristinini']);
 * const isAlexLive = liveSet.has('alexbynight'); // true / false
 */
export function useLiveStreamers(twitchHandles: string[]): Set<string> {
  const [liveSet, setLiveSet] = useState<Set<string>>(new Set());
  // Usamos una ref estable de la lista para no re-disparar el effect si el array
  // cambia de referencia pero no de contenido.
  const loginsKey = twitchHandles
    .map(h => h.replace('@', '').toLowerCase())
    .sort()
    .join(',');
  const loginsKeyRef = useRef(loginsKey);
  loginsKeyRef.current = loginsKey;

  useEffect(() => {
    if (!loginsKey) return;

    async function fetchLive() {
      try {
        const res = await fetch(`/api/twitch-live?logins=${loginsKeyRef.current}`);
        if (!res.ok) return;
        const data = await res.json() as { live: string[] };
        if (Array.isArray(data.live)) {
          setLiveSet(new Set(data.live));
        }
      } catch {
        // Error de red: mantenemos el estado anterior, no rompemos la UI
      }
    }

    fetchLive();
    const interval = setInterval(fetchLive, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loginsKey]);

  return liveSet;
}
