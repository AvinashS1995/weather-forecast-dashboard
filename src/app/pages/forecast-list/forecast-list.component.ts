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
      const now = new Date();
      const todayDateStr = now.toISOString().split('T')[0];

      this.filteredHours = this.weather.forecast.hourly
        .filter((h: any) => {
          const hourDate = new Date(h.time);
          return (
            hourDate.toISOString().split('T')[0] === todayDateStr &&
            hourDate.getTime() >= now.getTime()
          );
        })
        .map((h: any) => ({
          ...h,
          image: this.commonService.getWeatherImageByCode(h.weather_code),
          displayTime: h.hourDateTime,
        }));
    } else {
      this.filteredHours =
        this.weather.forecast.daily?.map((d: any) => ({
          ...d,
          displayTime: d.dailyDateTime,
          image: this.commonService.getWeatherImageByCode(d.weather_code),
        })) || [];
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.updateFilteredHours();
  }
}
