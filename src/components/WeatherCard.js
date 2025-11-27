// src/components/WeatherCard.js
import React from 'react';

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

export default function WeatherCard({ data, units }) {
  const { name, sys, main, weather, wind, clouds, visibility, rain, snow } = data;
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="city">{name}, {sys?.country}</h2>
          <p className="conditions">
            {weather?.map((w, i) => (
              <span key={i} className="condition-item">
                {w.main} — {w.description}
              </span>
            ))}
          </p>
        </div>
        {weather?.[0]?.icon && (
          <img
            className="icon"
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
          />
        )}
      </div>

      <div className="grid">
        <InfoItem label="Temperature" value={`${main?.temp}${tempUnit}`} />
        <InfoItem label="Feels like" value={`${main?.feels_like}${tempUnit}`} />
        <InfoItem label="Min/Max" value={`${main?.temp_min}${tempUnit} / ${main?.temp_max}${tempUnit}`} />
        <InfoItem label="Humidity" value={`${main?.humidity}%`} />
        <InfoItem label="Pressure" value={`${main?.pressure} hPa`} />
        <InfoItem label="Wind" value={`${wind?.speed} ${speedUnit} at ${wind?.deg}°`} />
        {wind?.gust && <InfoItem label="Gust" value={`${wind.gust} ${speedUnit}`} />}
        <InfoItem label="Clouds" value={`${clouds?.all}%`} />
        <InfoItem label="Visibility" value={`${visibility} m`} />
        {rain?.['1h'] && <InfoItem label="Rain (1h)" value={`${rain['1h']} mm`} />}
        {snow?.['1h'] && <InfoItem label="Snow (1h)" value={`${snow['1h']} mm`} />}
      </div>
    </section>
  );
}
