import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Target, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { mockServices, mockWorkProcess, mockClients } from '../mock';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parallaxRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === 'contact') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location.state]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (parallaxRef.current) {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        parallaxRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/consultations`, formData);
      if (response.data.success) {
        toast({ title: "Success!", description: response.data.message });
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error.response?.data?.detail) {
        errorMessage = typeof error.response.data.detail === 'string'
          ? error.response.data.detail
          : error.response.data.detail.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SEO
        title="STARTON"
        description="STARTON is a strategic creative agency that builds brands, websites, and growth systems for ambitious businesses. Strategy that builds momentum."
        path="/"
      />

      {/* Organization JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "STARTON",
        "description": "Strategic creative agency that builds brands, websites, and growth systems for ambitious businesses.",
        "url": "https://starton.agency",
        "foundingDate": "2019",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 50 },
        "knowsAbout": ["Brand Strategy", "Web Development", "Digital Marketing", "UX Design", "Growth Strategy"],
        "areaServed": "Worldwide"
      })}} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src="/images/hero-bg-1600.webp"
            srcSet="/images/hero-bg-800.webp 800w, /images/hero-bg-1600.webp 1600w"
            sizes="(max-width: 768px) 100vw, 100vw"
            alt=""
            aria-hidden="true"
            className="hero-image"
            width="1600"
            height="1067"
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content" ref={parallaxRef}>
            <h1 className="hero-title floating">Strategy That Builds Momentum.</h1>
            <p className="hero-subtitle">We don't just launch brands. We launch winners. Transform your vision into market-dominating reality with data-driven strategy and creative excellence.</p>
            <Button className="btn-primary btn-hero" onClick={scrollToContact} data-testid="hero-cta-btn">
              Start Your Journey <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">Full-spectrum solutions that drive exponential growth</p>
          </div>
          <div className="services-grid">
            {mockServices.map((service, index) => (
              <Card key={service.id} className="service-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="service-card-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="service-feature">
                        <CheckCircle2 size={18} className="feature-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="process" className="process-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">Our proven approach to transformative success</p>
          </div>
          <div className="process-grid">
            {mockWorkProcess.map((step, index) => (
              <div key={step.id} className="process-card animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="process-number">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="clients-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Who We Work With</h2>
            <p className="section-subtitle">Partnering with ambitious businesses across industries</p>
          </div>
          <div className="clients-grid">
            {mockClients.map((client, idx) => (
              <div key={idx} className="client-card animate-on-scroll" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Target className="client-icon" size={36} />
                <h3 className="client-name">{client}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info animate-on-scroll">
              <h2 className="contact-title">Ready to Start?</h2>
              <p className="contact-subtitle">
                Let's discuss how we can help you build unstoppable momentum and achieve breakthrough results.
              </p>
              <div className="contact-features">
                <div className="contact-feature">
                  <Sparkles className="contact-feature-icon" size={28} />
                  <div>
                    <h3>Strategic Approach</h3>
                    <p>Data-driven decisions that deliver measurable results</p>
                  </div>
                </div>
                <div className="contact-feature">
                  <TrendingUp className="contact-feature-icon" size={28} />
                  <div>
                    <h3>Scalable Growth</h3>
                    <p>Systems that evolve with your success and scale</p>
                  </div>
                </div>
                <div className="contact-feature">
                  <Users className="contact-feature-icon" size={28} />
                  <div>
                    <h3>Expert Team</h3>
                    <p>End-to-end execution excellence from start to finish</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper animate-on-scroll">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="form-input" placeholder="Your name" data-testid="contact-name-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder="your@email.com" data-testid="contact-email-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Company</label>
                  <Input id="company" name="company" value={formData.company} onChange={handleInputChange} className="form-input" placeholder="Your company" data-testid="contact-company-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="form-input" placeholder="Tell us about your project..." data-testid="contact-message-input" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="btn-primary btn-submit" data-testid="contact-submit-btn">
                  {isSubmitting ? 'Sending...' : 'Book Consultation'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
