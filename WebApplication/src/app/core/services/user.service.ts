import { Injectable, signal } from '@angular/core';
import { User } from '@core/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #user = signal<User | null>(null);

  getUser() {
    return this.#user();
  }

  setUser(user: User) {
    this.#user.set(user);
  }

  isUserLoggedIn() {
    return this.#user() !== null;
  }

  clearUser() {
    this.#user.set(null);
  }

}
