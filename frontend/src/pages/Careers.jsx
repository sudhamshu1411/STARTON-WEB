import React from 'react';
import { ArrowRight, Heart, Globe, Coffee, BookOpen, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

const perks = [
  { icon: <Globe size={28} />, title: "Remote-First", desc: "Work from anywhere. We hire talent, not time zones. Async-first culture with deep work blocks built in." },
  { icon: <TrendingUp size={28} />, title: "Growth Budget", desc: "$2,000/year for courses, conferences, books, or tools. Your growth is our growth. No approvals needed." },
  { icon: <Coffee size={28} />, title: "Flexible Hours", desc: "We care about output, not hours logged. Structure your day around your life, not the other way around." },
  { icon: <Heart size={28} />, title: "Health & Wellness", desc: "Comprehensive health coverage, mental health support, and a culture that actually respects boundaries." },
  { icon: <Users size={28} />, title: "Small Team, Big Impact", desc: "No bureaucracy. No layers. You'll work directly with founders and senior leadership on every project." },
  { icon: <BookOpen size={28} />, title: "Learning Culture", desc: "Weekly knowledge shares, quarterly retrospectives, and a team that genuinely wants to get better every day." }
];

const culturePoints = [
  {
    title: "We hire missionaries, not mercenaries.",
    desc: "Everyone here cares deeply about the craft and the outcome. We're selective about who joins — because culture compounds too."
  },
  {
    title: "Ownership is the default.",
    desc: "You won't be micromanaged. You'll be trusted with real responsibility from day one. We hire adults and treat them like adults."
  },
  {
    title: "Feedback is fuel.",
    desc: "We give direct, honest, and caring feedback — constantly. It's how we stay sharp. If that excites you, you'll love it here."
  }
];

const openRoles = [
  {
    title: "Senior Brand Strategist",
    type: "Full-time",
    location: "Remote",
    desc: "Lead brand strategy engagements from discovery through delivery. You'll work directly with founders and C-suite executives to shape how companies show up in the world.",
    tags: ["Strategy", "Branding", "Client-Facing"]
  },
  {
    title: "Senior Frontend Engineer",
    type: "Full-time",
    location: "Remote",
    desc: "Build high-performance, beautifully-crafted web experiences for our clients. You care about load times, accessibility, and writing code that doesn't need comments.",
    tags: ["React", "TypeScript", "Performance"]
  },
  {
    title: "Growth Marketing Manager",
    type: "Full-time",
    location: "Remote",
    desc: "Own the marketing strategy and execution for multiple client accounts. You think in systems, you live in data, and you ship campaigns that move revenue needles.",
    tags: ["Marketing", "Analytics", "Funnels"]
  },
  {
    title: "Product Designer",
    type: "Full-time",
    location: "Remote",
    desc: "Design digital experiences that are beautiful, usable, and conversion-optimized. You'll own the full design process from research and wireframing to final handoff.",
    tags: ["UI/UX", "Figma", "Design Systems"]
  }
];

const Careers = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <SEO
        title="Careers"
        description="Do the best work of your career at STARTON. Remote-first, ownership culture, and meaningful projects. See open roles in strategy, design, engineering, and marketing."
        path="/careers"
      />
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="page-hero-label" data-testid="careers-hero-label">Careers</span>
            <h1 className="page-hero-title" data-testid="careers-hero-title">Do the Best Work of Your Career</h1>
            <p className="page-hero-subtitle">We're building something special at STARTON. If you're driven, curious, and want to work on projects that actually matter — keep reading.</p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="careers-culture-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">Culture isn't a ping-pong table. It's how we treat each other and the work.</p>
          </div>
          <div className="careers-culture-grid" data-testid="careers-culture-grid">
            {culturePoints.map((point, index) => (
              <div key={point.title} className="careers-culture-card animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }} data-testid={`culture-card-${index}`}>
                <h3 className="careers-culture-card-title">{point.title}</h3>
                <p className="careers-culture-card-desc">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="careers-perks-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Why STARTON</h2>
            <p className="section-subtitle">Beyond the work — what makes this a great place to build your career</p>
          </div>
          <div className="careers-perks-grid" data-testid="careers-perks-grid">
            {perks.map((perk, index) => (
              <div key={perk.title} className="careers-perk-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }} data-testid={`perk-card-${index}`}>
                <div className="careers-perk-icon">{perk.icon}</div>
                <div>
                  <h3 className="careers-perk-title">{perk.title}</h3>
                  <p className="careers-perk-desc">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="careers-roles-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Open Roles</h2>
            <p className="section-subtitle">We're looking for exceptional people to join our team</p>
          </div>
          <div className="careers-roles-list" data-testid="careers-roles-list">
            {openRoles.map((role, index) => (
              <div key={role.title} className="careers-role-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }} data-testid={`role-card-${index}`}>
                <div className="careers-role-header">
                  <div>
                    <h3 className="careers-role-title">{role.title}</h3>
                    <div className="careers-role-meta">
                      <span className="careers-role-type">{role.type}</span>
                      <span className="careers-role-divider">/</span>
                      <span className="careers-role-location">{role.location}</span>
                    </div>
                  </div>
                  <Button
                    className="btn-primary careers-role-apply-btn"
                    onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
                    data-testid={`role-apply-btn-${index}`}
                  >
                    Apply <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
                <p className="careers-role-desc">{role.desc}</p>
                <div className="careers-role-tags">
                  {role.tags.map(tag => (
                    <span key={tag} className="careers-role-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-content animate-on-scroll">
            <h2 className="about-cta-title">Don't See Your Role?</h2>
            <p className="about-cta-desc">We're always interested in exceptional talent. Reach out and tell us what you'd bring to STARTON.</p>
            <Button
              className="btn-primary"
              onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
              data-testid="careers-general-cta-btn"
            >
              Get in Touch <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
