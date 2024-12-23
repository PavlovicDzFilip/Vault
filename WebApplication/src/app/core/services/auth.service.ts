import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #httpClient = inject(HttpClient);

  login(token: string) {
    return this.#httpClient.post(`/login/${token}`, {});
  }

  logout() {
    return this.#httpClient.post('/logout', {});
  }
}
