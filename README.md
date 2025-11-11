# Perplexity Command Deck

Perplexity Command Deck is a premium agentic operations workspace that ships with reusable UI modules, a command-focused home page, and a dark themed layout shell. It is built with React, TypeScript, Tailwind CSS, Zustand, and Vite.

## Getting Started

```bash
npm install
npm run dev
```

Navigate to [http://localhost:5173/home](http://localhost:5173/home) to experience the Command Deck.

### Available Scripts

- `npm run dev` – start the Vite dev server.
- `npm run build` – type-check the project and create an optimized production build.
- `npm run preview` – locally preview the production build.
- `npm run lint` – run ESLint over all TypeScript and TSX files.

## Features

- **Reusable UI Kit** – KPI heroes, risk alerts, agent and connector cards, run timeline, budget bar, templates, and mode switcher.
- **Adaptive Layout** – Fixed left navigation, responsive top bar, keyboard shortcuts, and global dark theme.
- **Command Deck Modes** – Executive, Operator, Analyst, and Creative modes with tailored widgets and mock data.
- **Mock Data Layer** – Opinionated dataset powering KPIs, alerts, agents, connectors, budgets, and creative schedules.
- **State Persistence** – Mode selection persisted via Zustand middleware.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3
- Zustand
- Recharts
- Lucide Icons

## Project Structure

```
src/
  components/
    layout/        # Application shell, navigation, top bar, keyboard shortcuts
    ui/            # Reusable business components
  features/
    home/          # CommandDeck surface by operating mode
  lib/
    mock/          # Mock data sources feeding the dashboards
  stores/          # Global state stores (mode persistence)
  routes/          # Shared page helpers and placeholders
```

## Keyboard Shortcuts

- `/` – Focus global search
- `G` – Jump to Governance
- `A` – Jump to Agents
- `C` – Jump to Connectors
- `Cmd/Ctrl + K` – Open the command palette (focus search input)

## Styling

The app embraces a dark, cinematic aesthetic (background `#0F1113`) and uses Poppins for display typography with Inter for body copy. Scrollbars, selections, and interactive states are themed to accent color `#3EB0F1`.

## Mock Data Sources

Mock data lives under `src/lib/mock` and includes:

- `alerts.ts` – risk and opportunity alerts
- `agents.ts` – top performing agents with budget stats
- `connectors.ts` – data source health metadata
- `dashboard.ts` – KPI values, activity feed, analyst metrics, creative schedule
- `budgets.ts` – spend caps and model breakdown

These mocks power all four command deck modes.

## License

MIT
