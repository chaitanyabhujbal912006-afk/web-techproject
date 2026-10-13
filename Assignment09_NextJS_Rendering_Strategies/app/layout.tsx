import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "RenderLab | Next.js Rendering Strategies", description: "Blog demonstrating SSG, ISR, SSR and React Server Components." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}