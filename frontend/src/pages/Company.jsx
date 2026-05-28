import React from 'react';
import { Lightbulb, TrendingUp, Heart, ArrowRight, Star, Globe, Handshake } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

const values = [
  {
    icon: <Lightbulb size={32} />,
    title: "Clarity Over Complexity",
    desc: "We distill complex problems into clear, actionable strategies. The world doesn't need more noise — it needs sharper thinking. Simplicity is a form of sophistication."
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Growth Is a System",
    desc: "Sustainable growth isn't luck. It's built through deliberate systems, tested processes, and compounding actions. We engineer momentum, not one-off wins."
  },
  {
    icon: <Handshake size={32} />,
    title: "Partnership Over Transactions",
    desc: "We invest in your success like it's our own. We don't do one-and-done projects — we build long-term relationships that create long-term results."
  },
  {
    icon: <Heart size={32} />,
    title: "Craft With Intention",
    desc: "Every deliverable is made with care. Every pixel is purposeful. Every word is deliberate. The quality of your brand reflects the quality of your business."
  },
  {
    icon: <Star size={32} />,
    title: "Radical Honesty",
    desc: "We'll tell you what you need to hear, not what you want to hear. That's how real progress happens. Our candor is a feature, not a bug."
  },
  {
    icon: <Globe size={32} />,
    title: "Think Global, Act Precise",
    desc: "The best ideas transcend borders. We bring global thinking to every challenge — then execute with the precision and specificity that your unique market demands."
  }
];

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & Strategy Lead",
    bio: "10+ years building brands that dominate markets. Former strategy director at two top-tier consultancies. Alex has led positioning for 30+ companies from Series A to IPO — and has a borderline unhealthy obsession with go-to-market strategy.",
    initials: "AR",
    gradient: "linear-gradient(135deg, #5b5eea 0%, #7c3aed 100%)"
  },
  {
    name: "Mia Chen",
    role: "Creative Director",
    bio: "Award-winning designer who has shaped visual identities for 50+ global brands across tech, finance, and lifestyle. Mia believes design isn't decoration — it's strategy made visible. Every system she builds tells a story.",
    initials: "MC",
    gradient: "linear-gradient(135deg, #e78fb3 0%, #f56b8a 100%)"
  },
  {
    name: "Jordan Lee",
    role: "Head of Growth",
    bio: "Growth strategist with a track record of 3x-10x revenue growth for B2B companies. Jordan ran growth at two YC-backed startups before joining STARTON. His unfair advantage? He thinks in systems, not tactics.",
    initials: "JL",
    gradient: "linear-gradient(135deg, #0891e9 0%, #06b6d4 100%)"
  },
  {
    name: "Priya Nair",
    role: "Head of Engineering",
    bio: "Full-stack architect with 8 years building performant web platforms. Priya has led engineering at scale — from microsecond-optimized landing pages to complex SaaS dashboards. She builds things that don't break.",
    initials: "PN",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
  }
];

const approach = [
  { num: "01", title: "Discovery & Audit", desc: "We start by understanding your business, market, competitors, and goals deeply. No surface-level briefs. We go into your world before we ask you to invest in ours." },
  { num: "02", title: "Strategy & Roadmap", desc: "We craft a clear, customized growth roadmap with milestones, KPIs, and a prioritized action plan. No ambiguity. No guesswork. You know exactly where we're headed." },
  { num: "03", title: "Execution & Iteration", desc: "We move fast, test often, and iterate based on real data. Every sprint is a feedback loop. We don't fall in love with our ideas — we fall in love with what works." },
  { num: "04", title: "Scale & Optimize", desc: "Once we find what works, we systematize, scale, and continuously optimize for compounding returns. Growth doesn't plateau when you build the right systems." }
];

const companyStats = [
  { num: "2019", label: "Founded" },
  { num: "42+", label: "Projects Shipped" },
  { num: "3", label: "Continents Served" },
  { num: "96%", label: "Client Retention" },
];

const milestones = [
  { year: "2019", title: "Founded", desc: "STARTON was founded with a single belief: strategy and creativity together can build unstoppable momentum for businesses willing to think bigger." },
  { year: "2020", title: "First Major Win", desc: "Helped our first Series B startup grow from $2M to $18M ARR through brand repositioning, digital strategy, and a complete go-to-market overhaul." },
  { year: "2021", title: "Team Expansion", desc: "Grew to a team of specialists across brand, web, strategy, and growth marketing. Added engineering capabilities for end-to-end execution." },
  { year: "2022", title: "Global Reach", desc: "Began serving clients across 3 continents — spanning tech, finance, health, and consumer brands. Opened remote hubs in London and Singapore." },
  { year: "2023", title: "Industry Recognition", desc: "Named among the top boutique growth agencies by two industry publications. Crossed $50M in revenue generated for clients." },
  { year: "2024", title: "Scaling Impact", desc: "42+ projects delivered. 96% client retention. Launched our intensive Sprint engagement model. Expanded into enterprise consulting." }
];

const Company = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <SEO
        title="Company"
        description="STARTON is a growth partner, not just an agency. Learn about our mission, approach, values, and the team behind 42+ successful projects."
        path="/company"
      />
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="page-hero-label" data-testid="company-hero-label">The Company</span>
            <h1 className="page-hero-title" data-testid="company-hero-title">A Growth Partner, Not Just an Agency</h1>
            <p className="page-hero-subtitle">We work alongside you — as invested in your success as you are. Your growth is our reputation.</p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content animate-on-scroll" data-testid="company-mission">
            <p className="mission-eyebrow">Our Mission</p>
            <h2 className="mission-statement">
              To turn ambitious visions into market-defining realities through the power of strategy, creativity, and relentless execution.
            </h2>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="work-stats-section">
        <div className="container">
          <div className="work-stats-bar" data-testid="company-stats-bar">
            {companyStats.map((stat) => (
              <div key={stat.label} className="work-stat animate-on-scroll">
                <div className="work-stat-number">{stat.num}</div>
                <div className="work-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="process-section" style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Our Approach</h2>
            <p className="section-subtitle">How we deliver consistent, transformative results — every single time</p>
          </div>
          <div className="process-grid" data-testid="company-approach-grid">
            {approach.map((step, index) => (
              <div key={step.num} className="process-card animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }} data-testid={`approach-step-${step.num}`}>
                <div className="process-number">{step.num}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">What We Believe</h2>
            <p className="section-subtitle">The principles that guide every project, decision, and relationship</p>
          </div>
          <div className="values-grid" data-testid="company-values-grid">
            {values.map((value, index) => (
              <div key={value.title} className="value-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }} data-testid={`value-card-${index}`}>
                <div className="value-card-icon">{value.icon}</div>
                <div>
                  <h3 className="value-card-title">{value.title}</h3>
                  <p className="value-card-desc">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">The Team</h2>
            <p className="section-subtitle">Experts who've seen what works — and what doesn't. Every one of us has been in the trenches.</p>
          </div>
          <div className="team-grid" data-testid="company-team-grid">
            {team.map((member, index) => (
              <div key={member.name} className="team-card animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }} data-testid={`team-card-${index}`}>
                <div className="team-card-avatar" style={{ background: member.gradient }}>
                  <span className="team-card-initials">{member.initials}</span>
                </div>
                <div className="team-card-info">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-role">{member.role}</p>
                  <p className="team-card-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">From a small team with big ideas to a trusted growth partner</p>
          </div>
          <div className="timeline" data-testid="company-timeline">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} animate-on-scroll`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`timeline-item-${index}`}
              >
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-desc">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-content animate-on-scroll">
            <h2 className="about-cta-title">Ready to Work Together?</h2>
            <p className="about-cta-desc">Let's build something remarkable. Your vision, our execution, real results.</p>
            <Button
              className="btn-primary"
              onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
              data-testid="company-cta-btn"
            >
              Start a Project <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Company;
