import { typeColors } from '../data/types';
import { getTypeSpriteUrl } from '../config/api';
const TYPE_IDS: Record<string, number> = {
  normal: 1, fighting: 2, flying: 3, poison: 4, ground: 5,
  rock: 6, bug: 7, ghost: 8, steel: 9, fire: 10, water: 11,
  grass: 12, electric: 13, psychic: 14, ice: 15, dragon: 16,
  dark: 17, fairy: 18,
};


interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2',
  };

  const iconSize = { sm: 14, md: 16, lg: 20 }[size];
  const typeId = TYPE_IDS[type.toLowerCase()];

  return (
    <span
      className={`inline-flex items-center rounded-md font-['Nunito'] font-semibold capitalize text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: typeColors[type] || '#777' }}
    >
      {typeId && (
        <img
          src={getTypeSpriteUrl(typeId)}
          alt=""
          width={iconSize}
          height={iconSize}
          className="object-contain shrink-0"
        />
      )}
      {type}
    </span>
  );
}
