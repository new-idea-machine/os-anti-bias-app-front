import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService)
  router = inject(Router)

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  endpoint = 'http://localhost:3000/api/users/login';

  onSubmit(): void{
    this.http.post< { user: User }>(
      this.endpoint,
      {
        user: this.form.getRawValue(),
      }
    ).subscribe(response => {
      console.log('response',response);
      //Store a user token in local storage
      localStorage.setItem('token', response.user.token);
      this.authService.currentUserSignal.set(response.user);
      this.router.navigateByUrl('/');
    })
  }
}
