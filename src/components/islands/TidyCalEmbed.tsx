import React, { useState } from 'react';
import { TIDYCAL_URL } from '../../lib/constants';

interface TidyCalEmbedProps {
  url?: string;
  height?: number;
  className?: string;
}

export const TidyCalEmbed: React.FC<TidyCalEmbedProps> = ({
  url = TIDYCAL_URL,
  height = 800,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-off-white"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
            <p className="mt-4 text-neutral-slate">Kalender wird geladen...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div
          className="flex items-center justify-center bg-neutral-off-white"
          style={{ height: `${height}px` }}
        >
          <div className="text-center px-4">
            <p className="text-neutral-charcoal font-medium mb-2">
              Der Kalender konnte nicht geladen werden.
            </p>
            <p className="text-neutral-slate text-sm mb-4">
              Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light underline"
            >
              Kalender in neuem Tab öffnen →
            </a>
          </div>
        </div>
      )}

      {/* TidyCal Iframe */}
      <iframe
        src={url}
        title="Termin buchen - TidyCal Kalender"
        className={`w-full border-0 rounded-lg ${isLoading || hasError ? 'invisible' : 'visible'}`}
        style={{ height: `${height}px`, minHeight: '600px' }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

export default TidyCalEmbed;
