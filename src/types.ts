export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: DayForecast[];
  feelsLike?: number;
  windDirection?: string;
  uvIndex?: number;
  airQuality?: number;
  visibility?: number;
  pressure?: number;
  dewPoint?: number;
  precipitationChance?: number;
  alerts?: WeatherAlert[];
}

export interface DayForecast {
  day: string;
  condition: string;
  high: number;
  low: number;
  precipChance?: number;
  humidity?: number;
  windSpeed?: number;
  description?: string;
}

export interface WeatherAlert {
  type: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  title: string;
  description: string;
  expires: string;
}

export interface Resource {
  title: string;
  description: string;
  link: string;
  phone?: string;
}