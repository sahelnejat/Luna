import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

export const AnimatedSection = ({ children, className = '', animation = 'fade-up', delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  const animations = {
    'fade-up': 'translate-y-12 opacity-0',
    'fade-down': '-translate-y-12 opacity-0',
    'fade-left': 'translate-x-12 opacity-0',
    'fade-right': '-translate-x-12 opacity-0',
    'zoom-in': 'scale-90 opacity-0',
    'zoom-out': 'scale-110 opacity-0',
    'flip-up': 'rotateX-90 opacity-0',
    'flip-left': 'rotateY-90 opacity-0',
    '3d-float': 'translate-y-8 translate-z-neg opacity-0',
    '3d-tilt': 'rotate-3d-initial opacity-0',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'translate-y-0 translate-x-0 scale-100 opacity-100 rotate-0' : animations[animation]
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

export const Animated3DCard = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isVisible ? transform : 'perspective(1000px) translateY(50px)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export const ParallaxSection = ({ children, className = '', speed = 0.5 }) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        if (scrolled > 0 && rect.top < window.innerHeight) {
          setOffset(scrolled * speed * 0.1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export const StaggeredContainer = ({ children, className = '', staggerDelay = 100 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * staggerDelay}ms` }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
};
