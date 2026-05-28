import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { projects } from '../data/projects';

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <PageLayout>
        <SEO title="Case Study Not Found" description="This case study could not be found." path={`/work/${slug}`} />
        <section className="page-hero">
          <div className="container">
            <div className="page-hero-content animate-on-scroll">
              <h1 className="page-hero-title">Case Study Not Found</h1>
              <p className="page-hero-subtitle">The project you're looking for doesn't exist.</p>
              <Link to="/work" className="detail-back-link"><ArrowLeft size={18} /> Back to Work</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <PageLayout>
      <SEO
        title={`${project.title} — Case Study`}
        description={project.desc}
        path={`/work/${project.slug}`}
      />

      {/* Back Link */}
      <section className="detail-back-section">
        <div className="container">
          <Link to="/work" className="detail-back-link" data-testid="back-to-work">
            <ArrowLeft size={18} /> Back to Work
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="detail-hero">
        <div className="container">
          <div className="detail-hero-content animate-on-scroll">
            <span className="detail-hero-category" data-testid="case-study-category">{project.category}</span>
            <h1 className="detail-hero-title" data-testid="case-study-title">{project.title}</h1>
            <p className="detail-hero-desc">{project.desc}</p>
          </div>
          <div className="detail-hero-visual animate-on-scroll" style={{ background: project.gradient }} data-testid="case-study-visual">
            <div className="detail-hero-visual-inner">
              <span className="detail-hero-year">{project.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Bar */}
      <section className="detail-meta-section">
        <div className="container">
          <div className="detail-meta-bar" data-testid="case-study-meta">
            <div className="detail-meta-item">
              <span className="detail-meta-label">Client</span>
              <span className="detail-meta-value">{project.client}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Industry</span>
              <span className="detail-meta-value">{project.industry}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Timeline</span>
              <span className="detail-meta-value">{project.timeline}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Team</span>
              <span className="detail-meta-value">{project.team}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="detail-section">
        <div className="container">
          <div className="detail-content-block animate-on-scroll">
            <h2 className="detail-section-title" data-testid="case-study-challenge-title">The Challenge</h2>
            <p className="detail-section-text">{project.detail.challenge}</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="detail-section detail-section-alt">
        <div className="container">
          <div className="detail-content-block animate-on-scroll">
            <h2 className="detail-section-title" data-testid="case-study-approach-title">Our Approach</h2>
            <div className="detail-approach-list" data-testid="case-study-approach">
              {project.detail.approach.map((step, i) => (
                <div key={i} className="detail-approach-item">
                  <div className="detail-approach-num">{String(i + 1).padStart(2, '0')}</div>
                  <p className="detail-approach-text">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="detail-section">
        <div className="container">
          <div className="detail-content-block animate-on-scroll">
            <h2 className="detail-section-title" data-testid="case-study-results-title">The Results</h2>
            <div className="detail-results-grid" data-testid="case-study-results">
              {project.detail.results.map((r, i) => (
                <div key={i} className="detail-result-card">
                  <div className="detail-result-metric">{r.metric}</div>
                  <div className="detail-result-label">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="detail-section detail-section-alt">
        <div className="container">
          <div className="detail-content-block animate-on-scroll">
            <h2 className="detail-section-title" data-testid="case-study-deliverables-title">Deliverables</h2>
            <div className="detail-deliverables-grid" data-testid="case-study-deliverables">
              {project.detail.deliverables.map((d, i) => (
                <div key={i} className="detail-deliverable-item">
                  <CheckCircle2 size={18} className="detail-deliverable-icon" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="detail-testimonial-section">
          <div className="container">
            <div className="detail-testimonial animate-on-scroll" data-testid="case-study-testimonial">
              <Quote size={40} className="detail-testimonial-icon" />
              <blockquote className="detail-testimonial-quote">{project.testimonial.quote}</blockquote>
              <div className="detail-testimonial-author">
                <p className="detail-testimonial-name">{project.testimonial.name}</p>
                <p className="detail-testimonial-role">{project.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="detail-nav-section">
        <div className="container">
          <div className="detail-nav" data-testid="case-study-nav">
            <Link to={`/work/${prevProject.slug}`} className="detail-nav-link detail-nav-prev" data-testid="prev-case-study">
              <span className="detail-nav-dir"><ArrowLeft size={16} /> Previous</span>
              <span className="detail-nav-title">{prevProject.title}</span>
            </Link>
            <Link to={`/work/${nextProject.slug}`} className="detail-nav-link detail-nav-next" data-testid="next-case-study">
              <span className="detail-nav-dir">Next <ArrowRight size={16} /></span>
              <span className="detail-nav-title">{nextProject.title}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-content animate-on-scroll">
            <h2 className="about-cta-title">Want Results Like These?</h2>
            <p className="about-cta-desc">Let's talk about what STARTON can build for your business.</p>
            <Button className="btn-primary" onClick={() => navigate('/', { state: { scrollTo: 'contact' } })} data-testid="case-study-cta-btn">
              Start a Project <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudy;
