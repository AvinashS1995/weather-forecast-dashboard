import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_MODULES } from './core/common/shared-module';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SHARED_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-forecast-dashboard';

  ngOnInit(): void {
    if (!environment.production) {
      console.log('This will only appear in development');
    }
  }

  onSearchCity(city: string) {
    console.log('City searched:', city);
  }
}
