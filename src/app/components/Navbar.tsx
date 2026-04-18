import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import logo from '../../imports/Recurso_3.png';

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/evento', label: 'Evento' },
    { to: '/participantes', label: 'Participantes' },
    { to: '/guia', label: 'Guía' },
    { to: '/utilidades', label: 'Utilidades' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1e1b4b]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="PSL2 Logo" className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-['Nunito'] text-sm sm:text-base transition-colors ${
                  location.pathname === link.to
                    ? 'text-[#fbbf24]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[#1e1b4b]/98 px-4 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`font-['Nunito'] text-base px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === link.to
                  ? 'text-[#fbbf24] bg-[#fbbf24]/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}