import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { response } from 'express';

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

  ngOnInit(): void {
    this.http.get<{user: User}>('https://api.realworld.io/api/user').subscribe(response => {
        console.log('response', response)
      }
    )
  }

  logout(): void {
    console.log('logout')
  }
}
