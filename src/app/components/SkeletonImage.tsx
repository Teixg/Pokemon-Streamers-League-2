import { useState } from 'react';

interface SkeletonImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function SkeletonImage({ src, alt, className, skeletonClassName, style, onError }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative inline-flex" style={{ display: 'inline-flex' }}>
      {!loaded && (
        <span
          className={`skeleton absolute inset-0 ${skeletonClassName ?? ''}`}
          aria-hidden
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
    </span>
  );
}
