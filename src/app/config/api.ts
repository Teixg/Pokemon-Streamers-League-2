export const POKEAPI_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites';

export function getPokemonSpriteUrl(id: number | string): string {
  return `${POKEAPI_BASE_URL}/pokemon/${id}.png`;
}

export function getItemSpriteUrl(name: string): string {
  return `${POKEAPI_BASE_URL}/items/${name}.png`;
}

export function getBadgeSpriteUrl(id: number | string): string {
  return `${POKEAPI_BASE_URL}/badges/${id}.png`;
}

export function getTypeSpriteUrl(typeId: number | string): string {
  return `${POKEAPI_BASE_URL}/types/generation-viii/sword-shield/small/${typeId}.png`;
}
