import React, { useState } from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { projects, stats, projectCategories, testimonials } from '../data/projects';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const featured = projects.find(p => p.featured);
  const grid = filtered.filter(p => !p.featured || activeFilter !== 'All');

  return (
    <PageLayout>
      <SEO
        title="Our Work"
        description="42+ projects delivered. 96% client retention. See the case studies and results behind STARTON's brand, web, strategy, and marketing work."
        path="/work"
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="page-hero-label" data-testid="work-hero-label">Our Work</span>
            <h1 className="page-hero-title" data-testid="work-hero-title">Results That Speak for Themselves</h1>
            <p className="page-hero-subtitle">We don't show off deliverables. We show outcomes. Every project here moved a real business metric — revenue, retention, reach, or all three.</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="work-stats-section">
        <div className="container">
          <div className="work-stats-bar" data-testid="work-stats-bar">
            {stats.map((stat) => (
              <div key={stat.label} className="work-stat animate-on-scroll">
                <div className="work-stat-number">{stat.num}</div>
                <div className="work-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      {activeFilter === 'All' && featured && (
        <section className="work-featured-section">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">Featured Case Study</h2>
              <p className="section-subtitle">A deep dive into one of our most impactful engagements</p>
            </div>
            <Link to={`/work/${featured.slug}`} className="work-featured-card animate-on-scroll" data-testid="featured-case-study">
              <div className="work-featured-visual" style={{ background: featured.gradient }}>
                <div className="work-featured-visual-inner">
                  <span className="work-card-year">{featured.year}</span>
                  <span className="work-featured-badge">Featured</span>
                </div>
              </div>
              <div className="work-featured-info">
                <span className="work-card-category">{featured.category}</span>
                <h3 className="work-featured-title">{featured.title}</h3>
                <p className="work-featured-desc">{featured.desc}</p>
                <div className="work-featured-result">
                  <span className="work-featured-result-label">The Result</span>
                  <p className="work-featured-result-text">{featured.result}</p>
                </div>
                <div className="work-card-tags">
                  {featured.tags.map(tag => (
                    <span key={tag} className="work-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section className="work-grid-section">
        <div className="container">
          <div className="work-filter-bar" data-testid="work-filter-bar">
            {projectCategories.map(cat => (
              <button
                key={cat}
                className={`work-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                data-testid={`filter-btn-${cat.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="work-grid" data-testid="work-projects-grid">
            {grid.map((project, index) => (
              <Link
                to={`/work/${project.slug}`}
                key={project.id}
                className="work-card animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`project-card-${project.id}`}
              >
                <div className="work-card-visual" style={{ background: project.gradient }}>
                  <div className="work-card-visual-inner">
                    <span className="work-card-year">{project.year}</span>
                    <div className="work-card-arrow">
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </div>
                <div className="work-card-info">
                  <span className="work-card-category">{project.category}</span>
                  <h3 className="work-card-title">{project.title}</h3>
                  <p className="work-card-desc">{project.desc}</p>
                  <div className="work-card-result">
                    <p className="work-card-result-text">{project.result}</p>
                  </div>
                  <div className="work-card-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="work-card-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">What Clients Say</h2>
            <p className="section-subtitle">Direct words from the people we've partnered with</p>
          </div>
          <div className="testimonials-grid" data-testid="testimonials-grid">
            {testimonials.map((t, index) => (
              <div key={t.name} className="testimonial-card animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }} data-testid={`testimonial-card-${index}`}>
                <div className="testimonial-quote-icon">
                  <Quote size={28} />
                </div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.gradient }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Work;
