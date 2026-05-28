import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Quote,
  Sparkles, Type, FileText, Film, Megaphone, Repeat,
  Monitor, Layout, Search, Workflow, ShoppingBag, Filter, Headphones, Database, UserCog,
  Compass, Map, Crosshair, Layers, MessageSquare, Target, BarChart3, Boxes,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { testimonials } from '../data/projects';
import { PRICING_TIERS, FAQS, VIDEO_SOURCES, MEDIA_ASSETS, PILLAR_OBJECTS } from '../data/solutions';

/* =========================================================================
   PILLAR DATA — outcome-first, trimmed for one-screen scenes
   ========================================================================= */
const PILLARS = [
  {
    num: '01',
    color: 'p1',
    id: 'pillar1',
    eyebrow: 'Media & Identity',
    title: 'Brands that mean something.',
    word: 'Brand',
    lede: 'The story, the system, the soul — engineered so customers choose you on instinct.',
    video: VIDEO_SOURCES.p1,
    services: [
      { icon: Sparkles,  title: 'Brand image & storytelling' },
      { icon: Type,      title: 'Visual identity systems' },
      { icon: FileText,  title: 'Original brand content' },
      { icon: Film,      title: 'Video, animation & B-rolls' },
      { icon: Megaphone, title: 'Physical OOH production' },
      { icon: Repeat,    title: 'Re-branding & evolution' },
    ],
    full: [
      { icon: Sparkles,  title: 'Brand image & storytelling',           outcomeTag: 'Recall +4×',         desc: 'Be the brand customers can name in one breath.' },
      { icon: Type,      title: 'Visual identity systems',               outcomeTag: 'Design debt: 0',     desc: 'One system across every touchpoint, forever.' },
      { icon: FileText,  title: 'Original brand content, in your voice', outcomeTag: 'Engagement 2.6×',    desc: 'Recognisable mid-feed without seeing the logo.' },
      { icon: Film,      title: 'Video, animation & B-rolls',            outcomeTag: 'CTR +180%',          desc: 'Films and motion that move metrics, not just frames.' },
      { icon: Megaphone, title: 'Physical OOH production',               outcomeTag: 'Offline recall',     desc: "Billboards, transit and installations the algorithm can't touch." },
      { icon: Repeat,    title: 'Re-branding & brand evolution',         outcomeTag: 'Zero-churn shift',   desc: 'Reset perception without losing the equity.' },
    ],
  },
  {
    num: '02',
    color: 'p2',
    id: 'pillar2',
    eyebrow: 'Tech & Automation',
    title: 'Engines that work while you sleep.',
    word: 'Engine',
    lede: 'Sites that sell. Funnels that don\'t leak. Workflows that handle the boring work.',
    video: VIDEO_SOURCES.p2,
    services: [
      { icon: Monitor,     title: 'High-performing websites' },
      { icon: Layout,      title: 'Web apps & landing pages' },
      { icon: Search,      title: 'SEO & performance' },
      { icon: Workflow,    title: 'N8N automations' },
      { icon: ShoppingBag, title: 'E-commerce engines' },
      { icon: Filter,      title: 'Lead scraping & routing' },
      { icon: Headphones,  title: 'Voice agents' },
      { icon: Database,    title: 'Sales & CRM automation' },
      { icon: UserCog,     title: 'HR automation' },
    ],
    full: [
      { icon: Monitor,     title: 'High-performing designer websites', outcomeTag: 'Conv 3.4×',     desc: 'Sub-2s load, copy tuned to convert.' },
      { icon: Layout,      title: 'Web apps & landing pages',          outcomeTag: 'CPL −44%',      desc: 'Campaign pages that pay for the campaign.' },
      { icon: Search,      title: 'SEO & performance optimization',    outcomeTag: 'Org 8×',        desc: 'Built for the rankings you don\'t have yet.' },
      { icon: Workflow,    title: 'N8N automations',                   outcomeTag: '20 hrs/wk back', desc: 'Humans do human work — flows do the rest.' },
      { icon: ShoppingBag, title: 'E-commerce engines',                outcomeTag: 'AOV +67%',      desc: 'Engineered for AOV, retention and LTV.' },
      { icon: Filter,      title: 'Lead scraping & management',        outcomeTag: 'SQL rate 2×',   desc: 'Auto-discover, enrich and route.' },
      { icon: Headphones,  title: 'Best-in-class voice agents',        outcomeTag: '24/7',          desc: 'Picks up, qualifies, books, follows up.' },
      { icon: Database,    title: 'Sales & CRM automation',            outcomeTag: 'Cycle −38%',     desc: 'Pipeline that doesn\'t go cold.' },
      { icon: UserCog,     title: 'HR automation',                     outcomeTag: 'Time-to-hire −60%', desc: 'Hire 3× faster, culture stays human.' },
    ],
  },
  {
    num: '03',
    color: 'p3',
    id: 'pillar3',
    eyebrow: 'Strategy & Positioning',
    title: 'Why you win — before you fight.',
    word: 'Strategy',
    lede: 'Sharpen who you\'re for, what you stand for, and why you\'re inevitable.',
    video: VIDEO_SOURCES.p3,
    services: [
      { icon: Compass,       title: 'Market diagnostics' },
      { icon: Map,           title: 'Go-to-market planning' },
      { icon: Crosshair,     title: 'Positioning framework' },
      { icon: Layers,        title: 'Business model strategy' },
      { icon: MessageSquare, title: 'Brand guidelines & voice' },
      { icon: Target,        title: 'Ad campaign design' },
      { icon: BarChart3,     title: 'Digital marketing framework' },
      { icon: Boxes,         title: 'E-commerce production' },
    ],
    full: [
      { icon: Compass,       title: 'Market & traction diagnostics',                outcomeTag: 'Clarity',         desc: 'Find the leverage. Find the bleed.' },
      { icon: Map,           title: 'Go-to-market planning',                       outcomeTag: 'PMF in <4 mo',   desc: 'Audience, offer, channel, sequence — to dollars.' },
      { icon: Crosshair,     title: 'Business & product positioning framework',    outcomeTag: 'Win rate +160%', desc: 'Customers self-select instead of negotiating.' },
      { icon: Layers,        title: 'Business model strategy',                     outcomeTag: 'Margin +2.8×',   desc: 'Pricing customers are quietly willing to pay.' },
      { icon: MessageSquare, title: 'Brand guidelines, copy & voice',               outcomeTag: 'One brain',      desc: 'A voice anyone on your team can write from.' },
      { icon: Target,        title: 'Strategic ad campaign design',                outcomeTag: 'ROAS +220%',     desc: 'Every layer accountable to a number.' },
      { icon: BarChart3,     title: 'Digital marketing framework',                  outcomeTag: 'CAC −44%',        desc: 'Compounds quarter over quarter.' },
      { icon: Boxes,         title: 'Full-spectrum e-commerce production',         outcomeTag: 'Revenue 2×',     desc: 'Positioning, creative, storefront, ads — one system.' },
    ],
  },
];

/* =========================================================================
   HOOKS
   ========================================================================= */

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* 3D tilt with glare — used on subcat & pricing cards. */
const useTiltGlare = (max = 10) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      raf = requestAnimationFrame(() => {
        el.style.transform =
          `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
        el.style.setProperty('--glare-x', `${(x * 100 + 50).toFixed(1)}%`);
        el.style.setProperty('--glare-y', `${(y * 100 + 50).toFixed(1)}%`);
        el.style.setProperty('--glare-opacity', '1');
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      el.style.setProperty('--glare-opacity', '0');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
};

/* Sticky-scene scroll progress: drives --p (0→1) on the element AND
   returns a numeric progress for class-toggle decisions in children. */
const useSceneProgress = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;
        if (total <= 0) {
          el.style.setProperty('--p', '0');
          setProgress(0);
          return;
        }
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = scrolled / total;
        el.style.setProperty('--p', p.toFixed(4));
        setProgress(p);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, progress };
};

/* Count-up on intersect — once, with reduced-motion fallback. */
const useCountUp = (target, { duration = 1400, decimals = 0 } = {}) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { setValue(target); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          let raf = 0;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(target * eased);
            if (t < 1) raf = requestAnimationFrame(tick);
            else setValue(target);
          };
          raf = requestAnimationFrame(tick);
          el._countUpRaf = raf;
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (el._countUpRaf) cancelAnimationFrame(el._countUpRaf);
    };
  }, [target, duration]);
  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return { ref, value: formatted };
};

/* Video plays only when near viewport; pauses otherwise. */
const useVideoPlayInView = (rootMargin = '20% 0px') => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { el.removeAttribute('autoplay'); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const p = el.play();
          if (p && p.catch) p.catch(() => {});
        } else if (!el.paused) el.pause();
      });
    }, { rootMargin, threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return ref;
};

/* Normalized mouse position in [-0.5, 0.5]. Disabled under reduced motion. */
const useMousePosition = () => {
  const [pos, setPos] = useState({ nx: 0, ny: 0 });
  useEffect(() => {
    if (prefersReduced()) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({
          nx: (e.clientX / window.innerWidth)  - 0.5,
          ny: (e.clientY / window.innerHeight) - 0.5,
        });
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return pos;
};

/* Single-fire reveal on intersection. Returns { ref, shown }. */
const useRevealOnce = (threshold = 0.18) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { setShown(true); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      });
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, shown };
};

/* =========================================================================
   SCENES
   ========================================================================= */

/* SCENE 00 — HERO. Cinematic stage with 4 depth layers:
   video bg → grain → secondary film strip → primary camera → text shell. */
const HeroScene = ({ onPrimary }) => {
  const { ref } = useSceneProgress();
  const { nx, ny } = useMousePosition();
  const videoRef = useVideoPlayInView('0px');
  return (
    <section ref={ref} className="solp-scene solp-scene--hero">
      <div className="solp-scene-stage" style={{ '--mx': nx, '--my': ny }}>
        <div className="solp-hero-video-layer" aria-hidden="true">
          <video
            ref={videoRef}
            className="solp-hero-bg-video"
            autoPlay muted loop playsInline preload="metadata"
            poster={VIDEO_SOURCES.heroReel.poster}
          >
            <source src={VIDEO_SOURCES.heroReel.mp4} type="video/mp4" />
          </video>
          <div className="solp-hero-video-grade" aria-hidden="true"></div>
        </div>

        <div className="solp-hero-grain" aria-hidden="true"></div>



        <div className="container solp-hero-shell">
          <div className="solp-hero-eyebrow">
            <span className="solp-hero-eyebrow-dot" aria-hidden="true"></span>
            Solutions / Transformations.
          </div>

          <h1 className="solp-hero-h1">
            <span className="solp-hero-h1-line">Three pillars.</span>
            <span className="solp-hero-h1-line solp-hero-h1-em"><em>One growth engine.</em></span>
          </h1>

          <p className="solp-hero-lede">
            Brand, infrastructure and strategy — engineered so growth runs itself.
          </p>

          <div className="solp-hero-cta-row">
            <button className="solp-cta-primary" onClick={onPrimary} data-testid="services-cta-btn">
              <span>Book a diagnostic</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="solp-hero-rail" aria-hidden="true">
          Solutions · Transformations · Scroll
        </div>

        <div className="solp-hero-scrollhint" aria-hidden="true">
          <span className="solp-hero-scrollhint-line"></span>
          <span className="solp-hero-scrollhint-text">Scroll</span>
        </div>
      </div>
    </section>
  );
};

/* SCENE 01 — MANIFESTO. Word-by-word blur-to-clear reveal over 2x viewport.
   Ghost word "Aligned." sits behind at 4%; paper texture drifts up-right. */
const MANIFESTO = [
  'Most', 'brands', 'aren\'t', 'broken', '—',
  'they\'re', 'misaligned.',
  'We', 'fix', 'the', 'alignment.',
  'The', 'growth', 'follows.',
];

const ManifestoScene = () => {
  const { ref, progress } = useSceneProgress();
  const { nx, ny } = useMousePosition();
  return (
    <section ref={ref} className="solp-scene solp-scene--manifesto">
      <div className="solp-scene-stage solp-scene-stage--padded" style={{ '--mx': nx, '--my': ny }}>
        <span className="solp-manifesto-ghost" aria-hidden="true">Aligned.</span>

        <div className="solp-manifesto-paper" aria-hidden="true">
          <img src={MEDIA_ASSETS.manifestoPaper.src} alt="" loading="lazy" />
        </div>

        <div className="container">
          <div className="solp-manifesto-eyebrow">— Thesis</div>
          <h2 className="solp-manifesto-text">
            {MANIFESTO.map((word, i) => {
              const threshold = (i / MANIFESTO.length) * 0.85;
              const isOn = progress >= threshold;
              return (
                <span
                  key={i}
                  className={`solp-manifesto-word${isOn ? ' is-on' : ' '}`}
                >
                  {word}{' '}
                </span>
              );
            })}
          </h2>
          <div className="solp-manifesto-footer">
            <span>01</span>
            <span className="solp-manifesto-rule" aria-hidden="true"></span>
            <span>Thesis</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* SCENE 01.5 — JUMP TO PILLAR. Small navigation section to jump to pillars. */
const JumpToPillarScene = () => {
  const ref = useRef(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsIn(entry.isIntersecting));
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePillarClick = (e, pillarId) => {
    e.preventDefault();
    const element = document.getElementById(pillarId);
    if (element) {
      const targetTop = element.getBoundingClientRect().top + window.scrollY;
      const startTop = window.scrollY;
      const distance = targetTop - startTop;
      const duration = 5200; // ms
      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const scroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startTop + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      };

      requestAnimationFrame(scroll);
    }
  };

  return (
    <section ref={ref} className="solp-scene solp-scene--jump-to-pillar">
      <div className="solp-scene-stage solp-scene-stage--padded">
        <div className="container">
          <div className="solp-jump-header">
            <h3 className="solp-jump-title">- Jump to a pillar -</h3>
          </div>
          <div className={`solp-jump-links${isIn ? ' is-in' : ''}`}>
            {PILLARS.map((pillar) => (
              <a key={pillar.id} href={`#${pillar.id}`} onClick={(e) => handlePillarClick(e, pillar.id)} className={`solp-jump-link solp-jump-link--${pillar.color}`}>
                <span className="solp-jump-link-num">{pillar.num} </span>
                <span className="solp-jump-link-text">{pillar.eyebrow}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* SCENE 02 — METRICS. Three full-bleed cinematic photos cross-fade
   under giant numerals. Massive ghost "01/02/03" on right. */
const METRICS = [
  { num: 40,  suffix: '+', label: 'Brands shipped',     detail: 'Across four continents, since 2021.',          photo: MEDIA_ASSETS.metricsBrandImg.src,     glyph: '01' },
  { num: 3.4, suffix: '×', decimals: 1, label: 'Average ROI', detail: 'Measured over a 12-month window.',       photo: MEDIA_ASSETS.metricsRoiImg.src,       glyph: '02' },
  { num: 96,  suffix: '%', label: 'Client retention',   detail: 'Most engagements turn into partnerships.',     photo: MEDIA_ASSETS.metricsRetentionImg.src, glyph: '03' },
];

const MetricsScene = () => {
  const { ref, progress } = useSceneProgress();
  const total = METRICS.length;
  const activeIndex = Math.min(total - 1, Math.floor(progress * total));
  return (
    <section ref={ref} className="solp-scene solp-scene--metrics">
      <div className="solp-scene-stage">
        <div className="container">
          <div className="solp-metrics-label">— Receipts / 02</div>
          <div className="solp-metrics-stage">
            {METRICS.map((m, i) => (
              <MetricSlide
                key={i}
                metric={m}
                isActive={i === activeIndex}
                isPast={i < activeIndex}
              />
            ))}
          </div>
          <div className="solp-metrics-progress" aria-hidden="true">
            {METRICS.map((_, i) => (
              <span
                key={i}
                className={`solp-metrics-dot${i <= activeIndex ? ' is-on' : ''}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricSlide = ({ metric, isActive, isPast }) => {
  const { ref, value } = useCountUp(metric.num, { decimals: metric.decimals || 0 });
  const cls = isActive ? ' is-on' : isPast ? ' is-past' : '';
  return (
    <div ref={ref} className={`solp-metric-slide${cls}`}>
      <div
        className="solp-metric-photo"
        style={{ backgroundImage: `url(${metric.photo})` }}
        aria-hidden="true"
      ></div>
      <div className="solp-metric-ghost" aria-hidden="true">{metric.glyph}</div>
      <div className="solp-metric-num">{value}{metric.suffix}</div>
      <div className="solp-metric-label">{metric.label}</div>
      <div className="solp-metric-detail">{metric.detail}</div>
    </div>
  );
};

/* SCENE 03/04/05 — PILLAR DEEP. Sticky 360vh. Signature 3D object
   (camera / Mac / book) floats right and rotates with scroll+mouse.
   Secondary object (polaroid / keyboard / compass) drifts on left.
   Massive numeral background + video bg + scanline overlay. */
const PillarScene = ({ pillar }) => {
  const { ref, progress } = useSceneProgress();
  const { nx, ny } = useMousePosition();
  const videoRef = useVideoPlayInView('0px');

  const objs = PILLAR_OBJECTS[pillar.color] || {};
  const primary   = objs.primary   ? MEDIA_ASSETS[objs.primary]   : null;
  const secondary = objs.secondary ? MEDIA_ASSETS[objs.secondary] : null;
  const glow      = objs.glow || 'rgba(210, 74, 167, 0.45)';

  const metaOn = progress >= 0.02;
  const wordOn = progress >= 0.06;
  const ledeOn = progress >= 0.10;

  return (
    <section
      ref={ref}
      id={pillar.id}
      className={`solp-scene solp-scene--pillar solp-pillar-${pillar.color}`}
    >
      <div className="solp-scene-stage" style={{ '--mx': nx, '--my': ny }}>
        {/* <div className="solp-pillar-bg" aria-hidden="true"> */}
          <video
            ref={videoRef}
            className="solp-pillar-bg-video"
            autoPlay muted loop playsInline preload="metadata"
            poster={pillar.video.poster}
          >
            <source src={pillar.video.mp4} type="video/mp4" />
          </video>
          <div className="solp-pillar-bg-grade" aria-hidden="true"></div>
        {/* </div> */}

        <div className="solp-pillar-numerals" aria-hidden="true">{pillar.num}</div>

        {secondary && (
          <div className="solp-pillar-object solp-pillar-object--secondary" aria-hidden="true">
            <img src={secondary.src} className="solp-pillar-object__img" alt="" loading="lazy" />
          </div>
        )}

        {primary && (
          <div
            className="solp-pillar-object solp-pillar-object--glow"
            style={{ '--obj-glow': glow }}
            aria-hidden="true"
          >
            <img src={primary.src} className="solp-pillar-object__img" alt="" loading="lazy" />
          </div>
        )}

        <div className="container solp-pillar-shell">
          <div className={`solp-pillar-meta${metaOn ? ' is-on' : ''}`}>
            <span className="solp-pillar-meta-num">{pillar.num}</span>
            <span className="solp-pillar-meta-rule" aria-hidden="true"></span>
            <span className="solp-pillar-meta-tag">{pillar.eyebrow}</span>
          </div>

          <h2 className={`solp-pillar-word${wordOn ? ' is-on' : ''}`}>{pillar.word}.</h2>
          <p className={`solp-pillar-lede${ledeOn ? ' is-on' : ''}`}>{pillar.lede}</p>

          <ul className="solp-pillar-list">
            {pillar.services.map((s, i) => {
              const threshold = 0.16 + i * (0.55 / pillar.services.length);
              const isOn = progress >= threshold;
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  className={`solp-pillar-list-item${isOn ? ' is-on' : ''}`}
                >
                  <Icon size={14} className="solp-pillar-list-icon" aria-hidden="true" />
                  <span>{s.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* SCENE 06 — INLINE TESTIMONIAL. Sticky 180vh. Smoke video bg, portrait
   floats right & zooms with scroll, quote parallaxes up. */
const TestimonialScene = ({ quote }) => {
  const { ref } = useSceneProgress();
  const { nx, ny } = useMousePosition();
  const videoRef = useVideoPlayInView('0px');
  if (!quote) return null;
  return (
    <section ref={ref} className="solp-scene solp-scene--quote">
      <div className="solp-scene-stage" style={{ '--mx': nx, '--my': ny }}>
        <div className="solp-quote-video" aria-hidden="true">
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="metadata"
            poster={VIDEO_SOURCES.testimonial.poster}
          >
            <source src={VIDEO_SOURCES.testimonial.mp4} type="video/mp4" />
          </video>
        </div>

        <div className="solp-quote-portrait" aria-hidden="true">
          <img src={MEDIA_ASSETS.testimonialPortrait.src} alt="" loading="lazy" />
        </div>

        <div className="container">
          <Quote className="solp-quote-mark" size={48} aria-hidden="true" />
          <blockquote className="solp-quote-text">{quote.quote}</blockquote>
          <div className="solp-quote-meta">
            <span className="solp-quote-author">{quote.name}</span>
            <span className="solp-quote-dot" aria-hidden="true">·</span>
            <span className="solp-quote-role">{quote.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* SCENE 07 — SHOWCASE. Scroll-driven horizontal carousel of all 23
   services with intra-card 3D depth and per-card scale-in reveal. */
const SubcategoriesShowcase = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sec = sectionRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = sec.offsetHeight - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
        const trackWidth = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(${(-p * trackWidth).toFixed(0)}px, 0, 0)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const allSubs = PILLARS.flatMap(p => p.full.map(s => ({ ...s, color: p.color, pillarNum: p.num })));
  const zoom = progress < 0.15
    ? 0.86 + (progress / 0.15) * 0.14
    : progress < 0.85
    ? 1
    : 1 - (progress - 0.85) / 0.15 * 0.08;
  const total = allSubs.length;

  return (
    <section className="solp-scene solp-scene--showcase" ref={sectionRef}>
      <div className="solp-showcase-pin">
        <div className="solp-showcase-headline" style={{ transform: `scale(${zoom.toFixed(3)})` }}>
          <div className="solp-showcase-label">— The catalogue / 03</div>
          <h2 className="solp-showcase-title">
            Twenty-three services. <em>One engine.</em>
          </h2>
          <div className="solp-showcase-progress">
            <div className="solp-showcase-progress-bar" style={{ width: `${(progress * 100).toFixed(1)}%` }}></div>
          </div>
        </div>
        <div className="solp-showcase-track-wrap">
          <div className="solp-showcase-track" ref={trackRef}>
            {allSubs.map((s, i) => {
              const isIn = progress >= (i / total) * 0.7;
              return (
                <SubcatCard key={i} sub={s} Icon={s.icon} index={i} isIn={isIn} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const SubcatCard = ({ sub, Icon, index, isIn }) => {
  const tiltRef = useTiltGlare(12);
  return (
    <div
      ref={tiltRef}
      className={`solp-subcat-card solp-subcat-${sub.color}${isIn ? ' is-in' : ''}`}
      style={{ '--i': index }}
    >
      <div className="solp-subcat-num">{sub.pillarNum} / {String(index + 1).padStart(2, '0')}</div>
      <div className="solp-subcat-icon"><Icon size={26} aria-hidden="true" /></div>
      <h3 className="solp-subcat-title">{sub.title}</h3>
      <p className="solp-subcat-desc">{sub.desc}</p>
      {sub.outcomeTag && <div className="solp-subcat-outcome">{sub.outcomeTag}</div>}
      <div className="solp-glare" aria-hidden="true"></div>
    </div>
  );
};

/* SCENE 08 — PRICING. Scroll-in reveal scale + hover Z-depth. */
const PricingScene = ({ onContact }) => {
  return (
    <section className="solp-scene solp-scene--pricing" id="solp-pricing">
      <div className="solp-scene-stage solp-scene-stage--padded">
        <div className="container">
          <div className="solp-pricing-head">
            <div className="solp-pricing-label">— Engagement / 04</div>
            <h2 className="solp-pricing-title">
              Three ways <em>to work.</em>
            </h2>
          </div>
          <div className="solp-pricing-grid">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} onContact={onContact} />
            ))}
          </div>
          <p className="solp-pricing-foot">Starting bands. Final scope on the diagnostic call.</p>
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ tier, onContact }) => {
  const tiltRef = useTiltGlare(4);
  const { ref: revealRef, shown } = useRevealOnce(0.22);
  /* Combine tilt + reveal refs into one callback ref. */
  const setRefs = (node) => {
    tiltRef.current = node;
    revealRef.current = node;
  };
  return (
    <article
      ref={setRefs}
      className={`solp-tier${tier.featured ? ' solp-tier--featured' : ''}`}
      style={{ '--p-in': shown ? 1 : 0 }}
    >
      {tier.ribbon && <div className="solp-tier-ribbon">{tier.ribbon}</div>}
      <div className="solp-tier-name">{tier.name}</div>
      <div className="solp-tier-price">{tier.priceBand}<span>{tier.priceUnit}</span></div>
      <div className="solp-tier-tag">{tier.tag}</div>
      
      {tier.features && (
        <ul className="solp-tier-features">
          {tier.features.map((feature, i) => (
            <li key={i} className="solp-tier-feature">
              <svg className="solp-tier-feature-check" viewBox="0 0 20 20" width="16" height="16">
                <polyline points="3,10 7,14 17,4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      <button className="solp-tier-cta" onClick={onContact}>
        {tier.cta} <ArrowRight size={14} aria-hidden="true" />
      </button>
      <div className="solp-glare" aria-hidden="true"></div>
    </article>
  );
};

/* SCENE 09 — FAQ. Three ambient drifting italic words behind the list. */
const FaqScene = () => {
  const items = FAQS.slice(0, 4);
  return (
    <section className="solp-scene solp-scene--faq">
      <div className="solp-faq-ambient" aria-hidden="true">
        <span>Honest.</span>
        <span>Operators.</span>
        <span>No deck.</span>
      </div>
      <div className="solp-scene-stage solp-scene-stage--padded">
        <div className="container">
          <div className="solp-faq-head">
            <div className="solp-faq-label">— Before you ask / 05</div>
            <h2 className="solp-faq-title">Honest answers.</h2>
          </div>
          <div className="solp-faq-list">
            {items.map((item, i) => (
              <details key={i} className="solp-faq-item">
                <summary className="solp-faq-q">
                  <span className="solp-faq-q-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="solp-faq-q-text">{item.q}</span>
                  <span className="solp-faq-q-plus" aria-hidden="true">+</span>
                </summary>
                <div className="solp-faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* SCENE 10 — FINAL CTA. Sticky 200vh. Video bg + scale-into-screen shell. */
const FinalCtaScene = ({ onPrimary }) => {
  const { ref } = useSceneProgress();
  const videoRef = useVideoPlayInView('0px');
  return (
    <section ref={ref} className="solp-scene solp-scene--final">
      <div className="solp-scene-stage">
        <div className="container solp-final-shell">
          <div className="solp-final-label">— Begin / 06</div>
          <h2 className="solp-final-title">
            <span>The right pillar</span>
            <span><em>is one call away.</em></span>
          </h2>
          <p className="solp-final-lede">
           Three ways to work. Final scope is shaped on the diagnostic call — these are the bands you'll land in.
          </p>
          <div className="solp-final-cta-row">
            <button className="solp-cta-primary solp-cta-primary--lg" onClick={onPrimary}>
              <span>Book a diagnostic</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a href="mailto:hello@starton.io" className="solp-cta-text">
              Or email us first
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   PAGE
   ========================================================================= */
const Services = () => {
  const navigate = useNavigate();
  const handleStartProject = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  return (
    <PageLayout>
      <SEO
        title="Solutions"
        description="Three pillars — Brand, Engine, Strategy. One growth engine. Full-spectrum solutions designed to compound."
        path="/solutions"
      />

      <div className="solp-page">
        <HeroScene onPrimary={handleStartProject} />
        <ManifestoScene />
        <JumpToPillarScene />
        <MetricsScene />
        <PillarScene pillar={PILLARS[0]} />
        <TestimonialScene quote={testimonials?.[0]} />
        <PillarScene pillar={PILLARS[1]} />
        <PillarScene pillar={PILLARS[2]} />
        <SubcategoriesShowcase />
        <PricingScene onContact={handleStartProject} />
        <FaqScene />
        <FinalCtaScene onPrimary={handleStartProject} />
      </div>
    </PageLayout>
  );
};

export default Services;
