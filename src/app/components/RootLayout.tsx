import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#1e1b4b]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}