# ThinkVerge Web

Repository by [@varadivk](https://github.com/varadivk) — agentic AI, ecometrics, optimization, AIML.

Content and deployment instructions for a Next.js 14/Tailwind site hosted on GitHub Pages at `/thinkverge-web`.

---

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

The build uses `output: 'export'` in `next.config.js` to generate static files in `out/`.

## Deployment

### GitHub Pages (automatic via GitHub Actions)

The workflow `.github/workflows/build-and-deploy.yml` builds and publishes the site on every push to `main`.

1. In repo **Settings › Pages**, set source → `gh-pages` branch.
2. The site will be available at `https://varadivk.github.io/thinkverge-web/`.

### Vercel

For a dynamic/preview environment, import the repo at [Vercel](https://vercel.com) and deploy with default settings.

### Docker

```bash
npm ci
npm run build
docker build -t thinkverge-web .
docker run -p 3000:3000 thinkverge-web
```

---

Contact: varadivk@gmail.com
