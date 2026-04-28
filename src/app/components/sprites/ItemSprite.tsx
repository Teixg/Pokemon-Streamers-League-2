import { SmartImage } from '../SmartImage';
import { getItemSpriteUrl } from '../../config/api';

interface ItemSpriteProps {
  name: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ItemSprite({ name, alt = '', className = '', style }: ItemSpriteProps) {
  // If the image is purely decorative and alt is empty, we can omit skeleton for items sometimes, 
  // but let's keep it consistent. For items we might not always want the skeleton background if they are tiny icons.
  // We'll pass skeleton=false if alt is empty assuming it's an aria-hidden decorative icon.
  return (
    <SmartImage
      src={getItemSpriteUrl(name)}
      alt={alt}
      aria-hidden={!alt}
      className={`pixelated object-contain ${className}`}
      style={style}
    />
  );
}
