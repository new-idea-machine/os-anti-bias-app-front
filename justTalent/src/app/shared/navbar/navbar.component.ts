import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  http = inject(HttpClient);

  endpoint = 'http://localhost:3000/api/users';
  // endpoint = 'https://api.realworld.io/api/users';

  ngOnInit(): void {
    //Keep the code below here or move to app.component.ts?
    this.http
      .get<{user: User}>(this.endpoint)
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.authService.currentUserSignal.set(response.user);
        },
        error: () => {
          this.authService.currentUserSignal.set(null);
        }
      })
  }

  logout(): void {
    console.log('logout');
    localStorage.setItem('token', '');
    this.authService.currentUserSignal.set(null);
  }
}
