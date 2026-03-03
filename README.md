# ThinkVerge Web

This repository contains a Next.js 14 site with Tailwind CSS.

## Development

```bash
npm install
npm run dev
``` 

## Production Build

```bash
npm run build
npm run start   # or npm run export for a static version
```

## Deployment

### Vercel (recommended)
1. Push the repository to GitHub (or GitLab/Bitbucket).
2. Go to https://vercel.com and import the project.
3. Use the default settings; Vercel automatically detects Next.js.
4. On every push to `main`, Vercel will rebuild and deploy the site.

> You can also provide environment variables via the Vercel dashboard if needed.

### GitHub Pages (static export)
The site can be exported to static HTML with `npm run export` and deployed to GitHub Pages using the included GitHub Actions workflow.

1. Go to this repo's **Settings › Pages** and set the source to the `gh-pages` branch.
2. On every push to `main`, the workflow will build, export, and publish the `out/` directory.

### Docker
A `Dockerfile` is included for running the app in a container. Example:

```bash
npm ci
npm run build

docker build -t thinkverge-web .
docker run -p 3000:3000 thinkverge-web
```
