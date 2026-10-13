export const appConfig = {
  appName: "SkyCast",
  defaultCity: "Pune",
  apiBaseUrl: "https://geocoding-api.open-meteo.com/v1/search",
  weatherBaseUrl: "https://api.open-meteo.com/v1/forecast",
  forecastDays: 5,
  units: {
    temperature: "celsius",
    windSpeed: "kmh"
  },
  features: {
    showFeelsLike: true,
    showFiveDayForecast: true
  }
} as const satisfies {
  appName: string;
  defaultCity: string;
  apiBaseUrl: string;
  weatherBaseUrl: string;
  forecastDays: number;
  units: {
    temperature: "celsius" | "fahrenheit";
    windSpeed: "kmh" | "ms" | "mph" | "kn";
  };
  features: {
    showFeelsLike: boolean;
    showFiveDayForecast: boolean;
  };
};