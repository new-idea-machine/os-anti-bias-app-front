import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Resume } from '../interfaces/resume';
import { EventEmitter } from '@angular/core';
import { ContactInformationFormComponent } from './contact-information-form/contact-information-form.component';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactInformationFormComponent
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css'
})
export class ResumeFormComponent implements OnInit {
  @Input() resume: Resume | undefined;
  @Output() formSubmitted = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  // Non-null assertion operator used here
  resumeForm!: FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    if(this.resume){
      this.populateForm(this.resume);
    }
  }

  // Initialize the form with default values
  initializeForm(): void {
    this.resumeForm = this.fb.group({
      title: [this.resume?.title || ''],
      summary: [this.resume?.summary || ''],
      contactInformation: this.fb.group({
        phoneNumber: [''],
        emailAddress: [''],
        linkedInProfile: [''],
        otherSocialMedia: ['']
      }),

    });
  }

  // Populate form with resume data
  populateForm(resume: Resume): void {
    this.resumeForm.patchValue({
      title: resume.title,
      summary: resume.summary,
      contactInformation: resume.contactInformation,
    });
  }

  //FORM SUBMIT HANDLER
  onSubmit(): void {
    // Check if the form is valid before proceeding
    if (this.resumeForm.valid) {
      // Update the resume object with form values
      const updatedResume= {
        ...this.resume,
        ...this.resumeForm.value
      };
      this.formSubmitted.emit(updatedResume);

    }
  }

  cancelEditMode(): void {
    this.cancelEdit.emit();
  }


}
