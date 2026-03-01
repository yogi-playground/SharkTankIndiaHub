# 🔧 Technical Highlights — Shark Tank India Hub

> A deep-dive into the engineering decisions, architecture patterns, and optimizations that power Shark Tank India Hub.

---

## 🏗️ Architecture

### 100% Static — No Backend Required

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Markup | HTML5 | Semantic, accessible structure |
| Styling | CSS3 + CSS Variables | Dynamic theming, responsive layout |
| Logic | Vanilla JavaScript (ES6+) | SPA routing, data rendering, filters |
| Data | Static JSON files | Pitch, shark, season, analytics data |
| Hosting | GitHub Pages | Free global CDN with HTTPS |
| CI/CD | GitHub Actions | Auto-deploy on every `git push` |

All data lives in flat JSON files under `data/` — no API calls, no database, no server costs.

---

## ⚡ Performance Engineering

- **Zero Framework Overhead** — No React, Vue, or Angular. Pure Vanilla JS keeps the bundle tiny
- **On-Demand Data Loading** — Each page's JSON is fetched only when the user navigates to it
- **Client-Side Rendering** — Page transitions happen instantly without full reloads
- **`< 2s` First Load** — Achieved through CDN delivery, minimal assets, and lazy loading
- **Relative Asset Paths** — All CSS/JS/image paths are relative, ensuring compatibility in any subdirectory deployment (critical for GitHub Pages)

---

## 🎨 UI/UX Engineering

### CSS Variables Theming System

All colours are declared as CSS custom properties in `css/variables.css`:

```css
/* Dark Mode (default) */
--text: #e8e8f0;
--bg:   #080810;
--card: #0f0f1a;

/* Light Mode */
--text: #1a1a2e;
--bg:   #f0f0f6;
--card: #ffffff;
```

Switching themes requires only toggling the `html.light` class — every component updates instantly with zero JavaScript color logic.

### Theme Persistence
User preference is saved to `localStorage` and applied before first paint to prevent flash of wrong theme.

### Responsive Grid
CSS Grid with `auto-fill` / `minmax()` patterns — layouts adapt from single-column mobile to multi-column desktop with no breakpoint-specific overrides needed.

---

## 📁 File & Module Structure

```
js/
├── core/
│   ├── api.js        — Data fetching with error handling & caching
│   ├── app.js        — SPA router, page lifecycle management
│   └── theme.js      — Light/dark mode toggle & persistence
├── pages/
│   ├── home.js       — Hero, stats, recent deals table
│   ├── seasons.js    — All pitches browser with sort/filter
│   ├── sharks.js     — Shark profiles & portfolio
│   ├── analytics.js  — Charts & comparative analysis
│   ├── learn.js      — Academy modules & progress tracking
│   └── dashboard.js  — Personalised pitch builder
├── components/
│   ├── charts.js     — Chart.js wrappers & config
│   ├── filters.js    — Reusable filter chip components
│   └── forms.js      — Dashboard input handling
└── utils/
    └── helpers.js    — Formatting, currency, shared utilities
```

---

## 📊 Data Layer

### Structured JSON Dataset

```
data/
├── pitches.json    — 702 pitches with full deal details
├── sharks.json     — 15+ shark profiles & investment history
├── seasons.json    — Season metadata & statistics
├── industries.json — Industry categories & counts
└── analytics.json  — Pre-aggregated stats for fast charts
```

- **Cross-referenced** — Pitches link to sharks by ID, seasons link to pitches
- **Pre-aggregated** — Key statistics computed once in `analytics.json`, not recalculated on every render
- **Client-Side Filtering** — All search, sort, and filter operations run in-browser with no latency

---

## 🔍 Search & Filter Engine

Built entirely in client-side JavaScript:
- Full-text search across startup name, industry, city, description, and shark names simultaneously
- Multi-dimensional filter: season × industry × deal status (composable)
- Sort by episode, ask amount, or deal amount (ascending/descending toggle)
- Live result count updates as filters change
- Zero debounce lag — renders synchronously on each keystroke

---

## 🌐 SPA Routing

Hash-based routing (`#home`, `#seasons`, `#sharks`, etc.) with:
- `history.pushState` for clean URL management
- `popstate` listener for browser back/forward support
- Page lifecycle hooks (`init()` per page module)
- Lazy initialisation — each page initialises only once and caches its data

---

## ♿ Accessibility (WCAG 2.1 Level AA)

- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<footer>`, `<section>`)
- Skip-to-content link for keyboard users
- `aria-label` attributes on interactive elements
- Sufficient colour contrast in both light and dark modes
- Focus-visible styles preserved throughout
- `role="contentinfo"` on footer, `role="navigation"` on nav

---

## 🤖 GitHub Copilot — AI-Assisted Development

GitHub Copilot was used throughout the development process:

| Task | Copilot Contribution |
|------|---------------------|
| HTML structure | Generated semantic, accessible markup patterns |
| CSS layouts | Suggested responsive grid and flexbox patterns |
| JS modules | Scaffolded page module structure and data fetch logic |
| Chart config | Generated Chart.js configuration for each visualisation |
| Accessibility | Flagged missing `aria` attributes and suggested fixes |
| Bug fixes | Identified hardcoded colour issues in light/dark mode |
| Documentation | Assisted with README and inline code comments |

**Outcome**: ~40% faster development cycle with consistently high code quality.

---

## 🔒 Security & Compliance

- **No secrets or credentials** in the codebase — fully static, nothing to leak
- **`rel="noopener noreferrer"`** on all external links to prevent tab-napping
- **No user data collected** — only `localStorage` for theme preference
- **MIT Licensed** with full third-party attribution (Kaggle data, Chart.js, Google Fonts)
- **[DISCLAIMER.md](DISCLAIMER.md)** — IP, image rights, and AI usage fully disclosed
- **Agents League compliant** — General-level public content only, per [agentsleague DISCLAIMER](https://github.com/microsoft/agentsleague/blob/main/DISCLAIMER.md)

---

## 🚀 Deployment Pipeline

```
Developer → git push → GitHub Actions → GitHub Pages CDN
              ↓
         Auto-build
         Auto-deploy
         HTTPS enforced
         Global CDN cached
```

- Every push to `main` triggers automatic deployment
- No manual build steps — the HTML/CSS/JS is served directly
- `404.html` handles unknown routes and redirects back to the SPA

---

*Built with ❤️ using GitHub Copilot | Submitted to Microsoft Agents League 2026*

---

## 🧗 Challenges & Learnings

### ⚡ Top 5 Challenges We Solved

| # | Challenge | Solution | Learning |
|---|-----------|----------|----------|
| 1 | **`file://` CORS errors locally** | Switched to `python -m http.server` + documented in README | Static sites always need a local web server for `fetch()` |
| 2 | **Background image missing on GitHub Pages** | Fixed `url('/images/')` → `url('../images/')` — CSS paths resolve relative to the CSS file, not the HTML | Always use file-relative paths in CSS |
| 3 | **Light mode invisible text** | Replaced all hardcoded `rgba(255,255,255,x)` with CSS variables (`var(--text)`, `var(--muted)`) | Never hardcode colours — always use theme variables |
| 4 | **GitHub Actions exit code 128** | Switched from legacy `gh-pages` branch deploy to official `actions/deploy-pages@v4` with proper `write` permissions | Use GitHub's official Pages actions for reliable CI/CD |
| 5 | **Training page layout broken** | Added `flex-direction: column` to `body` — default flex is `row`, stacking header & content side by side | Always explicitly set flex direction |

---

### 💡 Key Learnings

- 🤖 **GitHub Copilot = 40% faster** — Especially for repetitive patterns like table rendering, chart config, and accessibility attributes
- 🎨 **CSS Variables are powerful** — One class toggle (`html.light`) updates the entire UI instantly across 7 pages
- 📦 **Static is underrated** — No backend, no database, no server costs — yet delivers a full SPA experience
- ♿ **Accessibility from day one** — Retrofitting ARIA labels and keyboard navigation is harder than building it in from the start
- 🚀 **GitHub Pages path gotchas** — Absolute paths (`/images/`) break on subdirectory deployments; relative paths always win

---

### 🏆 What We're Most Proud Of

> **Building a full learning platform — Academy, Dashboard, Analytics, and 702-pitch database — as a pure static site with zero backend, deploying in under 2 minutes, for free, using GitHub Copilot as an AI pair programmer.**
