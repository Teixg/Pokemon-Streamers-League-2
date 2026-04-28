import { SmartImage } from '../SmartImage';
import { getPokemonSpriteUrl } from '../../config/api';

interface PokemonSpriteProps {
  id: number | string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PokemonSprite({ id, alt = 'Pokemon sprite', className = '', style }: PokemonSpriteProps) {
  return (
    <SmartImage
      src={getPokemonSpriteUrl(id)}
      alt={alt}
      skeleton
      className={`pixelated object-contain ${className}`}
      style={style}
    />
  );
}
