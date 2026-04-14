import React, { useEffect, useRef, useState } from 'react';
import { TIDYCAL_URL } from '../../lib/constants';

interface TidyCalEmbedProps {
  url?: string;
  height?: number;
  className?: string;
}

function getPathFromUrl(url: string): string {
  try {
    return new URL(url).pathname.replace(/^\//, '');
  } catch {
    return url;
  }
}

export const TidyCalEmbed: React.FC<TidyCalEmbedProps> = ({
  url = TIDYCAL_URL,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const path = getPathFromUrl(url);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove any previously injected script to allow re-init
    const existingScript = document.querySelector('script[data-tidycal-embed]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net//js/embed.js';
    script.async = true;
    script.setAttribute('data-tidycal-embed', '');
    script.onload = () => setIsLoading(false);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center py-16 bg-neutral-off-white rounded-lg">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
            <p className="mt-4 text-neutral-slate">Kalender wird geladen...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className={`tidycal-embed ${isLoading ? 'invisible absolute' : ''}`}
        data-path={path}
      />
    </div>
  );
};

export default TidyCalEmbed;
