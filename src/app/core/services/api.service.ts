import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../common/api-constant';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;

  private citySource = new BehaviorSubject<string>('');
  city$ = this.citySource.asObservable();

  private hideSearchSource = new Subject<void>();
  hideSearch$ = this.hideSearchSource.asObservable();

  constructor(private http: HttpClient) {}

  setCity(city: string) {
    this.citySource.next(city);
  }

  hideSearchBox() {
    this.hideSearchSource.next();
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
