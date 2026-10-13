import { appConfig } from "./config";
import type { ApiState, WeatherDashboardData } from "./types";
import { findLocation, getWeather, weatherLabel } from "./weather";
import "./style.css";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("App root element was not found.");

let state: ApiState<WeatherDashboardData> = { status: "idle" };

function render(): void {
  root.innerHTML = `
    <main class="shell">
      <header class="topbar">
        <a class="brand" href="#" aria-label="SkyCast home"><span class="brand-mark">✦</span> SkyCast</a>
        <span class="live-pill"><span></span> LIVE WEATHER</span>
      </header>
      <section class="intro">
        <p class="eyebrow">YOUR PERSONAL WEATHER STATION</p>
        <h1>Forecast your <span>next move.</span></h1>
        <p class="subtitle">Real-time conditions and a five-day outlook, wherever you are.</p>
      </section>
      <form id="search-form" class="searchbar">
        <span class="search-icon">⌕</span>
        <input id="city-input" name="city" type="search" placeholder="Search a city, e.g. Pune" value="${escapeHtml(appConfig.defaultCity)}" aria-label="City name" required />
        <button type="submit">Search <span>→</span></button>
      </form>
      <section id="weather-content" aria-live="polite">${renderState(state)}</section>
      <footer>Powered by Open-Meteo · Built with strict TypeScript</footer>
    </main>
  `;
  document.querySelector<HTMLFormElement>("#search-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector<HTMLInputElement>("#city-input");
    const city = input?.value.trim();
    if (city) void loadWeather(city);
  });
}

function renderState(currentState: ApiState<WeatherDashboardData>): string {
  switch (currentState.status) {
    case "idle":
      return `<div class="notice">Search for a city to see its weather.</div>`;
    case "loading":
      return `<div class="notice loading"><span class="spinner"></span><div><strong>Reading the skies…</strong><p>${escapeHtml(currentState.message)}</p></div></div>`;
    case "error":
      return `<div class="notice error"><strong>Weather unavailable</strong><p>${escapeHtml(currentState.message)}</p></div>`;
    case "success":
      return renderDashboard(currentState.data);
    default: {
      const exhaustiveCheck: never = currentState;
      return exhaustiveCheck;
    }
  }
}

function renderDashboard(data: WeatherDashboardData): string {
  const now = weatherLabel(data.current.weatherCode);
  const dailyCards = data.daily.map((day, index) => {
    const condition = weatherLabel(day.weatherCode);
    const date = new Date(`${day.date}T12:00:00`).toLocaleDateString("en-IN", {
      weekday: "short", day: "numeric", month: "short"
    });
    return `<article class="day-card">
      <p class="day-name">${index === 0 ? "Today" : date}</p>
      <div class="day-icon">${condition.icon}</div>
      <p class="day-condition">${condition.label}</p>
      <div class="temps"><strong>${Math.round(day.maxTemperature)}°</strong><span>${Math.round(day.minTemperature)}°</span></div>
      <p class="rain">☂ ${day.precipitationProbability}% rain</p>
    </article>`;
  }).join("");

  return `
    <section class="current-card">
      <div class="current-copy">
        <p class="location-line">📍 ${escapeHtml(data.location.name)}${data.location.country ? `, ${escapeHtml(data.location.country)}` : ""}</p>
        <p class="condition">${now.label}</p>
        <div class="temperature">${Math.round(data.current.temperature)}<span>°C</span></div>
        <p class="feels">Feels like ${Math.round(data.current.apparentTemperature)}°C</p>
      </div>
      <div class="weather-art" aria-hidden="true">${now.icon}</div>
      <div class="metric-row">
        <div class="metric"><span>HUMIDITY</span><strong>${data.current.relativeHumidity}%</strong></div>
        <div class="metric"><span>WIND SPEED</span><strong>${Math.round(data.current.windSpeed)} km/h</strong></div>
        <div class="metric"><span>DAYLIGHT</span><strong>${data.current.isDay ? "Daytime" : "Night"}</strong></div>
      </div>
    </section>
    <section class="forecast-section">
      <div class="section-heading"><div><p class="eyebrow">PLAN AHEAD</p><h2>5-day forecast</h2></div><span class="forecast-tag">NEXT 5 DAYS</span></div>
      <div class="forecast-grid">${dailyCards}</div>
    </section>`;
}

async function loadWeather(city: string): Promise<void> {
  state = { status: "loading", message: `Looking up ${city} and loading forecast data.` };
  render();
  try {
    const location = await findLocation(city);
    const data = await getWeather(location);
    state = { status: "success", data };
  } catch (error: unknown) {
    state = {
      status: "error",
      message: error instanceof Error ? error.message : "An unexpected error occurred."
    };
  }
  render();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character] ?? character);
}

render();
void loadWeather(appConfig.defaultCity);