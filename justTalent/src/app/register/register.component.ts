import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { EmployerRegisterationFormComponent } from './employer-registeration-form/employer-registeration-form.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, EmployerRegisterationFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  // Angular 17 - ensure to import ProvideHttpClient in app.config.ts file
  http = inject(HttpClient);
  authService = inject(AuthService)
  router = inject(Router)
  isEmployer:boolean = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  endpoint = 'http://localhost:3000/api/users';
  // endpoint = 'https://api.realworld.io/api/users';

  onSubmit(): void{
    this.http.post< { user: User }>(
      this.endpoint,
      {
        user: this.form.getRawValue(),
      },
    ).subscribe(response => {
      console.log('response',response);
      //Store a user token in local storage
      localStorage.setItem('token', response.user.token);
      this.authService.currentUserSignal.set(response.user);
      this.router.navigateByUrl('/');
    })
  }

  toggleFormType(): void {
    this.isEmployer = !this.isEmployer;
  }
}
