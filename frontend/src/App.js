import React, { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Services = lazy(() => import('./pages/Services'));
const Company = lazy(() => import('./pages/Company'));
const Careers = lazy(() => import('./pages/Careers'));
const Insights = lazy(() => import('./pages/Insights'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));

const Toaster = lazy(() => import('./components/ui/sonner').then(m => ({ default: m.Toaster })));
const Analytics = lazy(() => import('@vercel/analytics/react').then(m => ({ default: m.Analytics })));
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));

function App() {
  const [deferred, setDeferred] = useState(false);

  useEffect(() => {
    const fire = () => setDeferred(true);
    if (typeof window === 'undefined') return;
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(fire, { timeout: 2500 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id);
    }
    const t = setTimeout(fire, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="App">
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<CaseStudy />} />
                <Route path="/solutions" element={<Services />} />
                <Route path="/services" element={<Navigate to="/solutions" replace />} />
                <Route path="/company" element={<Company />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<ArticleDetail />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          {deferred && (
            <Suspense fallback={null}>
              <Toaster />
              <Analytics />
              <SpeedInsights />
            </Suspense>
          )}
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
