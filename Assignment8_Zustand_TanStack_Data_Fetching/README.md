# Assignment 08 — Zustand & TanStack Query Data Fetching (AutoFlow)

A React application demonstrating modern state management and asynchronous data fetching patterns:
- **TanStack Query (React Query v5):** Client-side caching, background refetching, and query state handling.
- **Zustand (v5):** Centralized lightweight global store for application-wide loading state (`useLoaderStore`).
- **Custom React Hooks:** Encapsulated data layer in `useCars` providing data, loading states, error handling, and manual refetching.
- **Centralized Toast Notifications:** Dynamic feedback system for network and simulated API errors.
- **Zero External Dependencies Required:** Local asynchronous mock API simulates realistic network delays and error states.

---

## Getting Started

### 1. Prerequisites
- **Node.js**: LTS version installed ([nodejs.org](https://nodejs.org/))
- **npm**: Included with Node.js

### 2. Installation & Running
```bash
# Navigate to the assignment folder
cd Assignment8_Zustand_TanStack_Data_Fetching

# Install dependencies
npm install

# Start development server
npm run dev
```

Open the local Vite URL (typically `http://localhost:5173`) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## Features & Verification Checklist
1. **Interactive Filter:** Filter car inventory by brand (Tesla, BMW, Toyota, Hyundai).
2. **Global Loading State:** Watch the header spinner and loading message triggered via the Zustand store.
3. **TanStack Query Caching:** Cached responses with 15-second `staleTime` and manual refetch capability.
4. **Error Handling:** Select "Simulate API error" in the dropdown to trigger the error card and centralized toast notification.
5. **Clean Architecture:** Components interact with the data layer strictly through the `useCars` custom hook.
