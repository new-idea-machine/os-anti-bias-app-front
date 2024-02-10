import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  // Angular 17 - ensure to import ProvideHttpClient in app.config.ts file
  http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void{
    this.http.post< { user: User }>(
      'https://api.realworld.io/api/users',
      {
        user: this.form.getRawValue(),
      }
    ).subscribe(response => {
      console.log('response',response)
    })
  }
}
