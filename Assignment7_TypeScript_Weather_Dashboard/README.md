# Assignment 07 — TypeScript Weather Dashboard

A plain JavaScript-style weather dashboard refactored into strict TypeScript. It demonstrates:
- `strict: true` compiler checks
- Generic API helper `fetchJson<T>()`
- Discriminated union `ApiState<T>` for idle/loading/success/error states
- `as const satisfies` for a strongly checked application configuration
- Open-Meteo geocoding and forecast APIs (no API key required)

## Run locally
1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this folder and open it in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL printed by Vite (usually http://localhost:5173).

## Verify strict TypeScript
Run `npm run build`. It should finish without TypeScript errors.

## Screenshot checklist
1. Dashboard showing Pune current conditions and 5-day forecast.
2. Search a different city (e.g. Mumbai) and show the updated result.
3. Search a nonsense city name and show the friendly error state.
4. VS Code showing `ApiState<T>` in `src/types.ts`.
5. VS Code showing `fetchJson<T>()` in `src/weather.ts`.
6. VS Code showing `as const satisfies` in `src/config.ts`.
7. Terminal showing `npm run build` completed successfully.

Weather API data and availability require an internet connection.
