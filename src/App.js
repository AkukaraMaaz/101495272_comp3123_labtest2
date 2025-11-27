// src/App.js
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Footer from './components/Footer';
import './styles/theme.css';
import './styles/app.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const DEFAULT_CITY = process.env.REACT_APP_DEFAULT_CITY || 'Toronto';

export default function App() {
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [units, setUnits] = useState('metric'); // 'metric' (°C) or 'imperial' (°F)
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: '' });

  const fetchWeather = async (city = query, u = units) => {
    if (!API_KEY) {
      setStatus({ loading: false, error: 'Missing API key. Add REACT_APP_WEATHER_API_KEY to .env.' });
      setWeather(null);
      return;
    }
    setStatus({ loading: true, error: '' });
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=${u}&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.cod === 200) {
        setWeather(data);
        setStatus({ loading: false, error: '' });
      } else {
        throw new Error(data?.message || 'Failed to fetch');
      }
    } catch (err) {
      setWeather(null);
      setStatus({ loading: false, error: `Failed to fetch weather: ${err.message}` });
    }
  };

  useEffect(() => {
    fetchWeather(DEFAULT_CITY, units);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = () => fetchWeather(query, units);

  const onToggleUnits = () => {
    const nextUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(nextUnits);
    fetchWeather(query, nextUnits);
  };

  return (
    <div className="app">
      <Header />
      <div className="panel">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={onSearch}
          units={units}
          onToggleUnits={onToggleUnits}
        />

        {status.loading && (
          <div className="state state-loading">
            <div className="spinner" />
            <p>Fetching weather...</p>
          </div>
        )}

        {status.error && !status.loading && (
          <div className="state state-error">
            <p>{status.error}</p>
            <a
              href="https://openweathermap.org/faq#error401"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              Troubleshoot API keys
            </a>
          </div>
        )}

        {!status.loading && !status.error && weather && (
          <WeatherCard data={weather} units={units} />
        )}
      </div>
      <Footer />
    </div>
  );
}
