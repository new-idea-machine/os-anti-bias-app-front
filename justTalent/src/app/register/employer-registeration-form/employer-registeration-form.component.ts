import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-registeration-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employer-registeration-form.component.html',
  styleUrl: './employer-registeration-form.component.css'
})
export class EmployerRegisterationFormComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  // CREATE EMPLOYER AUTH

  router = inject(Router);


  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    contact_email: ['', Validators.required],
    password: ['', Validators.required],
  });

  endpoint = 'http://localhost:3000/api/employers';

  onSubmit(): void {
    //Store a token to local storage
    //set a signal/state management
    //Redirect to a main page
  }

}
