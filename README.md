# DeepSynaps

**DeepSynaps** is the institutional website for an interdisciplinary AI and neuroscience organization building the future of clinical intelligence, brain-inspired computing, and human-centered neurotechnology.

> **Live Site**: https://5vnczzify3ff2.kimi.page

---

## Brand Structure

| Division | Description |
|----------|-------------|
| **DeepSynaps** | Umbrella organization |
| **DeepSynaps OS** | Clinical intelligence platform |
| **DeepSynaps Lab** | Research and innovation arm |
| **DeepSynaps Academy** | Education and training ecosystem |

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **shadcn/ui** (component library)
- **Lucide React** (icons)
- **Canvas 2D** (neural network background animation)

---

## Project Structure

```
.
├── public/
│   └── logo.png                    # DeepSynaps brand logo
├── src/
│   ├── components/
│   │   ├── NeuralNetworkCanvas.tsx # Canvas 2D neural network simulation
│   │   ├── Header.tsx              # Fixed navigation with scroll effects
│   │   ├── Footer.tsx              # 4-column footer with disclaimer
│   │   └── ScrollReveal.tsx        # IntersectionObserver scroll animations
│   ├── hooks/
│   │   └── useScrollPosition.ts    # Scroll position tracking hook
│   ├── sections/
│   │   ├── HeroSection.tsx         # Full-viewport hero with CTAs
│   │   ├── MissionSection.tsx      # Organization mission statement
│   │   ├── EcosystemSection.tsx    # 3 glassmorphism cards (OS/Lab/Academy)
│   │   ├── StrategicPillarsSection.tsx # 6 pillar blocks
│   │   ├── OSPreviewSection.tsx    # DeepSynaps OS feature grid
│   │   ├── LabPreviewSection.tsx   # Research theme cards
│   │   ├── AcademyPreviewSection.tsx # Education course cards
│   │   └── VisionSection.tsx       # Closing vision statement
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles + Tailwind
├── index.html                      # HTML entry + SEO metadata
├── tailwind.config.js              # Tailwind theme configuration
├── vite.config.ts                  # Vite build configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

---

## Sections

1. **Hero** — Neural network background, headline, subheadline, CTA buttons
2. **Mission** — Organization mission and positioning statement
3. **Ecosystem** — Three glassmorphism cards for OS, Lab, and Academy
4. **Strategic Pillars** — Six visual blocks (Clinical Intelligence, Neuroscience Infrastructure, Brain-Inspired Computing, Human-Centered Neurotechnology, AI Research, Education & Training)
5. **DeepSynaps OS Preview** — Feature grid with clinical disclaimer
6. **DeepSynaps Lab Preview** — Six research theme cards with numbered labels
7. **DeepSynaps Academy Preview** — Six education course cards
8. **Vision** — Inspirational closing statement
9. **Footer** — Links, disclaimer, copyright

---

## Key Features

### Neural Network Background
- Canvas 2D simulation with 25-60 neuron nodes (responsive density)
- Dynamic synaptic connections with distance-based opacity
- Violet signal pulses traveling along connections with fading trails
- Gentle Brownian drift physics for organic movement
- Optimized with `requestAnimationFrame` and reduced motion support

### Scroll Animations
- IntersectionObserver-based entrance animations
- Fade-up, fade-in, and scale-in variants
- Staggered children animations for grids and lists
- Respects `prefers-reduced-motion` for accessibility

### Design System
- **Glassmorphism cards** — `backdrop-filter: blur`, semi-transparent backgrounds
- **Color accents** — Amber (#D4943A), Violet (#6B4EE6), Cyan (#2E8FDB)
- **Responsive breakpoints** — Mobile (<768px), Tablet (768-1023px), Desktop (1024px+)
- **Header transition** — Transparent to frosted-glass on scroll
- **Mobile hamburger menu** — Full-screen overlay navigation

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/DEEPSYNAPS.git
cd DEEPSYNAPS

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Server
The dev server runs at `http://localhost:5173`

### Production Build
Static files are output to the `dist/` directory and can be deployed to any static hosting service.

---

## SEO Metadata

| Property | Value |
|----------|-------|
| Title | DeepSynaps \| AI, Neuroscience & Brain-Inspired Intelligence |
| Description | DeepSynaps is an interdisciplinary AI and neuroscience organization building clinical intelligence, brain-inspired computing, and human-centered neurotechnology. |

---

## Clinical Disclaimer

> DeepSynaps OS is designed for clinical decision support and workflow assistance only. It does not diagnose, prescribe, replace clinicians, or provide emergency triage. This website and its contents are for informational purposes only and do not constitute medical advice.

---

## License

Copyright 2025 DeepSynaps. All rights reserved.
