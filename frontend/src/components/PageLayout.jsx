import React, { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';
import Footer from './Footer';

const GradientBackground = lazy(() =>
  import('./ui/paper-design-shader-background').then(m => ({ default: m.GradientBackground }))
);

let hasShownLoader = false;

const PageLayout = ({ children }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(!hasShownLoader);
  const [bgReady, setBgReady] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    setIsMobile(mq.matches);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fire = () => setBgReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(fire, { timeout: 2000 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id);
    }
    const t = setTimeout(fire, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    hasShownLoader = true;
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animated');
      }),
      { threshold: 0.1 }
    );
    const timeout = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }, 150);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let idleTimer;
    const show = () => {
      document.documentElement.classList.add('is-scrolling');
      document.body.classList.add('is-scrolling');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling');
        document.body.classList.remove('is-scrolling');
      }, 800);
    };
    window.addEventListener('scroll', show, { passive: true });
    window.addEventListener('wheel', show, { passive: true });
    window.addEventListener('touchmove', show, { passive: true });
    return () => {
      window.removeEventListener('scroll', show);
      window.removeEventListener('wheel', show);
      window.removeEventListener('touchmove', show);
      clearTimeout(idleTimer);
    };
  }, []);

  /* Particles are generated once per breakpoint change. Wrapped in useMemo so
     parent state changes (e.g. Services page's scroll-driven zoom) don't
     re-randomize them on every scroll tick. */
  const particles = useMemo(() => {
    const count = isMobile ? 10 : 30;
    const list = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 8 + 6;
      list.push(
        <div
          key={i}
          className="particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 10 + 15}s`
          }}
        />
      );
    }
    return list;
  }, [isMobile]);

  return (
    <div className="starton-page">
      <div className={`loading-spinner ${!isLoading ? 'hidden' : ''}`}>
        <img
          className="loader-logo"
          src="/images/starton-wordmarker.png"
          alt="STARTON"
          width="360"
          height="67"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {bgReady && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {isMobile ? (
            <div className="mobile-shader-wrapper" aria-hidden="true">
              <Suspense fallback={null}>
                <GradientBackground isDark={isDarkTheme} />
              </Suspense>
            </div>
          ) : (
            <Suspense fallback={null}>
              <GradientBackground isDark={isDarkTheme} />
            </Suspense>
          )}
          <div className="grid-pattern"></div>
          <div className="particles-container">{particles}</div>
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
        </div>
      )}

      <Header />

      <main>{children}</main>

      <Footer />

      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" data-testid="theme-toggle-btn" style={isMobile ? { transform: 'translateY(-5%)' } : {}}>
        {isDarkTheme ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default PageLayout;
