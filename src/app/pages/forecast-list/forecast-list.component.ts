import { Component, Input } from '@angular/core';
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

  constructor(private commonService: CommonService) {
    console.log(this.weather);
  }

  tabs = ['Today', 'Tomorrow', '10 Days'];
  selectedTab = 'Today';

  get filteredHours() {
    if (!this.weather?.forecast?.hourly) return [];
    console.log(this.weather);

    const hours = this.weather.forecast.hourly.map((h: any) => ({
      ...h,
      image: this.commonService.getWeatherImage(h.temp, h.condition),
    }));
    console.log(hours);

    if (this.selectedTab === 'Today') {
      return hours?.slice(0, 24);
    } else if (this.selectedTab === 'Tomorrow') {
      return hours.slice(24, 48);
    } else {
      return hours.slice(0, 240);
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
