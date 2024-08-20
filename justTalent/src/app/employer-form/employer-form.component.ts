import { Component, Input, OnInit, Output } from '@angular/core';
import { Employer } from '../interfaces/employer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployerService } from '../services/employer.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employer-form.component.html',
  styleUrl: './employer-form.component.css'
})
export class EmployerFormComponent implements OnInit {
  employer: Employer | undefined;
  employerForm: FormGroup;
  @Output() cancelEdit = new EventEmitter();

  constructor(
    private fb:FormBuilder,
    private employerService: EmployerService,
  ){
    this.employerForm = this.fb.group({
      employer_name: ['', Validators.required],
      description: [''],
      number_of_employees: ['', [Validators.required, Validators.min(1)]],
      contact_name: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      established_date: ['', Validators.required],
      created_at: ['', Validators.required],
      modified_at: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCurrentUserEmployerInfo();
  }

  populateForm(employer: Employer){
    this.employerForm.patchValue({
      employer_name: employer.employer_name,
      description: employer.description,
      number_of_employees: employer.number_of_employees,
      contact_name: employer.contact_name,
      contact_email: employer.contact_email,
      established_date: employer.established_date,
      created_at: employer.created_at,
      modified_at: employer.modified_at,
    })
  }

  getCurrentUserEmployerInfo(): void {
    this.employerService.getCurrentUserEmployerInfo()
      .subscribe((employer: Employer) => {
        this.employer = employer;
        this.populateForm(employer);
      });
  }

  employerFormSubmit(updatedEmployer: Employer): void {
    this.employerService.updateEmployer(updatedEmployer).subscribe(() => {
      this.employer = updatedEmployer;
      this.cancelEdit.emit();
    })
  }

  onSubmit(): void {

    if(this.employerForm.valid){
      const updatedEmployer = {
        ...this.employer,
        ...this.employerForm.value
      };
      this.employerFormSubmit(updatedEmployer);
    } else {
      this.employerForm.markAllAsTouched();
    }


  }

  cancelEditMode(): void{
    this.cancelEdit.emit();
  }

}
