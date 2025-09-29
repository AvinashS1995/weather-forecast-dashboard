import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css',
})
export class WeatherCardComponent {
  @Input() weather: any;
  currentTime: string = '';

  todayHourly: any;
  todayDaily: any;

  constructor() {
    console.log(this.weather);
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);
  }

  updateTime() {
    const now = new Date();

    const day = now.toLocaleDateString('en-US', { weekday: 'long' });

    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    this.currentTime = `${day} ${time}`;
  }
}
