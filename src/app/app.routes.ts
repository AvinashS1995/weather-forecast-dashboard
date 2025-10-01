import { Routes } from '@angular/router';
import { WeatherPageComponent } from './pages/weather-page/weather-page.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'weather',
        component: WeatherPageComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'weather' },
];
