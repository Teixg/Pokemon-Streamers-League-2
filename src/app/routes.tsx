import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { Home } from './pages/Home';
import { Evento } from './pages/Evento';
import { Participantes } from './pages/Participantes';
import { Guia } from './pages/Guia';
import { Utilidades } from './pages/Utilidades';
import { Cementerio } from './pages/Cementerio';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'evento', element: <Evento /> },
      { path: 'participantes', element: <Participantes /> },
      { path: 'guia', element: <Guia /> },
      { path: 'utilidades', element: <Utilidades /> },
      { path: 'cementerio', element: <Cementerio /> },

    ],
  },
]);
