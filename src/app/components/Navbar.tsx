import { Link, useLocation } from 'react-router';
import logo from '../../imports/Recurso_3.png';

export function Navbar() {
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'Evento' },
    { to: '/participantes', label: 'Participantes' },
    { to: '/guia', label: 'Guía' },
    { to: '/utilidades', label: 'Utilidades' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1e1b4b]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="PSL2 Logo" className="h-10 sm:h-12 w-auto" />
          </Link>
          
          <div className="flex gap-2 sm:gap-6">
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
        </div>
      </div>
    </nav>
  );
}