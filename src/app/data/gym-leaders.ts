export interface GymLeader {
  number: number;
  name: string;
  city: string;
  type: string;
  ace: string;
  trainerSpriteUrl: string;
  topLevel: number;
  tip: string;
}

const PS = 'https://play.pokemonshowdown.com/sprites/trainers';

export const gymLeaders: GymLeader[] = [
  {
    number: 1,
    name: 'Brock',
    city: 'Ciudad Plateada',
    type: 'rock',
    ace: 'Onix',
    trainerSpriteUrl: `${PS}/brock.png`,
    topLevel: 14,
    tip: 'Usa tipos Agua o Planta para ventaja'
  },
  {
    number: 2,
    name: 'Misty',
    city: 'Ciudad Celeste',
    type: 'water',
    ace: 'Starmie',
    trainerSpriteUrl: `${PS}/misty.png`,
    topLevel: 21,
    tip: 'Pokémon Eléctrico o Planta recomendados'
  },
  {
    number: 3,
    name: 'Lt. Surge',
    city: 'Ciudad Carmín',
    type: 'electric',
    ace: 'Raichu',
    trainerSpriteUrl: `${PS}/ltsurge.png`,
    topLevel: 24,
    tip: 'Tipo Tierra es inmune a Eléctrico'
  },
  {
    number: 4,
    name: 'Erika',
    city: 'Ciudad Azulona',
    type: 'grass',
    ace: 'Vileplume',
    trainerSpriteUrl: `${PS}/erika.png`,
    topLevel: 29,
    tip: 'Fuego, Hielo, Volador o Psíquico'
  },
  {
    number: 5,
    name: 'Koga',
    city: 'Ciudad Fucsia',
    type: 'poison',
    ace: 'Weezing',
    trainerSpriteUrl: `${PS}/koga.png`,
    topLevel: 43,
    tip: 'Cuidado con Tóxico. Usa Tierra o Psíquico'
  },
  {
    number: 6,
    name: 'Sabrina',
    city: 'Ciudad Azafrán',
    type: 'psychic',
    ace: 'Alakazam',
    trainerSpriteUrl: `${PS}/sabrina.png`,
    topLevel: 43,
    tip: 'Tipo Fantasma o Siniestro son efectivos'
  },
  {
    number: 7,
    name: 'Blaine',
    city: 'Isla Canela',
    type: 'fire',
    ace: 'Arcanine',
    trainerSpriteUrl: `${PS}/blaine.png`,
    topLevel: 47,
    tip: 'Agua, Tierra o Roca para apagar el fuego'
  },
  {
    number: 8,
    name: 'Giovanni',
    city: 'Ciudad Verde',
    type: 'ground',
    ace: 'Rhydon',
    trainerSpriteUrl: `${PS}/giovanni.png`,
    topLevel: 50,
    tip: 'Agua y Planta son super efectivos'
  },
];
