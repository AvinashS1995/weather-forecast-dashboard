import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../common/api-constant';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;

  private citySource = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  city$ = this.citySource.asObservable();

  setCity(city: string) {
    this.citySource.next(city);
  }

  getWeather(payload: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${API_ENDPOINTS.SERVICE_GET_WEATHER}`,
      payload
    );
  }

  searchCity(payload: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${API_ENDPOINTS.SERVICE_SEARCH_CITY}`,
      payload
    );
  }

  getCuttentLocation(payload: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${API_ENDPOINTS.SERVICE_GET_CURRENT_LOCATION}`,
      payload
    );
  }
}
