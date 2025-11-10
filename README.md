# Agentic Business Studio (Codex)

Agentic Business Studio is a production-ready Vite + React (TypeScript) scaffold for building an AI-native operating system. It ships with routing, global state, query caching, design tokens, and a dark-themed application shell that models the core product areas of the platform.

## Features

- ⚡️ Vite + React + TypeScript foundation with path aliases (`@/`)
- 🎯 Structured feature modules (onboarding, command deck, connectors, agents, flows, runs, governance, templates, settings)
- 🧠 Global mode store powered by Zustand with Executive, Operator, Analyst, and Creative modes
- 🔌 React Router, TanStack Query, and XYFlow integrations ready for data-driven experiences
- 🎨 Tailwind CSS configured with custom design tokens and shadcn/ui primitives (button, input, select, card, dialog, tabs, table)
- 🧰 Mock data stores for agents, connectors, runs, budgets, and templates to accelerate UI prototyping
- ⌨️ Keyboard shortcuts for navigation (`/`, `G`, `A`, `C`) and an accessible command palette dialog

## Getting started

### Prerequisites

- Node.js 18+
- npm 10+

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application shell.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project structure

```
src/
├── components/
│   ├── layout/
│   └── ui/
├── features/
│   ├── onboarding/
│   ├── home/
│   ├── connectors/
│   ├── agents/
│   ├── flows/
│   ├── runs/
│   ├── governance/
│   ├── templates/
│   └── settings/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── events/
│   ├── mock/
│   └── store/
└── styles/
    └── tokens.json
```

Each feature folder contains page-level components that are wired into the central router (`src/App.tsx`). Mock data lives under `src/lib/mock` and is intended to be replaced with live data sources as your integration work progresses.

## Tailwind design tokens

Design tokens are defined in `src/styles/tokens.json` and automatically loaded into `tailwind.config.js`. Update this file to adjust color, spacing, or typography scales consistently across the interface.

---

This scaffold is the starting point for Agentic Business Studio – extend it with domain-specific APIs, agent orchestration logic, and governance workflows as you move into subsequent phases.
