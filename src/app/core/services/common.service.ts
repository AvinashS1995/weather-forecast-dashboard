import { Injectable } from '@angular/core';
import { WEATHER_CODE_MAP, WEATHER_TYPES } from '../common/constant';

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

  formatTime(dateStr: string, isDaily: boolean = false): string {
    const date = new Date(dateStr);
    const today = new Date();

    if (isDaily) {
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth()
      ) {
        return `Today ${date.getDate()}/${date.getMonth() + 1}`;
      } else {
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        return `${day} ${date.getDate()}/${date.getMonth() + 1}`;
      }
    } else {
      let hours = date.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours} ${ampm}`;
    }
  }

  formatTimeTo12Hour(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  getWeatherConditionByCode(weatherCode: number): string {
    return WEATHER_CODE_MAP[weatherCode] || WEATHER_TYPES.CLEAR;
  }

  getWeatherImageByCode(weatherCode: number): string {
    const condition =
      this.getWeatherConditionByCode(weatherCode)?.toLowerCase();

    switch (true) {
      case condition.includes('sunny') || condition.includes('clear'):
        return 'assets/sun.png';
      case condition.includes('partly cloudy'):
        return 'assets/partly-cloudy.png';
      case condition.includes('mostly cloudy'):
        return 'assets/mostly-cloudy.png';
      case condition.includes('cloudy'):
        return 'assets/cloud.png';
      case condition.includes('fog'):
        return 'assets/fog.png';
      case condition.includes('rain'):
        return 'assets/rain.png';
      case condition.includes('heavy rain'):
        return 'assets/heavy-rain.png';
      case condition.includes('thunderstorm'):
        return 'assets/thunder.png';
      case condition.includes('snow') || condition.includes('sleet'):
        return 'assets/snow.png';
      case condition.includes('windy'):
        return 'assets/windy.png';
      case condition.includes('extreme hot'):
        return 'assets/extreme-hot.png';
      case condition.includes('extreme cold'):
        return 'assets/extreme-cold.png';
      default:
        return 'assets/sun.png';
    }
  }
}
