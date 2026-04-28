import { useState, useCallback } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** URL de fallback si la imagen principal falla. Si no se proporciona, muestra un placeholder SVG */
  fallbackSrc?: string;
  /** Muestra skeleton de carga antes de que la imagen esté lista */
  skeleton?: boolean;
  /** Clases adicionales para el contenedor del skeleton */
  skeletonClassName?: string;
}

const PLACEHOLDER_SVG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K';

/**
 * SmartImage: componente único que reemplaza tanto ImageWithFallback como SkeletonImage.
 *
 * Antes había dos componentes haciendo casi lo mismo de formas distintas:
 * - ImageWithFallback: manejaba errores con un placeholder SVG
 * - SkeletonImage: mostraba skeleton durante la carga
 *
 * Este componente hace ambas cosas y es consistente en toda la app.
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc,
  skeleton = false,
  skeletonClassName = '',
  className = '',
  style,
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  // Rastrea si ya intentamos el fallbackSrc para no entrar en bucle infinito
  const [usedFallback, setUsedFallback] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!usedFallback && fallbackSrc) {
      // Intentar con la URL de fallback antes de rendirse
      setUsedFallback(true);
      e.currentTarget.src = fallbackSrc;
    } else {
      // Sin más opciones: mostrar placeholder
      setErrored(true);
      setLoaded(true);
    }
  }, [fallbackSrc, usedFallback]);

  const effectiveSrc = errored ? PLACEHOLDER_SVG : src;

  return (
    <span className="relative inline-flex" style={{ display: 'inline-flex' }}>
      {/* Skeleton visible solo mientras carga y skeleton está activado */}
      {skeleton && !loaded && (
        <span
          className={`skeleton absolute inset-0 ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      <img
        src={effectiveSrc}
        alt={alt}
        className={className}
        style={{
          ...style,
          // Con skeleton: ocultar hasta cargar. Sin skeleton: mostrar siempre
          opacity: skeleton && !loaded ? 0 : 1,
          transition: skeleton ? 'opacity 0.3s ease' : undefined,
        }}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </span>
  );
}

// Re-exportar con nombres compatibles para migración gradual
// así no hay que cambiar todos los imports de golpe
export { SmartImage as ImageWithFallback };
export { SmartImage as SkeletonImage };
