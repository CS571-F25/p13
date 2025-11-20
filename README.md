# Vite + React

## Available Scripts
- npm run dev

## Boardify Features

Boardify is a mood board generator with the following features:

- **Home page** with theme input and navigation links
- **Demo page** with an interactive Board that fetches images, supports drag-and-drop reordering, applies AI keyword extraction for intelligent searches, and exports boards as PNG snapshots
- **Contact page** with a form to contact developers
- **Fixed navigation bar** across all pages

### Local Development Setup

#### Prerequisites
Make sure you have:
- A Pexels API key (get one free at https://www.pexels.com/api/)
- An Open AI API key

#### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Acquire API keys**
   ```bash
   PEXELS_API_KEY=your_pexels_key_here
   OPENAI_API_KEY=your_openai_key_here
   ```

3. **Configure the server** through Vercel:

   Set up a backend for fetching Pexels and/or Open AI API requests through Vercel
   Then use the configured backend in the frontend

### How the App Works

**Boardify Workflow:**

1. User enters a theme (e.g., "cozy coffee shop aesthetic")
2. Clicks "Search" → Pexels API returns 10 images
3. User can drag-and-drop to reorder images
4. User enters an AI prompt (e.g., "make it warmer and more golden")
5. Keywords are extracted from the prompt (e.g., ["warmer", "golden"])
6. Pexels API is searched again with those keywords
7. User can export the board as a PNG snapshot

#### Deploying to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel (https://vercel.com)
3. In Vercel Project Settings, add the `PEXELS_API_KEY` environment variable
4. Deploy! Vercel will automatically run the functions in the `api/` folder
5. Update `.env.local` to point to your deployed Vercel URL:
   ```bash
   VITE_PEXELS_PROXY_URL=https://your-vercel-app.vercel.app/api/pexels
   VITE_AI_KEYWORDS_URL=https://your-vercel-app.vercel.app/api/ai
   ```
6. Run `npm run build` to build the frontend for GitHub Pages
7. Push the `docs/` folder to your GitHub Pages branch

### Deployment: GitHub Pages + Vercel

- **Frontend**: Hosted on GitHub Pages (static files in `docs/`)
- **Serverless functions**: Hosted on Vercel (in the `api/` folder)

The frontend is configured with `base: '/p13/'` in `vite.config.js` to work with GitHub Pages at `/cs571/p13/`.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
