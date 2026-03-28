# Weather Forecast Dashboard

A responsive Angular 18 dashboard that aggregates weather data, autocomplete city search, and sun/moon tracking into a recruiter-friendly single page experience.

![Angular 18.2.0](https://img.shields.io/badge/Angular-18.2.0-red)
![Build Status](https://img.shields.io/badge/build-local-success?logo=github)
![License](https://img.shields.io/badge/license-UNLICENSED-red)
![Tailwind CSS 3.4.17](https://img.shields.io/badge/Tailwind_CSS-3.4.17-blue?logo=tailwindcss)
![Flowbite 3.1.2](https://img.shields.io/badge/Flowbite-3.1.2-purple)
![Font Awesome 7](https://img.shields.io/badge/Font_Awesome-7.0.1-black?logo=fontawesome)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Demo / Deployment](#demo--deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author / Contact](#author--contact)

## Features

- **Dashboard shell** built with a sticky `NavbarComponent`, responsive footer, and routed `WeatherPageComponent` inside `DashboardComponent` to keep experience consistent across viewport sizes.
- **City search with autocomplete** that debounces input in `NavbarComponent`, queries `weather/search-city`, and pushes the result into the `ApiService`'s `BehaviorSubject` so every widget reacts automatically.
- **Geolocation fallback** (via `navigator.geolocation`) that resolves the current city through `weather/get-current-location`, auto-populates the search box, and triggers the same live data flow.
- **Weather summary card** showing current temperature, condition, feels-like, and dynamically updated clock with data derived from `WeatherPageComponent`’s `weatherData` structure.
- **Metric grid** immediately below the card for air quality, wind, humidity, visibility, pressure, and UV index all backed by the hourly/minutely forecasts returned from the backend.
- **Forecast list tabs** (`Today Forecast` vs `10 Days Forecast`) implemented in `ForecastListComponent`, including display time formatting, condition labels, and icon selection from `CommonService`'s weather code map.
- **Sun & moon animation** computing arc positions from sunrise/sunset/next day sunrise, constantly updated via `interval` to keep the SVG indicator fresh and color-coded depending on day or night.
- **Shared pipes/services**: `CommonService` formats timestamps, maps weather codes to conditions/images, and `SharedModule` centralizes common Angular imports for standalone components.
- **API service architecture** with named endpoints (`API_ENDPOINTS`), environment-based `apiUrl`, and observables for city state, search visibility, and HTTP POST calls for weather, city search, and current location.
- **Tailwind + Flowbite + FontAwesome** for rapid UI composition, while weather icons live under `public/assets` so the forecast visuals match the mapped conditions.
- **Zone-aware bootstrap config** that uses `provideZoneChangeDetection` with event coalescing and `provideHttpClient(withFetch())` for modern HTTP interactions.

## Tech Stack

- **Framework:** Angular 18.2.0 (standalone components, router, HttpClient), Angular CLI 18.2.12, RxJS 7.8.0, Zone.js 0.14.10, TypeScript 5.5.2.
- **Styling & UI:** Tailwind CSS 3.4.17, Flowbite 3.1.2 (Tailwind plugin + script entry), FontAwesome 7.0.1, custom weather icon set under `public/assets`.
- **Build & Tooling:** `@angular-devkit/build-angular`, Karma + Jasmine for tests, Angular ESLint linting, npm scripts (`start`, `build`, `watch`, `test`).
- **Utilities:** Shared services (`CommonService`, `ApiService`), constants for API endpoints, and `app.config.ts` with change-detection + router + HTTP providers.

## Installation and Setup

### Prerequisites

- Node.js 18.x or newer (match the TypeScript/Angular compatibility matrix).
- npm (Node package manager) for scripts and dependency installation.
- Optional but recommended: a locally running backend at `http://localhost:3000/api/` or adjust `src/environments/environment.ts` to point to your real API.

### Getting Started

```bash
# clone the repo (replace <repo-url> with the actual repository link)
git clone <https://github.com/AvinashS1995/weather-forecast-dashboard.git>
cd weather-forecast-dashboard

# install dependencies
npm install
```

1. Update `src/environments/environment.ts` (and the production counterpart) with your backend URL if it differs from the default `http://localhost:3000/api/`.
2. Ensure the backend exposes the POST endpoints defined in `src/app/core/common/api-constant.ts` (`weather/get-weather`, `weather/search-city`, `weather/get-current-location`).
3. Tailwind/Flowbite is preconfigured in `tailwind.config.js` and referenced via `angular.json`'s `styles`/`scripts`, so no extra setup is required beyond `npm install`.

## Usage

```bash
npm start           # serves the dashboard at http://localhost:4200 (default Angular dev server)
npm run build       # creates a production bundle in dist/weather-forecast-dashboard
npm test            # runs Karma + Jasmine unit tests
npm run watch       # rebuilds on change with development configuration
```

- Use the search box (or current location button) to fetch a city; the navbar emits the selection and `WeatherPageComponent` requests the backend via `ApiService.getWeather`.
- The live preview card and forecast list will update automatically thanks to shared observables and the reactive `weatherData` object.
- Running `npm run build -- --configuration=production` prepares the bundle for deployment; ensure `src/environments/environment.prod.ts` contains your production API base.

## Folder Structure

```
src/app/
├── app.component.ts          # host of the router outlet + shared modules
├── app.routes.ts            # dashboard layout + weather route
├── app.config.ts            # zone change detection + router + HttpClient providers
├── core/
│   ├── common/
│   │   ├── api-constant.ts  # endpoint map
│   │   ├── constant.ts      # weather code + icon maps
│   │   └── shared-module.ts # CommonModule, FormsModule, ReactiveFormsModule bundle
│   └── services/
│       ├── api.service.ts   # BehaviorSubjects, API calls
│       └── common.service.ts# formatting helpers
├── layout/
│   ├── dashboard/           # router-outlet wrapper, navbar, footer
│   ├── navbar/              # search bar, autocomplete, geolocation, toggle hooks
│   └── footer/              # brand info, contact, social links
└── pages/
    ├── weather-page/        # orchestrates data, sun/moon animation, stats
    ├── weather-card/        # current weather headline card
    └── forecast-list/       # tabbed today + 10-day lists
src/environments/             # dev/prod API URLs
public/assets/                # weather icons + logo
```

## Demo / Deployment

- **Live Demo (placeholder):** [https://weather-forecast-dashboard-theta.vercel.app/weather](https://weather-forecast-dashboard-theta.vercel.app/weather)
- **Preview Screenshot (add to repo and update link):** ![App preview](SCREENSHOT_LINK)
- **Deployment notes:** run `npm run build -- --configuration=production`, then serve `dist/weather-forecast-dashboard` with your chosen host (Vercel, Netlify, Firebase, etc.).

## Contributing

1. Fork the repository and create branches off `main` like `feature/<short-description>` or `fix/<issue-number>`.
2. Install dependencies (`npm install`) and keep `package-lock.json` in sync.
3. Run `npm run test` (and `npm run lint` if the environment supports Angular ESLint) before pushing.
4. Submit a pull request with a clear summary, testing steps, and highlight any configuration changes (especially environment URLs or assets).
5. Keep commits focused on a single concern and split large changes across multiple PRs when possible.

## License

This project is currently **UNLICENSED**. Add a `LICENSE` file or update the metadata before publishing externally.

## Author / Contact

- **Avinash Suryawanshi**
- Email: suryawanshiavinash18@gmail.com
- Phone: +91 9096683915
- LinkedIn: https://www.linkedin.com/in/your-linkedin
- GitHub: https://github.com/<your-github-username>

Feel free to reach out for collaboration, API integration help, or UI tweaks.
