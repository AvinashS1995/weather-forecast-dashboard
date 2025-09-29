import { Component, Input, SimpleChanges } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.css',
})
export class ForecastListComponent {
  @Input() weather: any;

  filteredHours: any[] = [];

  tabs = ['Today Forecast', '10 Days Forecast'];
  selectedTab = 'Today Forecast';

  constructor(private commonService: CommonService) {
    console.log(this.weather);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weather']) {
      this.updateFilteredHours();
    }
  }

  private updateFilteredHours() {
    if (!this.weather?.forecast?.hourly) {
      this.filteredHours = [];
      return;
    }

    if (this.selectedTab === 'Today Forecast') {
      // // 🕒 Map hourly
      // this.filteredHours =
      //   this.weather.forecast.hourly?.map((h: any) => ({
      //     ...h,
      //     displayTime: h.hourDateTime, // already formatted: 12 AM, 1 AM...
      //     image: this.commonService.getWeatherImage(h.temp, h.condition),
      //   })) || [];

      const now = new Date();
      const todayDateStr = now.toISOString().split('T')[0]; // e.g., "2025-09-29"

      // Filter only today hours that are >= current time
      this.filteredHours = this.weather.forecast.hourly
        .filter((h: any) => {
          const hourDate = new Date(h.time);
          return (
            hourDate.toISOString().split('T')[0] === todayDateStr && // today only
            hourDate.getTime() >= now.getTime() // future + current hour
          );
        })
        .map((h: any) => ({
          ...h,
          image: this.commonService.getWeatherImageByCode(h.weather_code),
          displayTime: h.hourDateTime,
        }));
    } else {
      // 📅 Map daily
      this.filteredHours =
        this.weather.forecast.daily?.map((d: any) => ({
          ...d,
          displayTime: d.dailyDateTime, // already formatted: Today 29/9, Tue 30/9...
          image: this.commonService.getWeatherImageByCode(d.weather_code), // pick max temp for icon
        })) || [];
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.updateFilteredHours();
  }
}
