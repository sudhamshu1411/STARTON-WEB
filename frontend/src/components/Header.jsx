import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const PILLARS = [
  {
    num: '01',
    nameLine1: 'Media, Branding',
    nameLine2: '& Identity',
    tag: '— how you feel.',
    color: 'p1',
    services: [
      'Brand Storytelling',
      'Visual Identity Systems',
      'Original Brand Content',
      'Video, Animation & B-Roll',
      'Physical OOH Production',
      'Re-branding & Evolution',
    ],
    link: '/solutions',
  },
  {
    num: '02',
    nameLine1: 'Tech',
    nameLine2: '& Automation',
    tag: '— how you scale.',
    color: 'p2',
    services: [
      'Designer Websites',
      'E-Commerce Engines',
      'Voice Agents',
      'N8N Automations',
      'Sales & CRM Automation',
      '+ 4 more services',
    ],
    link: '/solutions',
  },
  {
    num: '03',
    nameLine1: 'Strategy',
    nameLine2: '& Positioning',
    tag: '— why you win.',
    color: 'p3',
    services: [
      'Go-to-Market Planning',
      'Positioning Framework',
      'Market Diagnostics',
      'Business Model Strategy',
      'Ad Campaign Design',
      '+ 3 more services',
    ],
    link: '/solutions',
  },
];

const COMPANY_PILLARS = [
  {
    num: '01',
    nameLine1: 'Approach',
    nameLine2: '& Method',
    tag: '— how we think.',
    color: 'p1',
    services: [
      'Strategy First',
      'Long-term Partnership',
      'Data-Driven Decisions',
      'Cross-functional Teams',
      'Outcomes Over Outputs',
      'Compounding Quality',
    ],
    link: '/company',
  },
  {
    num: '02',
    nameLine1: 'Careers',
    nameLine2: '& Culture',
    tag: '— join the team.',
    color: 'p2',
    services: [
      'Open Roles',
      'Engineering & Tech',
      'Strategy & Brand',
      'Design & Creative',
      'Internships',
      'How We Hire',
    ],
    link: '/careers',
  },
  {
    num: '03',
    nameLine1: 'Insights',
    nameLine2: '& Research',
    tag: '— what we learn.',
    color: 'p3',
    services: [
      'Latest Articles',
      'Case Studies',
      'Frameworks & Playbooks',
      'Industry Reports',
      'Founder Letters',
      'Research Notes',
    ],
    link: '/insights',
  },
];

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(null);
  const [activeCompanyPillar, setActiveCompanyPillar] = useState(null);
  const servicesTimeoutRef = useRef(null);
  const companyTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (mobileMenuOpen) {
      setHidden(false);
      return;
    }
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const handleStartProject = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  const handleServicesMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(true), 130);
  };
  const handleServicesMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 220);
  };
  const handleCompanyMouseEnter = () => {
    clearTimeout(companyTimeoutRef.current);
    companyTimeoutRef.current = setTimeout(() => setCompanyDropdownOpen(true), 130);
  };
  const handleCompanyMouseLeave = () => {
    clearTimeout(companyTimeoutRef.current);
    companyTimeoutRef.current = setTimeout(() => setCompanyDropdownOpen(false), 220);
  };

  return (
    <>
      <header className={`premium-header ${hidden ? 'hidden' : ''}`}>
        <div className="container">
          <div className="header-content">
            <a href="/" aria-label="STARTON home">
              <img
                className="header-logo"
                data-testid="header-logo"
                src="/images/starton-wordmarker.png"
                alt="STARTON"
                width="219"
                height="41"
                decoding="async"
              />
            </a>

            <nav className="header-nav">
              <Link to="/work" className="nav-item" data-testid="nav-work">Work</Link>

              <div className="nav-item-dropdown sol-trigger-wrap" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                <button className="nav-item" data-testid="nav-services" onClick={() => navigate("/solutions")} aria-expanded={servicesDropdownOpen} aria-haspopup="true">
                  Solutions <ChevronDown size={16} className="chevron" />
                </button>
                {servicesDropdownOpen && (
                  <div className="sol-mega-dropdown" role="menu">
                    <div className="sol-pillars" data-active={activePillar !== null ? activePillar : undefined}>
                      {PILLARS.map((p, i) => (
                        <Link
                          key={p.num}
                          to={p.link}
                          className={`sol-pillar sol-pillar-${p.color} ${activePillar === i ? 'is-active' : ''}`}
                          onMouseEnter={() => setActivePillar(i)}
                          onMouseLeave={() => setActivePillar(null)}
                          onClick={() => { setServicesDropdownOpen(false); setActivePillar(null); }}
                        >
                          <div className="sol-pillar-num">{p.num}</div>
                          <div className="sol-pillar-name">{p.nameLine1}<br />{p.nameLine2}</div>
                          <div className="sol-pillar-tag">{p.tag}</div>
                          <ul className="sol-services-list">
                            {p.services.map(s => (
                              <li key={s}>
                                <span className="sol-service-link">
                                  {s} <span className="sol-dot"></span>
                                </span>
                              </li>
                            ))}
                          </ul>
                          <span className="sol-pillar-cta">
                            Explore the pillar
                            <svg className="sol-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                              <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="sol-dropdown-foot">
                      <div className="sol-foot-text">Not sure where to start? <strong>Take the diagnostic</strong> — three questions, the right pillar.</div>
                      <Link to="/solutions" className="sol-foot-cta" onClick={() => setServicesDropdownOpen(false)}>
                        Run diagnostic
                        <svg className="sol-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="nav-item-dropdown sol-trigger-wrap" onMouseEnter={handleCompanyMouseEnter} onMouseLeave={handleCompanyMouseLeave}>
                <button className="nav-item" data-testid="nav-company" onClick={() => navigate("/company")} aria-expanded={companyDropdownOpen} aria-haspopup="true">
                  Company <ChevronDown size={16} className="chevron" />
                </button>
                {companyDropdownOpen && (
                  <div className="sol-mega-dropdown" role="menu">
                    <div className="sol-pillars" data-active={activeCompanyPillar !== null ? activeCompanyPillar : undefined}>
                      {COMPANY_PILLARS.map((p, i) => (
                        <Link
                          key={p.num}
                          to={p.link}
                          className={`sol-pillar sol-pillar-${p.color} ${activeCompanyPillar === i ? 'is-active' : ''}`}
                          onMouseEnter={() => setActiveCompanyPillar(i)}
                          onMouseLeave={() => setActiveCompanyPillar(null)}
                          onClick={() => { setCompanyDropdownOpen(false); setActiveCompanyPillar(null); }}
                        >
                          <div className="sol-pillar-num">{p.num}</div>
                          <div className="sol-pillar-name">{p.nameLine1}<br />{p.nameLine2}</div>
                          <div className="sol-pillar-tag">{p.tag}</div>
                          <ul className="sol-services-list">
                            {p.services.map(s => (
                              <li key={s}>
                                <span className="sol-service-link">
                                  {s} <span className="sol-dot"></span>
                                </span>
                              </li>
                            ))}
                          </ul>
                          <span className="sol-pillar-cta">
                            Explore the pillar
                            <svg className="sol-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                              <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="sol-dropdown-foot">
                      <div className="sol-foot-text">Want the full picture? <strong>Browse the company</strong> — approach, careers, and insights in one place.</div>
                      <Link to="/company" className="sol-foot-cta" onClick={() => setCompanyDropdownOpen(false)}>
                        About STARTON
                        <svg className="sol-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/careers" className="nav-item" data-testid="nav-careers">Careers</Link>
            </nav>

            <Button className="btn-header-cta" onClick={handleStartProject} data-testid="header-start-project-btn">
              Start a Project
            </Button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid=".premium-header .mobile-menu-toggle-toggle"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-content">
          <Link to="/work" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Work</Link>
          <Link to="/solutions" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
          <Link to="/company" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Company</Link>
          <Link to="/careers" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
          <Link to="/insights" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
          <Button onClick={handleStartProject} className="btn-primary btn-mobile-cta">Start a Project</Button>
          <div className="mobile-menu-footer">
            <p>&copy; STARTON</p>
            <p className="mobile-tagline">Strategy That Builds Momentum.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
