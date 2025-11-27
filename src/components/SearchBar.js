// src/components/SearchBar.js
import React from 'react';

export default function SearchBar({ value, onChange, onSubmit, units, onToggleUnits }) {
  return (
    <div className="searchbar">
      <input
        className="input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Toronto, London, Tokyo..."
      />
      <button className="btn btn-primary" onClick={onSubmit}>Search</button>
      <button className="btn btn-secondary" onClick={onToggleUnits}>
        {units === 'metric' ? '°C' : '°F'}
      </button>
    </div>
  );
}
