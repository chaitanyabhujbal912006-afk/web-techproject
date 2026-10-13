# Assignment 09 — Next.js Rendering Strategies

## Included strategies
- **SSG:** `/` blog list uses `dynamic = "force-static"`.
- **ISR:** `/posts/[id]` uses `generateStaticParams()` and `revalidate = 60`.
- **SSR:** `/dashboard` uses `dynamic = "force-dynamic"` and server-generated timestamp data.
- **React Server Components:** App Router pages are Server Components by default and fetch/read data on the server.
- **TTFB:** Use the browser Network panel or `curl -w` and record your own repeated measurements.

## Run locally
1. Install Node.js LTS.
2. Extract and open this folder in VS Code.
3. Terminal:
   ```bash
   npm install
   npm run build
   npm start
   ```
4. Open http://localhost:3000. For development, `npm run dev` is also available, but use the production server for performance measurements.

## TTFB measurement
Use production mode after `npm run build` and `npm start`. Warm up each route, then collect at least 5 samples per route using the same machine and network:
```bash
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s Total: %{time_total}s\n" http://localhost:3000/
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s Total: %{time_total}s\n" http://localhost:3000/posts/static-generation
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s Total: %{time_total}s\n" http://localhost:3000/dashboard
```
On Windows PowerShell, `curl` may be an alias; use `curl.exe` or the browser DevTools Network tab. The first request can include startup/cache warming, so repeat measurements and calculate the median. Record your actual values; results depend on your hardware, server, and network.

## Screenshot checklist
1. SSG home/blog list.
2. ISR individual post page with its revalidation tag.
3. SSR dashboard showing server render timestamp.
4. VS Code showing `export const dynamic = "force-static"`.
5. VS Code showing `export const revalidate = 60` and `generateStaticParams`.
6. VS Code showing `export const dynamic = "force-dynamic"`.
7. Terminal with successful production build/server.
8. TTFB measurements and completed report table.
