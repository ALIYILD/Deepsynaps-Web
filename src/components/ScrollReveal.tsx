import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in';
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                el.classList.add('is-visible');
              }, delay * 1000);
            } else {
              el.classList.add('is-visible');
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const baseClass =
    animation === 'fade-up'
      ? 'animate-on-scroll'
      : animation === 'fade-in'
        ? 'animate-fade-in'
        : 'animate-scale-in';

  return (
    <div ref={ref} className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
}

// Staggered children wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  maxStagger?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  maxStagger = 0.5,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = el.children;
            Array.from(children).forEach((child, i) => {
              const delay = Math.min(i * staggerDelay, maxStagger);
              setTimeout(() => {
                child.classList.add('is-visible');
              }, delay * 1000);
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerDelay, maxStagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
