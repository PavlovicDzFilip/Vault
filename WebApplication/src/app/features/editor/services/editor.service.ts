import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '@core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  #httpClient = inject(HttpClient);
  #configService = inject(ConfigService);

  getEditorContent() {
    return this.#httpClient.get(`${this.#configService.getApiUrl()}/editor`);
  }
}
