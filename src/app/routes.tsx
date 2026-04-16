import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { Home } from './pages/Home';
import { Participantes } from './pages/Participantes';
import { Guia } from './pages/Guia';
import { Utilidades } from './pages/Utilidades';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'participantes', Component: Participantes },
      { path: 'guia', Component: Guia },
      { path: 'utilidades', Component: Utilidades },
    ],
  },
]);
