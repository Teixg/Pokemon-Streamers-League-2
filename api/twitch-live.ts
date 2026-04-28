import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * GET /api/twitch-live?logins=alexbynight,cristinini,...
 *
 * Comprueba qué streamers de la lista están actualmente en directo en Twitch.
 * Usa el flujo de Client Credentials (machine-to-machine) para no exponer
 * credenciales en el frontend.
 *
 * Respuesta: { live: string[] } — array de logins en minúsculas que están en directo.
 * En caso de error devuelve { live: [] } para que la UI degrade graciosamente.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Permitir caché de 1 minuto en el CDN de Vercel para no saturar la API de Twitch
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { logins } = req.query;
  if (!logins || (typeof logins === 'string' && logins.trim() === '')) {
    return res.status(400).json({ error: 'Missing logins parameter', live: [] });
  }

  const loginList = (Array.isArray(logins) ? logins.join(',') : logins)
    .split(',')
    .map(l => l.replace('@', '').toLowerCase().trim())
    .filter(Boolean);

  if (loginList.length === 0) {
    return res.json({ live: [] });
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing Twitch credentials in environment variables');
    return res.status(500).json({ error: 'Server misconfigured', live: [] });
  }

  try {
    // Paso 1: Obtener token de acceso (App Access Token — no requiere login de usuario)
    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });

    if (!tokenRes.ok) {
      throw new Error(`Token request failed with status ${tokenRes.status}`);
    }

    const { access_token } = await tokenRes.json() as { access_token: string };

    // Paso 2: Consultar cuáles de los logins están en directo
    const params = new URLSearchParams({ first: '100' });
    for (const login of loginList) {
      params.append('user_login', login);
    }

    const streamsRes = await fetch(
      `https://api.twitch.tv/helix/streams?${params.toString()}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    if (!streamsRes.ok) {
      throw new Error(`Streams request failed with status ${streamsRes.status}`);
    }

    const { data } = await streamsRes.json() as { data: Array<{ user_login: string }> };
    const live = data.map(s => s.user_login.toLowerCase());

    return res.json({ live });
  } catch (err) {
    console.error('[twitch-live] Error:', err);
    // Degradación elegante: devolvemos lista vacía en lugar de romper la UI
    return res.status(500).json({ error: 'Failed to fetch Twitch status', live: [] });
  }
}
