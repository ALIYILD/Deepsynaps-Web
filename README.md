# DeepSynaps AI Lab

The public DeepSynaps AI Lab website at **https://deepsynaps.ai**, built with React 19, TypeScript and Vite. Netlify project: `deepsynaps-web`. Production builds from this repository's `main` branch.

## Website

The design follows the approved landing-v2 reference: dark navy hero, interactive NERVE network, blue-violet buttons, Outfit headings, DM Sans body copy and pastel ecosystem cards. Fonts and the DeepSynaps symbol are served locally.

- `/` — AI Lab homepage, adaptive learning tabs, NERVE explorer, ecosystem and collaboration.
- `/nerve` — expanded, keyboard-accessible network explorer with selectable clusters, zoom, label toggling and a step-through learning loop.
- `/research` and `/research/adaptive-learning` — research directions and the proposed learning architecture.
- `/ecosystem` and `/ecosystem/:slug` — Chip Design Lab, Clinical Intelligence OS, Perfflux, Peak Performance, Academy, Niraxx and SyncWell.
- `/about` — lab purpose and research principles.
- `/consultations`, `/academy`, `/privacy` — retained consultation, education and privacy pages.

The NERVE network is an explanatory visualisation, not a live AI runtime. Adaptive learning, world models, physical AI and chip design are described as research directions. No autonomous-learning, causal-validation, fabricated-chip or deployed-robotics claims are made.

## Develop and verify

```sh
npm ci
npm run dev
npm run build
npm test
```

The build produces `dist/`. `netlify.toml` retains the existing domain redirects, security headers, SPA routing and Deepy function. Vite uses absolute asset paths so nested routes load directly.

Main implementation: `src/pages/AILab.tsx`, `src/components/lab/NerveExplorer.tsx`, `src/data/lab.ts`, `src/lab.css`. The web assistant's reviewed knowledge is in `netlify/functions/_deepy/knowledge/web.mjs`. Contact details are in `src/config/contact.ts`.

## Deployment

Push a verified commit to `main` to trigger the existing Netlify production deployment. Confirm its commit reference and published status before declaring the update live. The separate `lab-site` and `academy-site` source folders are retained.

Copyright DeepSynaps. All rights reserved.
