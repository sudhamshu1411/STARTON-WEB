import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = '/', type = 'website' }) => {
  const siteName = 'STARTON';
  const baseUrl = 'https://starton.agency';
  const fullTitle = path === '/' ? `${siteName} — Strategy That Builds Momentum` : `${title} — ${siteName}`;
  const url = `${baseUrl}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
