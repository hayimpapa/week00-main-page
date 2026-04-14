# 52 apps. 52 weeks. Before I turn 52.

The main homepage for the **52 apps in 52 weeks** challenge by [Hey I'm Papa](https://github.com/hayimpapa).

Part of 52 apps in 52 weeks before I turn 52 — Hey I'm Papa.

---

## What is this?

I'm Gabor. I turned 51 and made myself a slightly ridiculous promise. Every week for a year I'll build one app from scratch using AI tools — no traditional coding background, just curiosity and a problem worth solving. This homepage tracks all 52 apps, showing live ones with a flip card that links to the deployed app.

## Tech

React + TypeScript, built with Vite, deployed on Vercel.

## Features

- 52 flip cards in a responsive grid — click to reveal app details and launch links
- Auto-unlock: cards become flippable on their scheduled release date
- Cards show "Coming soon" when date-unlocked but not yet marked live
- GitHub link on each live card
- Live progress bar
- Clean, warm, mobile-responsive design

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Deploy to Vercel

Push to GitHub and connect to [Vercel](https://vercel.com). It will auto-detect Vite and deploy.

## Adding a new week

All week data lives in a single array at the top of `src/App.tsx`. Shipped weeks are defined explicitly, and the remaining weeks up to 52 are auto-generated with empty placeholders via `Array.from(...)`. A shipped week entry looks like this:

```ts
const weeks: Week[] = [
  {
    week: 1,
    title: 'The Planner',
    description: 'Track and plan all 52 builds',
    url: 'https://52-app.com/week01',
    githubUrl: 'https://github.com/hayimpapa/week01-the-planner',
    live: true,
    liveDate: '2026-03-08',
  },
  // ...more shipped weeks, then remaining weeks auto-generated via Array.from(...)
]
```

When you ship a new app:
1. Find the matching week entry in the array (or replace its auto-generated placeholder)
2. Set `title`, `description`, `url`, and `githubUrl`
3. Set `live: true`
4. Push — the card will unlock automatically on `liveDate`

No other code changes needed.

## Prompt history

The prompt used to generate this app is documented in [PROMPTS.txt](./PROMPTS.txt).

## Links

- GitHub: [github.com/hayimpapa](https://github.com/hayimpapa)
