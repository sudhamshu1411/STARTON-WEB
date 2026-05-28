import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { articles } from '../data/articles';

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <PageLayout>
        <SEO title="Article Not Found" description="This article could not be found." path={`/insights/${slug}`} />
        <section className="page-hero">
          <div className="container">
            <div className="page-hero-content animate-on-scroll">
              <h1 className="page-hero-title">Article Not Found</h1>
              <p className="page-hero-subtitle">The article you're looking for doesn't exist.</p>
              <Link to="/insights" className="detail-back-link"><ArrowLeft size={18} /> Back to Insights</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const currentIndex = articles.findIndex(a => a.slug === slug);
  const nextArticle = articles[(currentIndex + 1) % articles.length];
  const prevArticle = articles[(currentIndex - 1 + articles.length) % articles.length];

  const renderContent = (block, i) => {
    switch (block.type) {
      case 'heading':
        return <h2 key={i} className="article-content-heading">{block.text}</h2>;
      case 'subheading':
        return <h3 key={i} className="article-content-subheading">{block.text}</h3>;
      case 'paragraph':
        return <p key={i} className="article-content-paragraph">{block.text}</p>;
      case 'list':
        return (
          <ul key={i} className="article-content-list">
            {block.items.map((item, j) => <li key={j}>{item}</li>)}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        type="article"
      />

      {/* Back Link */}
      <section className="detail-back-section">
        <div className="container">
          <Link to="/insights" className="detail-back-link" data-testid="back-to-insights">
            <ArrowLeft size={18} /> Back to Insights
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="article-header">
        <div className="container">
          <div className="article-header-content animate-on-scroll">
            <span className="article-header-badge" data-testid="article-category">{article.category}</span>
            <h1 className="article-header-title" data-testid="article-title">{article.title}</h1>
            <p className="article-header-excerpt">{article.excerpt}</p>
            <div className="article-header-meta" data-testid="article-meta">
              <span className="article-header-meta-item"><Calendar size={15} /> {article.date}</span>
              <span className="article-header-meta-item"><Clock size={15} /> {article.readTime}</span>
              {article.author && (
                <span className="article-header-meta-item article-header-author">
                  By {article.author.name}, {article.author.role}
                </span>
              )}
            </div>
          </div>
          <div className="article-header-visual animate-on-scroll" style={{ background: article.gradient }} data-testid="article-visual" />
        </div>
      </section>

      {/* Article Body */}
      <section className="article-body-section">
        <div className="container">
          <div className="article-body" data-testid="article-body">
            {article.content.map(renderContent)}
          </div>
        </div>
      </section>

      {/* Author */}
      {article.author && (
        <section className="article-author-section">
          <div className="container">
            <div className="article-author-card animate-on-scroll" data-testid="article-author">
              <div className="article-author-avatar" style={{ background: article.gradient }}>
                {article.author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="article-author-name">Written by {article.author.name}</p>
                <p className="article-author-role">{article.author.role} at STARTON</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="detail-nav-section">
        <div className="container">
          <div className="detail-nav" data-testid="article-nav">
            <Link to={`/insights/${prevArticle.slug}`} className="detail-nav-link detail-nav-prev" data-testid="prev-article">
              <span className="detail-nav-dir"><ArrowLeft size={16} /> Previous</span>
              <span className="detail-nav-title">{prevArticle.title}</span>
            </Link>
            <Link to={`/insights/${nextArticle.slug}`} className="detail-nav-link detail-nav-next" data-testid="next-article">
              <span className="detail-nav-dir">Next <ArrowRight size={16} /></span>
              <span className="detail-nav-title">{nextArticle.title}</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ArticleDetail;
