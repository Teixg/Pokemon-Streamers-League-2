import { typeColors } from '../data/types';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-block rounded-md font-['Nunito'] font-semibold capitalize text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: typeColors[type] || '#777' }}
    >
      {type}
    </span>
  );
}
