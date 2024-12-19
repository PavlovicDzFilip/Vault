import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@core/config/tokens';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  #config = inject(APP_CONFIG);

  getApiUrl() {
    return this.#config.apiUrl;
  }

  isProduction() {
    return this.#config.production;
  }
}
