# 52 apps. 52 weeks. Before I turn 52.

The main homepage for the **52 apps in 52 weeks** challenge by [Hey I'm Papa](https://github.com/hayimpapa).

Part of 52 apps in 52 weeks before I turn 52 — Hey I'm Papa.

---

## What is this?

I'm Gabor. I turned 51 and made myself a slightly ridiculous promise. Every week for a year I'll build one app from scratch using AI tools — no traditional coding background, just curiosity and a problem worth solving. This homepage tracks all 52 apps, showing live ones with a flip card that links to the deployed app.

## Features

- 52 flip cards in a responsive grid — click to reveal app details
- Auto-unlock: cards unlock automatically on their release date
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

All week data lives in a single array at the top of `src/App.tsx`:

```ts
const weeks: Week[] = [
  {
    week: 1,
    title: 'The Planner',
    description: 'Track and plan all 52 builds',
    url: 'https://your-deployed-url.vercel.app',
    live: true,
    liveDate: '2026-03-08',
  },
  // ...
]
```

When you ship a new app:
1. Find the matching week entry in the array
2. Set `live: true`
3. Set `url` to the deployed app URL
4. Push — the card will unlock automatically on `liveDate`

No other code changes needed.

## Prompt history

The prompt used to generate this app is documented in [PROMPTS.txt](./PROMPTS.txt).

## Links

- GitHub: [github.com/hayimpapa](https://github.com/hayimpapa)
