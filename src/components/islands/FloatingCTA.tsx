import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { trackFloatingCtaClick } from '../../lib/analytics';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 300;
      const shouldShow = window.scrollY > scrollThreshold;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    trackFloatingCtaClick();
    window.location.href = '/angebot#prozess-check';
  };

  if (!isVisible || isFooterVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button
        variant="primary"
        size="lg"
        onClick={handleClick}
        className="animate-soft-glow hover:scale-105 transition-transform duration-300"
        aria-label="Prozess-Check anfragen"
      >
        <Calendar className="h-5 w-5 mr-2" />
        Prozess-Check anfragen
      </Button>
    </div>
  );
}

export default FloatingCTA;
