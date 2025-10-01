import { Injectable } from '@angular/core';
import { WEATHER_CODE_MAP, WEATHER_IMAGE_MAP } from '../common/constant';

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
    return WEATHER_CODE_MAP[weatherCode];
  }

  getWeatherImageByCode(weatherCode: number): string {
    return WEATHER_IMAGE_MAP[weatherCode] || 'assets/sun.png';
  }
}
