import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';
import { ApiService } from '../../core/services/api.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Output() searchCity = new EventEmitter<string>();
  searchTerm: string = '';

  showMobileSearch: boolean = false;

  screenWidth: number = window.innerWidth;

  filteredCities: any[] = [];

  private $searchSubject = new Subject<string>();
  private $destroy = new Subject<void>();

  isDark = false;

  constructor(private apiService: ApiService, private elRef: ElementRef) {
    this.$searchSubject
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe((term) => {
        if (term.length < 2) {
          this.filteredCities = [];
          return;
        }
        this.apiService.searchCity({ city: term }).subscribe({
          next: (res) => (this.filteredCities = res.data.cities || []),
          error: (err) => console.error('City search failed', err),
        });
      });

    this.apiService.hideSearch$.subscribe(() => {
      this.showMobileSearch = false;
    });

    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      this.screenWidth < 640 &&
      this.showMobileSearch &&
      !this.elRef.nativeElement.contains(event.target)
    ) {
      this.showMobileSearch = false;
    }
  }

  ngOnInit() {
    this.useCurrentLocation(true);
  }

  onInputChange() {
    this.$searchSubject.next(this.searchTerm);
  }

  selectCity(city: any) {
    this.searchTerm = `${city.city}, ${city.country}`;
    this.filteredCities = [];
    this.searchCity.emit(city);
    this.apiService.setCity(city);
    console.log('Selected city:', city);
  }

  useCurrentLocation(emitEvent: boolean = false) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          this.apiService
            .getCuttentLocation(coords)
            .pipe(takeUntil(this.$destroy))
            .subscribe((res) => {
              if (res.status === 'success') {
                this.searchTerm = `${res.data.city}, ${res.data.country}`;
                this.filteredCities = [res.data];

                if (emitEvent) {
                  this.searchCity.emit(res.data);
                  this.apiService.setCity(res.data);
                  this.filteredCities = [];
                }
              }
            });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
