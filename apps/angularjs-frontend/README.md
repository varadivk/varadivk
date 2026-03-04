# Data Monetization Agent — AngularJS Frontend

A fully deployable AngularJS 1.x single-page application providing the same
Data Monetization Agent UI as the Python/Flask app — served via nginx.

## Features

- **Dashboard** — Agent status, objective progress, live stats
- **Industries** — Accordion browser across 9 industries and 33+ sub-industries
- **Valuation Tool** — Client-side cost-based, market-comparable, and DCF calculator
- **Orchestration** — Visual agent architecture, orchestration loop, and 6-initiative roadmap
- **SPA routing** — `ngRoute` with hash-bang (`#!/`) URLs

## Quick Start (local file)

Since the app uses AngularJS CDN and `ngRoute` with hash routing, you can
open it directly — **but browsers block partial-view XHR requests from `file://`**.
Use a local server instead:

```bash
# Python 3
python3 -m http.server 8080
# Open http://localhost:8080

# Node (npx)
npx serve .
# Open http://localhost:3000
```

## Docker

```bash
docker build -t thinkverge-data-monetization-ng .
docker run -p 8080:80 thinkverge-data-monetization-ng
# Open http://localhost:8080
```

## Docker Compose (optional)

```yaml
services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

## Tech Stack

- **AngularJS 1.8.3** — MVC SPA framework (CDN, no build step)
- **angular-route 1.8.3** — Client-side routing (CDN)
- **nginx 1.27** — Static file server with SPA fallback
- **Vanilla CSS** — Dark theme, no preprocessor required

## Structure

```
apps/angularjs-frontend/
├── index.html                   # SPA shell (ng-app, ng-view, scripts)
├── app.js                       # Module definition and $routeProvider config
├── css/styles.css               # Dark theme stylesheet
├── controllers/
│   ├── dashboard.controller.js
│   ├── industries.controller.js
│   ├── valuation.controller.js
│   └── orchestration.controller.js
├── services/
│   └── data.service.js          # All domain data + valuation logic
├── views/
│   ├── dashboard.html           # Partial view for /
│   ├── industries.html          # Partial view for /industries
│   ├── valuation.html           # Partial view for /valuation
│   └── orchestration.html      # Partial view for /orchestration
├── nginx.conf                   # nginx SPA config
└── Dockerfile
```
