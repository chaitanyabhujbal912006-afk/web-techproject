# Web Technology Projects & Assignments

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?logo=reactquery)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-v5-orange)](https://github.com/pmndrs/zustand)

A collection of advanced Web Technology lab assignments and projects covering modern frontend architectures, strict TypeScript engineering, reactive state management, asynchronous data fetching, and Next.js rendering strategies (SSR, SSG, ISR).

---

## 📁 Repository Structure

```text
wtproject/
├── Assignment7_TypeScript_Weather_Dashboard/       # Strict TypeScript + Open-Meteo Weather App
│   ├── src/
│   │   ├── config.ts                               # Strongly-typed configuration (as const satisfies)
│   │   ├── types.ts                                # Discriminated union ApiState<T> & API models
│   │   ├── weather.ts                              # Generic fetchJson<T>() & API logic
│   │   └── main.ts                                 # DOM manipulation & dashboard controller
│   └── README.md
│
├── Assignment8_Zustand_TanStack_Data_Fetching/      # React + Zustand + TanStack Query (AutoFlow)
│   ├── src/
│   │   ├── stores/loaderStore.ts                   # Centralized Zustand loading store
│   │   ├── hooks/useCars.ts                        # Unified data fetching & mutation hook
│   │   ├── components/ToastProvider.tsx            # Centralized toast notification system
│   │   └── main.tsx                                # Main application & UI dashboard
│   └── README.md
│
├── Assignment09_NextJS_Rendering_Strategies/        # Next.js 14 App Router Rendering Paradigms
│   ├── app/
│   │   ├── page.tsx                                # SSG: Static Site Generation (force-static)
│   │   ├── posts/[id]/page.tsx                     # ISR: Incremental Static Regeneration (revalidate = 60)
│   │   └── dashboard/page.tsx                      # SSR: Server-Side Rendering (force-dynamic)
│   └── README.md
│
└── README.md                                       # Root Documentation
```

---

## 🚀 Projects Overview

### 1. [Assignment 7 — TypeScript Weather Dashboard](./Assignment7_TypeScript_Weather_Dashboard)
> **Interactive real-time weather analytics engine built with strict TypeScript.**

- **Key Highlights**:
  - **Strict Type Safety**: Compiled under `strict: true` with zero `any` declarations.
  - **Generic API Layer**: Reusable `fetchJson<T>(url)` helper for typed HTTP requests.
  - **Discriminated Unions**: Robust UI state machine (`ApiState<T>`) handling `idle`, `loading`, `success`, and `error` states gracefully.
  - **Type Constraints**: Safe configuration patterns using TypeScript's `as const satisfies`.
  - **Real-Time Data**: Integrates Open-Meteo geocoding and forecast APIs (no API key required).
- **Tech Stack**: TypeScript, Vite, CSS3, Open-Meteo API.
- **Quick Run**:
  ```bash
  cd Assignment7_TypeScript_Weather_Dashboard
  npm install
  npm run dev
  ```

---

### 2. [Assignment 8 — Zustand & TanStack Query Data Fetching](./Assignment8_Zustand_TanStack_Data_Fetching)
> **Modern state management and decoupled asynchronous data fetching layer (AutoFlow).**

- **Key Highlights**:
  - **TanStack React Query v5**: In-memory query caching, background synchronization, `staleTime` control, and manual refetching.
  - **Zustand v5 Store**: Lightweight, boilerplate-free global state tracking application-wide loading status.
  - **Custom React Hooks**: Encapsulated data layer in `useCars` returning data, loading, error states, and mutation handlers in a single line.
  - **Centralized Feedback**: Custom `ToastProvider` for reactive, accessible alert messages on network/simulated errors.
  - **Async Mock Engine**: Built-in mock data provider supporting simulated network latency and API exceptions.
- **Tech Stack**: React 18, TypeScript, Zustand, TanStack Query, Vite.
- **Quick Run**:
  ```bash
  cd Assignment8_Zustand_TanStack_Data_Fetching
  npm install
  npm run dev
  ```

---

### 3. [Assignment 9 — Next.js Rendering Strategies](./Assignment09_NextJS_Rendering_Strategies)
> **Comprehensive benchmark and implementation of Next.js App Router rendering paradigms.**

- **Key Highlights**:
  - **SSG (Static Site Generation)**: Pre-rendered at build time with `dynamic = "force-static"` for instantaneous delivery via CDN.
  - **ISR (Incremental Static Regeneration)**: Dynamic regeneration on background intervals using `generateStaticParams()` and `revalidate = 60`.
  - **SSR (Server-Side Rendering)**: Dynamic on-demand server generation with `dynamic = "force-dynamic"` delivering real-time server timestamped data.
  - **React Server Components (RSC)**: Server-first data fetching minimizing client-side JavaScript payload.
  - **TTFB Benchmarks**: Direct performance comparisons measuring Time-to-First-Byte across all strategies.
- **Tech Stack**: Next.js 14, React 18, TypeScript, Node.js.
- **Quick Run**:
  ```bash
  cd Assignment09_NextJS_Rendering_Strategies
  npm install
  npm run build
  npm start
  ```

---

## 🛠️ Prerequisites & Setup

Ensure you have [Node.js](https://nodejs.org/) (LTS recommended) installed on your system.

Each assignment is self-contained. You can navigate into any project folder, install its dependencies, and run its development server independently:

```bash
# Clone the repository
git clone https://github.com/chaitanyabhujbal912006-afk/web-techproject.git
cd web-techproject

# Choose an assignment to run
cd <Assignment-Folder-Name>
npm install
npm run dev
```

---

## 📜 License

This repository is maintained for Web Technology coursework and educational demonstrations.
