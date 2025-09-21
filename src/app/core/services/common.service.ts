import { Injectable } from '@angular/core';
import { WEATHER_TYPES } from '../common/constant';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const day = date.toLocaleDateString('en-US', options);

    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${day} ${hours} ${ampm}`;
  }

  getWeatherCondition(
    temp: number,
    precip: number,
    humidity: number,
    wind: number
  ): string {
    switch (true) {
      case temp >= 40:
        return WEATHER_TYPES.EXTREME_HOT;
      case temp <= -5:
        return WEATHER_TYPES.EXTREME_COLD;
      case precip > 10:
        return WEATHER_TYPES.HEAVY_RAIN;
      case precip >= 5 && wind > 20:
        return WEATHER_TYPES.THUNDERSTORM;
      case precip >= 1:
        if (temp <= 0) return WEATHER_TYPES.SNOWY;
        if (temp <= 2) return WEATHER_TYPES.SLEET_HAIL;
        return WEATHER_TYPES.RAINY;
      case humidity > 90 && temp < 15 && wind < 5:
        return WEATHER_TYPES.FOG;
      case humidity > 85:
        return WEATHER_TYPES.CLOUDY;
      case humidity > 70:
        return WEATHER_TYPES.MOSTLY_CLOUDY;
      case humidity > 60:
        return WEATHER_TYPES.PARTLY_CLOUDY;
      case wind > 20:
        return WEATHER_TYPES.WINDY;
      case temp >= 30:
        return WEATHER_TYPES.SUNNY;
      default:
        return WEATHER_TYPES.CLEAR;
    }
  }

  getWeatherImage(temp: number, condition: string): string {
    const cond = condition?.toLowerCase() || '';

    switch (true) {
      case cond.includes(WEATHER_TYPES.SUNNY.toLowerCase()):
      case cond.includes(WEATHER_TYPES.CLEAR.toLowerCase()):
        return 'assets/sun.png';

      case cond.includes(WEATHER_TYPES.PARTLY_CLOUDY.toLowerCase()):
        return 'assets/partly-cloudy.png';

      case cond.includes(WEATHER_TYPES.MOSTLY_CLOUDY.toLowerCase()):
      case cond.includes(WEATHER_TYPES.CLOUDY.toLowerCase()):
        return 'assets/cloud.png';

      case cond.includes(WEATHER_TYPES.FOG.toLowerCase()):
        return 'assets/fog.png';

      case cond.includes(WEATHER_TYPES.RAINY.toLowerCase()):
        return 'assets/rain.png';

      case cond.includes(WEATHER_TYPES.HEAVY_RAIN.toLowerCase()):
        return 'assets/heavy-rain.png';

      case cond.includes(WEATHER_TYPES.THUNDERSTORM.toLowerCase()):
        return 'assets/thunder.png';

      case cond.includes(WEATHER_TYPES.SNOWY.toLowerCase()):
      case cond.includes(WEATHER_TYPES.SLEET_HAIL.toLowerCase()):
        return 'assets/snow.png';

      case cond.includes(WEATHER_TYPES.WINDY.toLowerCase()):
        return 'assets/windy.png';

      case cond.includes(WEATHER_TYPES.EXTREME_HOT.toLowerCase()):
        return 'assets/extreme-hot.png';

      case cond.includes(WEATHER_TYPES.EXTREME_COLD.toLowerCase()):
        return 'assets/extreme-cold.png';

      default:
        if (temp >= 35) return 'assets/sun.png';
        if (temp >= 25) return 'assets/partly-cloudy.png';
        if (temp < 15) return 'assets/cold.png';
        return 'assets/sun.png';
    }
  }
}
