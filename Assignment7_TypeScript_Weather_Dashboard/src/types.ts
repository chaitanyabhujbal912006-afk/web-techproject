export interface GeoLocation {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: number;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
  precipitationProbability: number;
}

export interface WeatherDashboardData {
  location: GeoLocation;
  current: CurrentWeather;
  daily: DailyForecast[];
}

export type ApiState<T> =
  | { status: "idle" }
  | { status: "loading"; message: string }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

export interface GeocodingResponse {
  results?: Array<{
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
  }>;
}

export interface ForecastResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}