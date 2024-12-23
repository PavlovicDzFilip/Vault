import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  readonly token = input<string | undefined>(undefined, { alias: 'token' });

  email = signal<string>('');

  ngOnInit(): void {
    // fire event to login with token
  }
}
