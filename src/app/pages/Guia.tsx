import { PageHeader } from '../components/PageHeader';
import { GuiaAnilBasica } from '../components/GuiaAnilBasica';

export function Guia() {
  return (
    <div className="min-h-screen bg-[#1e1b4b] px-4 py-12">
      <div className="mx-auto max-w-7xl">

        <PageHeader
          badge="PSL2 · Temporada 2"
          title="GUÍA"
          subtitle="Guía básica para avanzar en Pokémon Añil sin perderte"
        />

        {/* Guía principal */}
        <section className="mt-12">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
            <GuiaAnilBasica />
          </div>
        </section>

      </div>
    </div>
  );
}