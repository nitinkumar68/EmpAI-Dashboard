# 💻 Technologies Used & Architecture Guide

This document provides a comprehensive analysis of the technologies, libraries, styling methodology, state architecture, and design tokens used to build **EmpAI Dashboard**.

---

## 📑 Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Frontend Core & Build Tooling](#frontend-core--build-tooling)
3. [State Management & Data Persistence](#state-management--data-persistence)
4. [Design System & Styling Architecture](#design-system--styling-architecture)
5. [Animations & Micro-Interactions](#animations--micro-interactions)
6. [Data Visualization](#data-visualization)
7. [AI Integration SDK](#ai-integration-sdk)
8. [Package Manifest & Dependencies](#package-manifest--dependencies)

---

## 🚀 Tech Stack Overview

```
                          ┌──────────────────────────────────────────┐
                          │             EmpAI Dashboard              │
                          └────────────────────┬─────────────────────┘
                                               │
         ┌──────────────────────┬──────────────┴───────┬──────────────────────┐
         ▼                      ▼                      ▼                      ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Core & UI      │  │ State & Logic    │  │ Data & Charts    │  │ Animations & Motion│
├──────────────────┤  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ • React 18       │  │ • Zustand        │  │ • Recharts       │  │ • Framer Motion  │
│ • Vite 5         │  │ • LocalStorage   │  │ • Gemini AI SDK  │  │ • GSAP           │
│ • React Router 6 │  │ • Custom Hooks   │  │ • Mock Data      │  │ • CSS Animations │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## ⚡ Frontend Core & Build Tooling

- **React 18**: Built using functional components, modern React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`), and Concurrent React features for smooth rendering.
- **Vite 5**: Next-generation frontend build tool providing:
  - Lightning-fast Hot Module Replacement (HMR).
  - Fast ES Module bundling using Rollup.
  - Native environment variable resolution (`import.meta.env`).
- **React Router DOM v6**: Client-side single page app (SPA) routing with layout route wrappers:
  - `/` — Landing Hero Page
  - `/chat` — AI Employee Assistant Chat Interface
  - `/directory` — Employee Directory & Department Search
  - `/analytics` — Workforce Analytics Dashboard
  - `/profile` — Settings & User Preferences

---

## 🧠 State Management & Data Persistence

- **Zustand (`src/store/useAppStore.js`)**: Lightweight, high-performance state management library used for:
  - **Chat Messages**: Storing current and historical AI conversation context.
  - **Theme Toggle**: Light/Dark mode state management.
  - **User Profile**: User details (name, email, role, notification preferences).
  - **Department Filters**: Directory search query and active category state.
- **Persistence Layer**: Custom sync with browser `localStorage` ensuring chat history and user settings persist across page reloads.

---

## 🎨 Design System & Styling Architecture

The application implements a custom **Vanilla CSS Modules** architecture combined with **CSS Custom Properties (Tokens)** and **Glassmorphism aesthetics**.

### Design Tokens (`src/index.css`)
```css
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;

  /* Color Palette - Dark Mode Primary */
  --bg-dark: #0b0f19;
  --bg-card: rgba(18, 24, 38, 0.75);
  --bg-sidebar: #0f1623;
  --accent-primary: #6366f1; /* Indigo */
  --accent-secondary: #8b5cf6; /* Violet */
  --accent-glow: rgba(99, 102, 241, 0.25);
  
  /* Text Colors */
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;

  /* Borders & Glassmorphism */
  --border-glass: rgba(255, 255, 255, 0.08);
  --backdrop-blur: blur(16px);
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
}
```

### Key UI Characteristics
1. **Glassmorphism**: Translucent cards using `backdrop-filter: blur(16px)` and subtle glowing borders (`rgba(255, 255, 255, 0.08)`).
2. **Dynamic Spacing & Flex Layouts**: Rigid height calculations (`height: 100vh`, `overflow: hidden`) on app layout wrappers to eliminate unnecessary full-page scrollbars during chat interactions.
3. **Responsive Grids**: Auto-fitting employee card grids (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`).

---

## ✨ Animations & Micro-Interactions

- **Framer Motion**: Handles component entry transitions, modal overlays, tab switches, and hover/click feedback animations.
- **GSAP (GreenSock Animation Platform)**: Used for smooth timeline-based hero section animations and staggered entry effects on page load.
- **CSS Keyframes**: Pulse effects for AI status badges, glowing gradient borders, and message typing indicators.

---

## 📊 Data Visualization

- **Recharts**: Modular SVG chart rendering library used in `src/pages/Analytics.jsx`:
  - **Bar Chart**: Departmental workforce distribution.
  - **Pie Chart**: Employment status ratios (Full-time, Part-time, Contract).
  - **Area / Line Chart**: Monthly employee growth and hiring trends.
  - Custom glassmorphic tooltips and color palettes.

---

## 🤖 AI Integration SDK

- **`@google/generative-ai`**: Official Google Node/JS SDK for Gemini models.
- **Model**: `gemini-3.6-flash`
- **Features**: Multi-turn chat session management (`startChat`), system instructions injection, token limits, and error handling.

---

## 📋 Package Manifest & Dependencies

Below is the complete list of runtime and development dependencies:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.4",
    "recharts": "^3.0.0",
    "lucide-react": "^0.312.0",
    "react-hot-toast": "^2.4.1",
    "zustand": "^4.4.7",
    "@google/generative-ai": "^0.1.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```
