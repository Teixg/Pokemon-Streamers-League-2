import { useRef, useState } from 'react';

const ICONS = {
    tip: "https://github.com/PokeAPI/sprites/blob/d8eba5657870d202c17905a3d9c412a758164b66/sprites/items/poke-doll.png?raw=true",
    battle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/x-attack.png",
    route: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/repel.png",
    gym: "https://github.com/PokeAPI/sprites/blob/d8eba5657870d202c17905a3d9c412a758164b66/sprites/badges/1.png?raw=true",
    warning: "https://github.com/PokeAPI/sprites/blob/d8eba5657870d202c17905a3d9c412a758164b66/sprites/items/shiny-charm.png?raw=true",
    objective: "https://github.com/PokeAPI/sprites/blob/d8eba5657870d202c17905a3d9c412a758164b66/sprites/items/bubble-mail.png?raw=true",
};

const poke = "https://github.com/PokeAPI/sprites/blob/d8eba5657870d202c17905a3d9c412a758164b66/sprites/items/poke-ball.png?raw=true";

const CHAPTERS = [
    { id: 'intro', title: 'Introducción' },
    { id: 'pueblo-paleta', title: 'Pueblo Paleta' },
    { id: 'ruta-verde', title: 'Ruta a Ciudad Verde' },
    { id: 'ciudad-verde', title: 'Ciudad Verde' },
    { id: 'bosque-verde', title: 'Bosque Verde' },
    { id: 'ciudad-plateada', title: 'Ciudad Plateada' },
    { id: 'brock', title: 'Gimnasio Brock' },
];

// 🔎 INDEXABLE DATA (clave del buscador)
const GUIDE_INDEX = [
    {
        chapterId: 'pueblo-paleta',
        chapter: 'Pueblo Paleta',
        title: 'Inicio de la aventura',
        content: 'Sal de tu casa y dirígete al norte. El Profesor Oak te interceptará automáticamente.',
    },
    {
        chapterId: 'pueblo-paleta',
        chapter: 'Pueblo Paleta',
        title: 'Consejo',
        content: 'Las papeleras pueden contener objetos ocultos.',
    },
    {
        chapterId: 'ciudad-verde',
        chapter: 'Ciudad Verde',
        title: 'Caña de pescar',
        content: 'Habla con el NPC que mira el agua para conseguir la caña de pescar.',
    },
    {
        chapterId: 'brock',
        chapter: 'Gimnasio Brock',
        title: 'Combate Brock',
        content: 'Brock tiene 3 Pokémon.',
    },
];

export function GuiaAnilBasica() {
    const refs = useRef<Record<string, HTMLDivElement | null>>({});
    const [active, setActive] = useState('intro');
    const [search, setSearch] = useState('');

    const scrollTo = (id: string) => {
        setActive(id);
        refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // 🔎 FILTRADO
    const results = GUIDE_INDEX.filter((item) =>
        `${item.chapter} ${item.title} ${item.content}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const Chapter = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div ref={(el) => { refs.current[id] = el; }} className="mb-14 scroll-mt-24">
            <h2 className="font-['Press_Start_2P'] text-lg text-[#fbbf24] mb-6">
                {title}
            </h2>
            {children}
        </div>
    );

    const Block = ({ icon, title, children, type = 'tip' }: { icon?: string; title: string; children: React.ReactNode; type?: keyof typeof ICONS }) => {
        if (type === 'tip') {
            return (
                <div className="flex items-start gap-2 pl-3 border-l-2 border-[#fbbf24]/40 mb-3">
                    <img src={icon || ICONS[type]} className="h-5 w-5 mt-0.5 opacity-70" />
                    <div>
                        <span className="font-['Nunito'] font-semibold text-[#fbbf24]/80 text-xs uppercase">{title}: </span>
                        <span className="text-gray-500 text-xs">{children}</span>
                    </div>
                </div>
            );
        }
        return (
            <div className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 mb-4">
                <img src={icon || ICONS[type]} className="h-10 w-10" />
                <div>
                    <h3 className="text-white font-bold">{title}</h3>
                    <p className="text-gray-400 text-sm">{children}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#1e1b4b] px-4 py-10">
            <div className="mx-auto max-w-7xl">

                {/* 🔎 BUSCADOR */}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar en la guía..."
                    className="w-full mb-8 p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />

                {search ? (
                    // 🔎 RESULTADOS
                    <div className="space-y-4">
                        {results.length === 0 && (
                            <p className="text-gray-400">No hay resultados</p>
                        )}

                        {results.map((r, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-[#fbbf24]"
                                onClick={() => scrollTo(r.chapterId)}
                            >
                                <p className="text-xs text-[#fbbf24]">{r.chapter}</p>
                                <h3 className="text-white font-bold">{r.title}</h3>
                                <p className="text-gray-400 text-sm">{r.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    // 📚 CONTENIDO NORMAL
                    <div className="flex gap-8 mt-10">

                        {/* SIDEBAR */}
                        <aside className="hidden md:flex flex-col gap-2 w-64 sticky top-24">
                            {CHAPTERS.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => scrollTo(c.id)}
                                    className={`text-left px-3 py-2 ${active === c.id
                                        ? 'text-[#fbbf24]'
                                        : 'text-gray-400'
                                        }`}
                                >
                                    {c.title}
                                </button>
                            ))}
                        </aside>

                        {/* CONTENIDO */}
                        <div className="flex-1"> {/* INTRO */} <Chapter id="intro" title="Introducción"> <Block type="warning" title="Aviso importante"> Esta guía no es completa. Está pensada para ayudarte a avanzar sin perderte incluso si te saltas diálogos. </Block> <Block type="tip" title="Consejo general"> Revisa siempre NPCs secundarios y objetos del mapa. Pokémon Añil recompensa la exploración. </Block> </Chapter> {/* PUEBLO PALETA */} <Chapter id="pueblo-paleta" title="Pueblo Paleta"> <Block type="objective" title="Inicio de la aventura"> Sal de tu casa y dirígete al norte. El Profesor Oak te interceptará automáticamente. </Block> <Block type="tip" title="Consejo"> Las papeleras pueden contener objetos ocultos. </Block> <Block type="battle" title="Combate contra Azul"> Primer combate del juego. <img src={poke} className="h-4 w-4 inline align-middle" />1 Poke. </Block> </Chapter> {/* RUTA VERDE */} <Chapter id="ruta-verde" title="Ruta a Ciudad Verde"> <Block type="route" title="Avance"> Tras el combate sal al norte de ciudad Paleta y dirígete al norte hasta Ciudad Verde. </Block> <Block type="tip" title="Consejo"> Rocas pequeñas pueden ocultar objetos. </Block> </Chapter> {/* CIUDAD VERDE */} <Chapter id="ciudad-verde" title="Ciudad Verde"> <Block type="objective" title="Objetivo principal"> Encuentra a Hoja y entrega el paquete. </Block> <Block type="tip" title="Consejo"> Escuela Pokémon: responde preguntas para objetos. </Block> <Block type="tip" title="Consejo"> Habla con el NPC que esta mirando el agua para conseguir la <strong style={{ color: '#fbbf24' }}>Caña de Pescar</strong>. </Block> <Block type="objective" title="Objetivo principal"> Ahora ya puedes volver hacia el laboratorio del Profesor Oak y luego volver aqui para avanzar por arriba. </Block> </Chapter> {/* BOSQUE */} <Chapter id="bosque-verde" title="Bosque Verde"> <Block type="route" title="Zona de combate"> Entrenadores opcionales. Puedes evitar combates. </Block> <Block type="battle" title="Combates aproximados"> 2 combates con <img src={poke} className="h-4 w-4 inline align-middle" />1-2 Poke. </Block> </Chapter> {/* CIUDAD PLATEADA */} <Chapter id="ciudad-plateada" title="Ciudad Plateada"> <Block type="objective" title="Progreso"> El gimnasio está bloqueado. Ve al museo. </Block> <Block type="battle" title="Team Rocket"> Combate contra el Team Rocket. <img src={poke} className="h-4 w-4 inline align-middle" />2 Poke. </Block> </Chapter> {/* BROCK */} <Chapter id="brock" title="Gimnasio Brock"> <Block type="tip" title="Consejo"> Hay 2 entrenadores antes de Brock pero al ser evitables no los ponemos en esta guia. </Block> <Block type="gym" title="Líder de gimnasio"> COMBATE CONTRA BROCK. <img src={poke} className="h-4 w-4 inline align-middle" />3 Poke. </Block> </Chapter> </div>
                    </div>
                )}
            </div>
        </div>
    );
}