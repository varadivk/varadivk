# Data Monetization Agent — Python / Flask Frontend

A fully deployable Python web application (Flask + Gunicorn) providing a
dashboard UI for the ThinkVerge Data Monetization Agent framework.

## Features

- **Dashboard** — Agent status, strategic objective progress bars, live stats
- **Industries** — All 9 industries and 35+ sub-industries with accordion UI
- **Valuation Tool** — Cost-based, market-comparable, and DCF calculator
- **Orchestration** — Visual agent architecture, orchestration loop, and 6-initiative roadmap
- **REST API** — `/api/agents`, `/api/objectives`, `/api/industries` endpoints

## Quick Start

```bash
pip install -r requirements.txt
python app.py
# Open http://localhost:5000
```

## Production (Gunicorn)

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Docker

```bash
docker build -t thinkverge-data-monetization-py .
docker run -p 5000:5000 thinkverge-data-monetization-py
# Open http://localhost:5000
```

## Docker Compose (optional)

```yaml
services:
  app:
    build: .
    ports:
      - "5000:5000"
    restart: unless-stopped
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `FLASK_ENV` | `production` | Set to `development` for debug mode |
| `PORT` | `5000` | Override via gunicorn `-b` flag |

## Tech Stack

- **Flask 3** — WSGI web framework
- **Gunicorn 22** — Production WSGI server
- **Jinja2** — Server-side templating (bundled with Flask)
- **Vanilla CSS** — Dark theme, no build step required
