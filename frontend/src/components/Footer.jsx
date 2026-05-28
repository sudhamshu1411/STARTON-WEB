import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartProject = () => {
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  const columns = [
    {
      title: 'Work',
      links: [
        { label: 'Our Projects', to: '/work' },
        { label: 'Start a Project', onClick: handleStartProject },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Brand Identity', to: '/solutions' },
        { label: 'Web & UX', to: '/solutions' },
        { label: 'Business Strategy', to: '/solutions' },
        { label: 'Marketing Systems', to: '/solutions' },
        { label: 'Sales Enablement', to: '/solutions' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/company' },
        { label: 'Approach', to: '/company' },
        { label: 'Insights', to: '/insights' },
        { label: 'Careers', to: '/careers' },
      ],
    },
  ];

  const socials = [
    { Icon: Mail, href: 'mailto:hello@starton.agency', label: 'Email' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <>
      <section className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <h2 className="footer-cta-heading">Have a serious project in mind? Let's talk</h2>
            <Button
              onClick={handleStartProject}
              className="btn-primary footer-cta-btn"
              data-testid="footer-start-project-btn"
            >
              Start a Project <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-panel">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-wordmark">
                  STARTON<span className="footer-accent">.</span>
                </div>
                <p className="footer-tagline">Strategy that builds momentum</p>
              </div>

              <div className="footer-socials">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className="footer-social"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-nav">
              {columns.map((col) => (
                <div key={col.title} className="footer-col">
                  <div className="footer-col-title">{col.title}</div>
                  <ul className="footer-col-list">
                    {col.links.map((link, i) => (
                      <li key={i}>
                        {link.to ? (
                          <Link to={link.to} className="footer-link">{link.label}</Link>
                        ) : (
                          <button onClick={link.onClick} className="footer-link">{link.label}</button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="footer-col">
                <div className="footer-col-title">Get in touch</div>
                <a href="mailto:hello@starton.agency" className="footer-email">
                  <Mail size={14} /> hello@starton.agency
                </a>
                <p className="footer-note">Working with clients across 3 continents, remotely.</p>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-copy">© 2026 STARTON</p>
              <p className="footer-statement">
                Not just an agency. <span className="footer-accent">A growth partner.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
