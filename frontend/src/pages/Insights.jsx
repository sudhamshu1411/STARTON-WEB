import React, { useState } from 'react';
import { ArrowRight, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { articles, articleCategories } from '../data/articles';

const Insights = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const featured = articles.find(a => a.featured);
  const filtered = activeFilter === 'All'
    ? articles.filter(a => !a.featured)
    : articles.filter(a => a.category === activeFilter && !a.featured);

  return (
    <PageLayout>
      <SEO
        title="Insights"
        description="Strategic thinking, tactical playbooks, and hard-won lessons from building brands and growing businesses. The STARTON blog."
        path="/insights"
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="page-hero-label" data-testid="insights-hero-label">Insights</span>
            <h1 className="page-hero-title" data-testid="insights-hero-title">Ideas That Build Momentum</h1>
            <p className="page-hero-subtitle">Strategic thinking, tactical playbooks, and hard-won lessons from building brands and growing businesses.</p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && activeFilter === 'All' && (
        <section className="insights-featured-section">
          <div className="container">
            <Link to={`/insights/${featured.slug}`} className="insights-featured-card animate-on-scroll" data-testid="featured-article">
              <div className="insights-featured-visual" style={{ background: featured.gradient }}>
                <div className="insights-featured-visual-inner">
                  <span className="insights-featured-badge">{featured.category}</span>
                </div>
              </div>
              <div className="insights-featured-info">
                <div className="insights-featured-meta">
                  <span className="insights-meta-item"><Calendar size={14} /> {featured.date}</span>
                  <span className="insights-meta-item"><Clock size={14} /> {featured.readTime}</span>
                </div>
                <h2 className="insights-featured-title">{featured.title}</h2>
                <p className="insights-featured-excerpt">{featured.excerpt}</p>
                <span className="insights-read-btn" data-testid="featured-read-btn">
                  Read Article <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section className="insights-grid-section">
        <div className="container">
          <div className="insights-filter-bar" data-testid="insights-filter-bar">
            {articleCategories.map(cat => (
              <button
                key={cat}
                className={`work-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                data-testid={`insights-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="insights-grid" data-testid="insights-grid">
            {filtered.map((article, index) => (
              <Link
                to={`/insights/${article.slug}`}
                key={article.id}
                className="insights-card animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`article-card-${article.id}`}
              >
                <div className="insights-card-visual" style={{ background: article.gradient }}>
                  <div className="insights-card-visual-inner">
                    <span className="insights-card-badge">{article.category}</span>
                    <div className="insights-card-arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
                <div className="insights-card-body">
                  <div className="insights-card-meta">
                    <span><Calendar size={13} /> {article.date}</span>
                    <span><Clock size={13} /> {article.readTime}</span>
                  </div>
                  <h3 className="insights-card-title">{article.title}</h3>
                  <p className="insights-card-excerpt">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="insights-empty" data-testid="insights-empty">
              <p>No articles in this category yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Insights;
