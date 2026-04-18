import { Link } from 'react-router';
import logo from '../../imports/Recurso_3.png';

export function Footer() {
  const links = [
    { to: '/evento', label: 'Evento' },
    { to: '/participantes', label: 'Participantes' },
    { to: '/guia', label: 'Guía' },
    { to: '/utilidades', label: 'Utilidades' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#1e1b4b]/95">
      {/* Pixel separator */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #fbbf24 30%, #f43f5e 70%, transparent)' }} />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <img src={logo} alt="PSL2" className="h-12 w-auto" />
            <p className="font-['Nunito'] text-sm text-gray-400 text-center sm:text-left leading-relaxed">
              El torneo Nuzlocke de streamers hispanohablantes.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-['Press_Start_2P'] text-xs text-[#fbbf24] mb-1">Secciones</p>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-['Nunito'] text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Credits */}
          <div className="flex flex-col items-center sm:items-end gap-2 text-center sm:text-right">
            <p className="font-['Press_Start_2P'] text-xs text-[#fbbf24] mb-1">Créditos</p>
            <p className="font-['Nunito'] text-sm text-gray-400">
              Sprites: <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PokéAPI</a>
            </p>
            <p className="font-['Nunito'] text-sm text-gray-400">
              Tipos: <a href="https://pokemonshowdown.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pokémon Showdown</a>
            </p>
            <p className="font-['Nunito'] text-sm text-gray-400">
              Avatares: <a href="https://unavatar.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">unavatar.io</a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-['Nunito'] text-xs text-gray-500">
            © 2025 Pokémon Streamers League 2
          </p>
          <p className="font-['Nunito'] text-xs text-gray-500">
            Hecho con ❤️ para la comunidad hispana
          </p>
        </div>
      </div>
    </footer>
  );
}