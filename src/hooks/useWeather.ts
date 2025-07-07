
import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  location: string;
}

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export const useWeather = (latitude: number | null, longitude: number | null) => {
  const [weather, setWeather] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeather = async () => {
      setWeather(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Using OpenWeatherMap API - you'll need to add your API key to Supabase secrets
        const API_KEY = 'your-openweathermap-api-key'; // This should come from Supabase secrets
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Weather data unavailable');
        }

        const data = await response.json();
        
        setWeather({
          data: {
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
            location: data.name,
          },
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Weather fetch error:', error);
        setWeather(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch weather data',
        }));
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return weather;
};
