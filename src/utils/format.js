// Kelvin to Celsius and Fahrenheit
export const kToC = (k) => (k - 273.15);
export const kToF = (k) => ((k - 273.15) * 9) / 5 + 32;

// Round with fixed decimals
export const round = (num, decimals = 1) => Number.parseFloat(num).toFixed(decimals);

// Icon URL from OpenWeatherMap icon code (e.g., 01n)
export const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

// Wind direction from degrees
export const windDir = (deg) => {
  const dirs = ['N','NE','E','SE','S','SW','W','NW','N'];
  return dirs[Math.round(deg / 45)];
};

// Local time from unix + timezone offset (seconds)
export const localTime = (unix, tzOffset) => {
  const d = new Date((unix + tzOffset) * 1000);
  return d.toUTCString().replace('GMT', '').trim();
};
