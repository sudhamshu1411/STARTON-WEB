# STARTON Agency Website - PRD

## Original Problem Statement
Build a highly-polished, animated multi-page website for "STARTON" — a strategic creative agency with "new age glassmorphism" design, purple/blue palette, light/dark themes.

## Architecture
```
/app
├── backend/ (FastAPI + MongoDB)
│   ├── models/consultation.py
│   ├── routes/consultations.py
│   └── server.py
└── frontend/ (React + React Router)
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx, Footer.jsx, PageLayout.jsx, SEO.jsx
    │   ├── context/ThemeContext.jsx
    │   ├── data/
    │   │   ├── projects.js    # 8 case studies with full detail content
    │   │   └── articles.js    # 8 articles with full body content
    │   ├── pages/
    │   │   ├── Home.jsx, Work.jsx, CaseStudy.jsx
    │   │   ├── Services.jsx, Company.jsx, Careers.jsx
    │   │   └── Insights.jsx, ArticleDetail.jsx
    │   ├── App.css, App.js
    └── package.json
```

## What's Been Implemented

### Phase 1-2: Landing Page + Multi-Page Scaffolding
- Glassmorphism landing page, header/footer, theme toggle, routing, contact form

### Phase 3: Content Enhancement
- Enhanced Work (8 case studies, featured, testimonials), Services (6 cards, 5-step process, engagement models), Company (mission, stats, values, team, timeline), Careers (culture, perks, 4 roles)

### Phase 4: Blog & SEO
- Insights page (featured article, 8 articles, category filters)
- SEO: react-helmet-async on all pages, JSON-LD on homepage

### Phase 5: Detail Pages (Current Session)
- **Case Study pages** (`/work/:slug`): Hero, meta bar (client/industry/timeline/team), challenge, approach steps, results grid (4 metrics), deliverables checklist, client testimonial, prev/next navigation, CTA
- **Article pages** (`/insights/:slug`): Header with author/date/readtime, gradient visual, full body content (headings/subheadings/paragraphs/lists), author card, prev/next navigation
- **Shared data**: Extracted to `/data/projects.js` (8 projects) and `/data/articles.js` (8 articles)
- **Clickable cards**: Work and Insights list pages link to detail pages
- **Not Found handling**: Invalid slugs show proper 404 message
- 18/18 tests passed (100%)

## Routes
- `/` — Home (landing + contact form)
- `/work` — Case studies grid
- `/work/:slug` — Case study detail
- `/services` — Service offerings
- `/company` — Mission, values, team, timeline
- `/careers` — Culture, perks, open roles
- `/insights` — Blog/articles grid
- `/insights/:slug` — Article detail

## Key API: `POST /api/consultations`

## Prioritized Backlog

### P1
- "Start a Project" multi-step form/modal

### P2
- Animated page transitions
- Analytics integration
- Testimonials/social proof on homepage

### P3
- Refactor Home.jsx / App.css into smaller modules
- CMS integration
- Memoize particles in PageLayout
