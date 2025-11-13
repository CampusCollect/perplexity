# Code Health Assessment & Refactor Plan

## Overview
- **Repo scope inspected:** `/workspace/perplexity`
- **Primary stack:** React 19 + Vite + Tailwind CSS + Zustand
- **Total LOC (cloc):** 1,267 lines (TypeScript-heavy frontend only)
- **Back end / infra:** Not present—`src/lib/api`, `src/lib/auth`, and `src/lib/events` are placeholders.
- **Test coverage:** None. No unit, integration, or end-to-end tests are defined.

## Domain Breakdown
| Domain | Key files | LOC | Test coverage | Production-ready | Risk / debt level | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Application shell & routing | `src/App.tsx`, `src/main.tsx`, `src/components/layout/AppLayout.tsx` | 238 | None | **No** | Medium | Static navigation shell with mocked keyboard shortcuts and no authentication guardrails. |
| Feature surfaces (pages) | `src/features/**` | 478 | None | **No** | Medium | All views render mock data with zero data fetching, validation, or error states. |
| Reusable UI primitives | `src/components/ui/**` | 384 | None | **Partial** | Medium | Tailwind-based components without accessibility audits, theming, or design tokens beyond static classes. |
| Operational dashboards | `src/features/home/HomePage.tsx` | 131 | None | **No** | High | Command deck shows static data; no observability, loading, or error handling. |
| State management | `src/lib/store/modeStore.ts` | 15 | None | **Partial** | Low | Zustand store limited to an operating mode toggle; lacks persistence or multi-user context. |
| Data contracts & mocks | `src/lib/mock/**` | 179 | None | **No** | High | Mocked arrays substitute for live services; no schema validation or API wiring. |
| Infrastructure stubs | `src/lib/api/index.ts`, `src/lib/auth/index.ts`, `src/lib/events/index.ts` | 6 | None | **No** | High | Empty placeholders; production concerns (auth, API, event bus) entirely absent. |
| Styles & design tokens | `src/index.css`, `src/styles/tokens.json` | 69 | None | **Partial** | Medium | Tailwind globals with minimal design tokens; lacks dark-mode toggles and accessibility validation. |

## Top Risks & Gaps
1. **No authentication, RBAC, or session handling:** `src/lib/auth/index.ts` is empty, so all routes/pages are publicly available.
2. **API layer is non-existent:** `src/lib/api/index.ts` exports nothing; all data is mocked, preventing real integrations.
3. **Zero input validation / error handling:** Components assume data always exists; no guard rails for empty/error states.
4. **No logging or observability hooks:** Without instrumentation, issues cannot be detected or traced.
5. **Static mock data:** Executive KPIs and agent flows cannot reflect real-world operations, destroying trust.
6. **Lack of routing protection:** `AppLayout` renders features regardless of auth or tenant context.
7. **No testing suite:** There are no tests to prevent regressions as we scale to production.
8. **No build-time type safety for external data:** Mocked types are local; there are no contracts for incoming API payloads.
9. **Accessibility gaps:** UI primitives lack aria attributes, focus management, and keyboard interactions beyond defaults.
10. **No deployment or environment management:** Secrets management, environment separation, and CI/CD scripts are missing.

## Prioritized Refactor Themes
- **P0 (blocking launch):** Ship authentication & RBAC, implement real API client with error handling, replace mocks with typed data fetching, add logging/observability hooks, and introduce validation + resilient UI states.
- **P1 (needed for scale):** Establish state management patterns (React Query + Zustand), add routing guards, implement data caching & retry logic, integrate analytics/monitoring, and harden accessibility.
- **P2 (quality & maintainability):** Modularize features, introduce comprehensive testing, document component patterns, and expand design tokens with theming support.

## Production Requirements Checklist
| Requirement | Status | Notes |
| --- | --- | --- |
| Error handling & retry logic | ⛔ Missing | All data is mocked; no fetch or retry patterns exist. |
| Logging & observability | ⛔ Missing | No telemetry framework (Datadog/CloudWatch, console logging, or trace IDs). |
| Authentication & RBAC | ⛔ Missing | Auth module is empty; no roles or session management. |
| Data validation & sanitization | ⛔ Missing | Components assume perfect data and render raw strings. |
| Database migrations & backups | ⛔ Missing | No backend persistence implemented. |
| Rate limiting & circuit breakers | ⛔ Missing | No outbound API clients yet. |
| Monitoring & alerts | ⛔ Missing | No metrics or alerting hooks. |
| Security controls (TLS, encryption, PII masking) | ⛔ Missing | Frontend-only project; no security posture defined. |

## Refactor Roadmap (Phase 1)
### Phase 1A – Stabilize Critical Gaps (Week 1)
1. Implement authentication shell with protected routes and role awareness.
2. Replace mock data with React Query fetching layers (even if initially pointing to mocked HTTP endpoints) and add optimistic loading/error states.
3. Introduce global error boundary and toast/system banner for surfacing failures.
4. Scaffold logging utility (structured console + remote sink) and propagate trace IDs via context.

### Phase 1B – Modularize & Prepare for Integration (Week 1-2)
1. Restructure features into domain modules with hooks/services separated from presentation.
2. Define TypeScript interfaces aligned with backend contracts and centralize in `src/lib/types`.
3. Implement API client with retry/backoff, request/response interceptors, and environment-driven base URLs.
4. Introduce context providers for tenant/session, feature flags, and UI state.

### Phase 1C – Observability & Quality Foundations (Week 2)
1. Add logging pipeline integrations and instrumentation for user actions + API lifecycle.
2. Establish testing harness (Vitest + React Testing Library) with initial unit tests for critical components.
3. Build Storybook or docs-based component catalog to drive design consistency (optional stretch if time permits).
4. Document deployment and environment configuration strategy (staging vs production, secrets, CI/CD triggers).

## Two-Week Refactor Sprint Plan (Max 4 hrs/day)
| Day | Focus | Deliverable |
| --- | --- | --- |
| 1 | Audit confirmation & architecture sketch | Update this plan with backend integration blueprint and route guards. |
| 2 | Auth shell & routing guards | Protected layout wrapper, mocked session provider, login stub. |
| 3 | API client scaffolding | Axios/fetch wrapper with interceptors, error normalization, retry policy. |
| 4 | Replace mock data (agents, runs) with query hooks | React Query setup, loading/error UI states, typed responses. |
| 5 | Logging & telemetry hooks | Structured logger, context provider, initial Datadog stub. |
| 6 | Global error boundary & notification framework | User-facing banner/toast + fallback UI. |
| 7 | Data validation layer | Zod schemas for responses + sanitization helpers. |
| 8 | Testing harness | Vitest config, sample tests for API client and critical components. |
| 9 | Accessibility & UI hardening | Keyboard/focus fixes, ARIA attributes, responsive QA. |
| 10 | Documentation & demo | Update README with new architecture, record staging deploy checklist. |

## Estimation Summary
- **Phase 1A:** ~24 engineer-hours (Auth, data fetching, error states, logging scaffolding).
- **Phase 1B:** ~28 engineer-hours (modularization, types, API client hardening, session context).
- **Phase 1C:** ~24 engineer-hours (observability, testing, documentation).
- **Buffer:** 8 hours for integration adjustments after stakeholder review.

> This plan keeps MVP features intact while laying the groundwork for production-grade reliability, security, and data fidelity.
