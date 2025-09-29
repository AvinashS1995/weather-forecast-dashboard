// // src/app/core/constants/weather-constants.ts
// export const WEATHER_CODE_MAP: { [key: number]: string } = {
//   0: 'Clear Sky',
//   1: 'Mainly Clear',
//   2: 'Partly Cloudy',
//   3: 'Cloudy',
//   45: 'Fog',
//   48: 'Depositing Rime Fog',
//   51: 'Drizzle Light',
//   53: 'Drizzle Moderate',
//   55: 'Drizzle Dense',
//   56: 'Freezing Drizzle Light',
//   57: 'Freezing Drizzle Dense',
//   61: 'Rain Slight',
//   63: 'Rain Moderate',
//   65: 'Rain Heavy',
//   66: 'Freezing Rain Light',
//   67: 'Freezing Rain Heavy',
//   71: 'Snow Slight',
//   73: 'Snow Moderate',
//   75: 'Snow Heavy',
//   77: 'Snow Grains',
//   80: 'Rain Showers Slight',
//   81: 'Rain Showers Moderate',
//   82: 'Rain Showers Violent',
//   85: 'Snow Showers Slight',
//   86: 'Snow Showers Heavy',
//   95: 'Thunderstorm Slight/Moderate',
//   96: 'Thunderstorm with Slight Hail',
//   99: 'Thunderstorm with Heavy Hail'
// };

export const WEATHER_TYPES = {
  CLEAR: 'Clear',
  SUNNY: 'Sunny',
  PARTLY_CLOUDY: 'Partly Cloudy',
  MOSTLY_CLOUDY: 'Mostly Cloudy',
  CLOUDY: 'Cloudy',
  FOG: 'Fog',
  RAINY: 'Rainy',
  HEAVY_RAIN: 'Heavy Rain',
  THUNDERSTORM: 'Thunderstorm',
  SNOWY: 'Snowy',
  SLEET_HAIL: 'Sleet/Hail',
  WINDY: 'Windy',
  EXTREME_HOT: 'Extreme Hot',
  EXTREME_COLD: 'Extreme Cold',
};

export const WEATHER_CODE_MAP: { [key: number]: string } = {
  0: WEATHER_TYPES.CLEAR, // Clear sky → Sunny
  1: WEATHER_TYPES.SUNNY, // Mainly clear → Sunny
  2: WEATHER_TYPES.PARTLY_CLOUDY, // Partly cloudy
  3: WEATHER_TYPES.MOSTLY_CLOUDY, // Mostly cloudy
  45: WEATHER_TYPES.FOG, // Fog
  48: WEATHER_TYPES.FOG, // Depositing rime fog
  51: WEATHER_TYPES.RAINY, // Drizzle: Light
  53: WEATHER_TYPES.RAINY, // Drizzle: Moderate
  55: WEATHER_TYPES.RAINY, // Drizzle: Dense
  61: WEATHER_TYPES.RAINY, // Rain: Slight
  63: WEATHER_TYPES.RAINY, // Rain: Moderate
  65: WEATHER_TYPES.HEAVY_RAIN, // Rain: Heavy
  66: WEATHER_TYPES.HEAVY_RAIN, // Freezing rain: Light
  67: WEATHER_TYPES.HEAVY_RAIN, // Freezing rain: Heavy
  71: WEATHER_TYPES.SNOWY, // Snow fall: Slight
  73: WEATHER_TYPES.SNOWY, // Snow fall: Moderate
  75: WEATHER_TYPES.SNOWY, // Snow fall: Heavy
  77: WEATHER_TYPES.SLEET_HAIL, // Snow grains
  80: WEATHER_TYPES.RAINY, // Rain showers: Slight
  81: WEATHER_TYPES.HEAVY_RAIN, // Rain showers: Moderate
  82: WEATHER_TYPES.HEAVY_RAIN, // Rain showers: Violent
  95: WEATHER_TYPES.THUNDERSTORM, // Thunderstorm: Slight or moderate
  96: WEATHER_TYPES.THUNDERSTORM, // Thunderstorm with hail
  99: WEATHER_TYPES.THUNDERSTORM, // Thunderstorm with heavy hail
};
