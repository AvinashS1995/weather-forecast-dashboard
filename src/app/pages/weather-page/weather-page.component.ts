import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { SHARED_MODULES } from '../../core/common/shared-module';
import { ForecastListComponent } from '../forecast-list/forecast-list.component';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { CommonService } from '../../core/services/common.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [SHARED_MODULES, ForecastListComponent, WeatherCardComponent],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.css',
})
export class WeatherPageComponent {
  weatherData: any;
  filteredHours: any;
  todayHourly: any;

  sunPosition: { x: number; y: number } = { x: 0, y: 0 };
  moonPosition: { x: number; y: number } = { x: 0, y: 0 };
  arcColor: string = '#94a3b8';
  isDay: boolean = true;

  screenWidth: number = window.innerWidth;
  svgViewBox: string = '1 6 100 70';

  startLabel = ""; // 🌅 Sunrise or Sunset depending on time
  endLabel = "";

  private timerSub: Subscription | null = null;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.updateSvgViewBox();
    window.addEventListener('resize', this.onResize.bind(this));

    this.apiService.city$.subscribe((city) => {
      if (city) this.getWeather(city);
    });
  }

  getWeather(city: any) {
    this.apiService.getWeather({ city: city.city }).subscribe({
      next: (res: any) => {
        const data = res.data;

        const todayDate = new Date().toISOString().split('T')[0];
        const todayHourly = data.forecast.hourly.time.filter((time: any) => {
          return new Date(time).toDateString() === new Date().toDateString();
        });

        const hourly = data.forecast.hourly.time.map((t: string, i: number) => {
          const temp = data.forecast.hourly.temperature_2m[i];
          const wind = data.forecast.hourly.wind_speed_10m[i];
          const humidity = data.forecast.hourly.relative_humidity_2m[i];
          const precipitation = data.forecast.hourly.precipitation[i];
          const precipitation_probability =
            data.forecast.hourly.precipitation_probability[i];
          const apparent_temperature =
            data.forecast.hourly.apparent_temperature[i];
          const visibility = data.forecast.hourly.visibility[i];
          const weather_code = data.forecast.hourly.weather_code[i];

          return {
            time: t,
            hourDateTime: this.commonService.formatTime(t, false),
            temp,
            wind,
            humidity,
            precipitation,
            precipitation_probability,
            apparent_temperature,
            visibility,
            weather_code,
            condition:
              this.commonService.getWeatherConditionByCode(weather_code),
          };
        });

        const daily = data.forecast.daily.time.map((t: string, i: number) => {
          const appratent_temp_max =
            data.forecast.daily.apparent_temperature_max[i];
          const appratent_temp_min =
            data.forecast.daily.apparent_temperature_min[i];
          const temp_max = data.forecast.daily.temperature_2m_max[i];
          const temp_min = data.forecast.daily.temperature_2m_min[i];
          const daylight_duration = data.forecast.daily.daylight_duration[i];
          const sunrise = data.forecast.daily.sunrise[i];
          const sunset = data.forecast.daily.sunset[i];
          const uv_index_max = data.forecast.daily.uv_index_max[i];
          const weather_code = data.forecast.daily.weather_code[i];
          const wind = data.forecast.daily.windspeed_10m_max[i];
          const humidity = data.forecast.daily.relative_humidity_2m_max[i];
          return {
            time: t,
            dailyDateTime: this.commonService.formatTime(t, true),
            appratent_temp_max,
            appratent_temp_min,
            temp_max,
            temp_min,
            daylight_duration,
            sunrise: this.commonService.formatTimeTo12Hour(sunrise),
            sunset: this.commonService.formatTimeTo12Hour(sunset),
            sunriseRaw: sunrise,
            sunsetRaw: sunset,
            uv_index_max,
            weather_code,
            wind,
            humidity,
            condition:
              this.commonService.getWeatherConditionByCode(weather_code),
          };
        });

        const minutely_15 = data.forecast.minutely_15.time.map(
          (t: string, i: number) => {
            const apparent_temperature =
              data.forecast.minutely_15.apparent_temperature[i];
            const temp = data.forecast.minutely_15.temperature_2m[i];
            const weather_code = data.forecast.minutely_15.weather_code[i];
            const visibility = (
              data.forecast.minutely_15.visibility[i] / 1609
            ).toFixed(1);
            return {
              time: this.commonService.formatDate(t),
              apparent_temperature,
              temp,
              visibility,
              weather_code,
            };
          }
        );

        const today = {
          temperature: minutely_15?.[0]?.temp,
          temp_max: daily?.[0]?.temp_max,
          temp_min: daily?.[0]?.temp_min,
          apparent_temp: data.forecast.current.apparent_temperature,
          condition: hourly?.[0]?.condition,
          wind: hourly?.[0]?.wind || 0,
          humidity: hourly?.[0]?.humidity || 0,
          visibility: minutely_15?.[0]?.visibility || 0,
          pressure: data.forecast.current.surface_pressure || 0,
          uvIndex: daily?.[0]?.uv_index_max || 0,
          sunrise: daily?.[0]?.sunrise || '',
          sunset: daily?.[0]?.sunset || '',
          sunriseRaw: daily?.[0]?.sunriseRaw,
          sunsetRaw: daily?.[0]?.sunsetRaw,
          airQuality: data.forecast.airQuality?.label || 0,
          image: this.commonService.getWeatherImageByCode(
            minutely_15?.[0]?.weather_code
          ),
        };

        this.weatherData = {
          ...data,
          forecast: {
            ...data.forecast,
            hourly,
            minutely_15,
            todayHourly,
            daily,
            today,
          },
        };

        this.filteredHours = hourly;

        // Start Sun/Moon animation
        this.startSunMoonAnimation();

        this.apiService.hideSearchBox();
        console.log(this.weatherData);
      },
      error: (err) => console.error('Failed to fetch weather:', err),
    });
  }

  onResize() {
    this.screenWidth = window.innerWidth;
    this.updateSvgViewBox();
  }

  updateSvgViewBox() {
    this.svgViewBox = this.screenWidth < 640 ? '6 0 100 110' : '1 6 100 70';
  }

  startSunMoonAnimation() {
    this.updateSunMoonPosition();
    this.timerSub = interval(1000 * 60).subscribe(() =>
      this.updateSunMoonPosition()
    );
  }

 updateSunMoonPosition() {
  if (!this.weatherData?.forecast?.today) return;

  const sunrise = this.weatherData.forecast.today.sunriseRaw;
  const sunset = this.weatherData.forecast.today.sunsetRaw;
  const now = new Date();

  const nowTime = now.getTime();
  const srTime = new Date(sunrise).getTime();
  const ssTime = new Date(sunset).getTime();

  // tomorrow's sunrise (for night arc)
  const tomorrowSunrise = this.weatherData.forecast.daily[1]?.sunriseRaw;
  const tomorrowSrTime = tomorrowSunrise
    ? new Date(tomorrowSunrise).getTime()
    : srTime + 24 * 3600 * 1000;

  // Determine if it's day or night
  this.isDay = nowTime >= srTime && nowTime <= ssTime;

  if (this.isDay) {
    // 🌞 Sun progress: sunrise → sunset
    const sunProgress = this.calculateSunProgress(sunrise, sunset, now);
    this.sunPosition = this.getArcPoint(sunProgress, 40);
    this.arcColor = '#fbbf24'; // yellow arc

    // Labels: Sunrise on left, Sunset on right
    this.startLabel = `🌅 ${this.weatherData.forecast.today.sunrise}`;
    this.endLabel   = `🌇 ${this.weatherData.forecast.today.sunset}`;
  } else {
    // 🌙 Moon progress: sunset → tomorrow sunrise
    const moonProgress = this.calculateMoonProgress(sunset, tomorrowSunrise, now);
    this.moonPosition = this.getArcPoint(moonProgress, 40);
    this.arcColor = '#3b82f6'; // blue arc

    // Labels: Sunset on left, Sunrise (next day) on right
    this.startLabel = `🌇 ${this.weatherData.forecast.today.sunset}`;
    this.endLabel   = `🌅 ${this.weatherData.forecast.daily[1]?.sunrise || this.weatherData.forecast.today.sunrise}`;
  }
}

  calculateSunProgress(
    sunrise?: string,
    sunset?: string,
    currentTime: string | Date = new Date()
  ): number {
    if (!sunrise || !sunset) return 0;
    const now = new Date(currentTime).getTime();
    const sr = new Date(sunrise).getTime();
    const ss = new Date(sunset).getTime();
    if (now <= sr) return 0;
    if (now >= ss) return 100;
    return ((now - sr) / (ss - sr)) * 100;
  }

  calculateMoonProgress(
    sunset?: string,
    nextSunrise?: string,
    currentTime: string | Date = new Date()
  ): number {
    if (!sunset || !nextSunrise) return 0;
    const now = new Date(currentTime).getTime();
    const ss = new Date(sunset).getTime();
    const nsr = new Date(nextSunrise).getTime();
    if (now <= ss) return 0;
    if (now >= nsr) return 100;
    return ((now - ss) / (nsr - ss)) * 100;
  }

  getArcPoint(progress: number, radius = 40) {
    const angle = Math.PI * (progress / 100);
    const x = 50 - radius * Math.cos(angle);
    const y = 50 - radius * Math.sin(angle);
    return { x, y };
  }


  ngOnDestroy() {
    if (this.timerSub) this.timerSub.unsubscribe();
  }
}
