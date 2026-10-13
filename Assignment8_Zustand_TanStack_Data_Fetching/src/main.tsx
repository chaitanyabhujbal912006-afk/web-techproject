import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLoaderStore } from "./stores/loaderStore";
import { ToastProvider } from "./components/ToastProvider";
import { useCars } from "./hooks/useCars";
import "./style.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 15_000, retry: 0 } } });

function CarsDashboard() {
  const [brand, setBrand] = useState("");
  const { cars, refetchCars, errorCars } = useCars({ filterObject: brand ? { id: brand } : undefined, active: true });
  const isLoading = useLoaderStore((state) => state.isLoading);
  return <main className="shell">
    <header><div className="brand-mark">A</div><div><p className="eyebrow">SMART DATA LAYER</p><h1>Auto<span>Flow</span></h1></div><div className="pill"><i/> ZUSTAND + TANSTACK QUERY</div></header>
    <section className="hero"><p className="eyebrow">ASSIGNMENT 08 · WEB TECHNOLOGY</p><h2>Data fetching, <span>without the boilerplate.</span></h2><p>One reusable hook handles data, loading, errors and refetching — keeping components focused on UI.</p></section>
    <section className="toolbar"><div><label htmlFor="brand">Filter by brand</label><select id="brand" value={brand} onChange={e=>setBrand(e.target.value)}><option value="">All active cars</option><option value="Tesla">Tesla</option><option value="BMW">BMW</option><option value="Toyota">Toyota</option><option value="Hyundai">Hyundai</option><option value="error">Simulate API error</option></select></div><button onClick={()=>void refetchCars()} className="refresh">↻ Refetch data</button></section>
    {isLoading && <div className="loading"><span className="spinner"/> Loading car data…</div>}
    {errorCars && <div className="error-card"><strong>Could not load cars</strong><p>The centralized error hook displays a toast notification. Choose another filter or refetch.</p></div>}
    {!isLoading && !errorCars && <section className="car-grid">{(cars ?? []).map(car=><article className="car-card" key={car.id}><div className="car-icon">🚘</div><span className="year">{car.year}</span><h3>{car.brand} {car.model}</h3><p>Active inventory</p><div className="price">${car.price.toLocaleString("en-US")}</div><span className="available">● Available</span></article>)}</section>}
    <section className="code-note"><div><p className="eyebrow">THE COMPONENT API</p><h3>One line. Four capabilities.</h3></div><pre><code>{"const { cars, refetchCars } = useCars({ filterObject: selectedBrand, active });"}</code></pre><ul><li>Fetched data: <b>cars</b></li><li>Manual refetch: <b>refetchCars()</b></li><li>Global loading: <b>Zustand loader store</b></li><li>Error feedback: <b>central toast notifications</b></li></ul></section>
    <footer>Demo uses a local async mock API so it runs without a backend or API key.</footer>
  </main>;
}
function App(){return <QueryClientProvider client={queryClient}><ToastProvider><CarsDashboard/></ToastProvider></QueryClientProvider>}
createRoot(document.getElementById("root")!).render(<App/>);