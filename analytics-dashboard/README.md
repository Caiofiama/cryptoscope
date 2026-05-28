# CryptoScope — Analytics Dashboard

A production-quality crypto analytics dashboard consuming the CoinGecko public API. Built to demonstrate real API consumption, complex state management, and clean component architecture.

> **Live demo:** _Add your Vercel URL here after deployment_

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Styling | TailwindCSS v4 |
| Charts | Recharts |
| Global state | Zustand + persist middleware |
| Data fetching | TanStack Query v5 |
| Routing | React Router v6 |
| Icons | Lucide React |
| API | CoinGecko Public API |

---

## Features

- **4 KPI cards** — Market Cap, 24h Volume, Avg Price Change, BTC Dominance
- **Line chart** — Bitcoin price history with 7D / 30D / 90D period selector
- **Bar chart** — Top 10 coins by 24h trading volume
- **Sortable data table** — Sort by price, change %, market cap, volume
- **Search with debounce** — 300ms debounced filter across coin name/symbol
- **Sparkline mini-charts** — 7-day price trend per row
- **Coin detail page** — Click any row → `/coin/:id` with full price chart
- **Dark / light mode** — Toggle persisted in `localStorage`
- **Loading skeletons** — All async content uses skeleton placeholders
- **Error boundary** — User-friendly fallback with retry action
- **Fully responsive** — Mobile, tablet, desktop layouts

---

## How to Run Locally

```bash
git clone <repo-url>
cd analytics-dashboard
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> The CoinGecko free tier allows ~30 req/min. React Query caches responses for 60s to stay well within limits.

---

## Project Structure

```
src/
├── components/       # Reusable UI: Card, Skeleton, ChangeBadge, ErrorBoundary, Navbar
├── features/
│   ├── dashboard/    # KpiCards, PriceChart, VolumeChart
│   └── coins/        # CoinTable, SearchInput, Sparkline
├── hooks/            # useCoinList, useCoinHistory, useGlobal, useDebounce
├── pages/            # DashboardPage, CoinDetailPage
├── services/         # coinGecko.ts — all fetch calls, fully typed
├── stores/           # uiStore (Zustand) — theme, period, sort, search
├── types/            # Shared TypeScript interfaces
└── utils/            # formatters.ts — currency, percent, large numbers
```

---

## Architectural Decisions

**Zustand over Context API** — Context re-renders the entire subtree on every state change. Zustand uses a subscription model so only components that consume a specific slice re-render. For a dashboard with frequent data updates, this matters.

**React Query for server state** — Server state (API data) and client state (UI preferences) have different lifecycles. React Query handles caching, background refetching, stale-while-revalidate, and deduplication out of the box. `staleTime: 60s` prevents hammering the free-tier API.

**Services separated from hooks** — `services/coinGecko.ts` contains pure fetch functions with no React dependency. Hooks in `hooks/` compose those with React Query. This makes the fetch logic independently testable and reusable outside React.

**Skeletons over spinners** — Skeletons preserve layout during loading, preventing cumulative layout shift (CLS) and giving users a sense of the content structure before it arrives.

**No component fetches directly** — All data flows through custom hooks. Components receive data via props. This keeps components pure, predictable, and easy to test in isolation.

**Formatters in utils** — Formatting logic (currency, percent, large numbers) lives in `utils/formatters.ts`. Inline formatting in JSX is hard to test and creates inconsistency across the UI.

**Debounce hook** — `useDebounce` delays the search query by 300ms, preventing a filter recalculation on every keystroke. The actual filtering happens in a `useMemo` inside `CoinTable`, so it only recomputes when the debounced value or sort state changes.
