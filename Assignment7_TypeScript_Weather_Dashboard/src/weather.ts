import { appConfig } from "./config";
import type {
  DailyForecast,
  ForecastResponse,
  GeoLocation,
  GeocodingResponse,
  WeatherDashboardData
} from "./types";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }
  return (await response.json()) as T;
}

export async function findLocation(city: string): Promise<GeoLocation> {
  const url = new URL(appConfig.apiBaseUrl);
  url.search = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json"
  }).toString();

  const result = await fetchJson<GeocodingResponse>(url.toString());
  const match = result.results?.[0];
  if (!match) {
    throw new Error(`No location found for "${city}". Try another city.`);
  }
  return {
    name: match.name,
    country: match.country,
    latitude: match.latitude,
    longitude: match.longitude
  };
}

export async function getWeather(location: GeoLocation): Promise<WeatherDashboardData> {
  const url = new URL(appConfig.weatherBaseUrl);
  url.search = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "weather_code",
      "is_day"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max"
    ].join(","),
    temperature_unit: appConfig.units.temperature,
    wind_speed_unit: appConfig.units.windSpeed,
    forecast_days: String(appConfig.forecastDays),
    timezone: "auto"
  }).toString();

  const result = await fetchJson<ForecastResponse>(url.toString());
  const daily: DailyForecast[] = result.daily.time.map((date, index) => ({
    date,
    weatherCode: result.daily.weather_code[index] ?? 0,
    maxTemperature: result.daily.temperature_2m_max[index] ?? 0,
    minTemperature: result.daily.temperature_2m_min[index] ?? 0,
    precipitationProbability: result.daily.precipitation_probability_max[index] ?? 0
  }));

  return {
    location,
    current: {
      temperature: result.current.temperature_2m,
      apparentTemperature: result.current.apparent_temperature,
      relativeHumidity: result.current.relative_humidity_2m,
      windSpeed: result.current.wind_speed_10m,
      weatherCode: result.current.weather_code,
      isDay: result.current.is_day
    },
    daily
  };
}

export function weatherLabel(code: number): { icon: string; label: string } {
  if (code === 0) return { icon: "☀️", label: "Clear sky" };
  if ([1, 2].includes(code)) return { icon: "🌤️", label: "Mainly clear" };
  if (code === 3) return { icon: "☁️", label: "Overcast" };
  if ([45, 48].includes(code)) return { icon: "🌫️", label: "Fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "🌦️", label: "Drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: "🌧️", label: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "❄️", label: "Snow" };
  if ([95, 96, 99].includes(code)) return { icon: "⛈️", label: "Thunderstorm" };
  return { icon: "🌡️", label: "Weather conditions" };
}