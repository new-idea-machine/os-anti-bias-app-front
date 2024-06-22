import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Resume } from '../interfaces/resume';
import { EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})


export class ResumeFormComponent implements OnInit {
  @Input() resume: Resume | undefined;
  @Output() formSubmitted = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  resumeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      resume_id: [''],
      title: [''],
      summary: [''],
      skills: this.fb.array([]),
      education: this.fb.array([]),
      contactInformation: this.fb.group({
        phoneNumber: [''],
        emailAddress: [''],
        linkedInProfile: [''],
        otherSocialMedia: ['']
      })
    });
  }

  ngOnInit() {
    if (this.resume) {
      this.populateForm(this.resume);
    } else {
      this.addSkill();
      this.addEducation();
    }

  }

  populateForm(resume: Resume) {
    this.resumeForm.patchValue({
      resume_id: resume.resume_id,
      title: resume.title,
      summary: resume.summary,
      contactInformation: resume.contactInformation
    });

    resume.skills.forEach(skill => this.skills.push(this.fb.control(skill)));
    resume.education.forEach(edu => this.education.push(this.fb.group({
      degree: [edu.degree, Validators.required],
      school: [edu.school, Validators.required],
      major: [edu.major, Validators.required],
      graduationYear: [edu.graduationYear, Validators.required]
    })));
  }

  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }


  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  addEducation() {
    this.education.push(this.fb.group({
      degree: ['', Validators.required],
      school: ['', Validators.required],
      major: ['', Validators.required],
      graduationYear: [null, Validators.required]
    }));
  }

  //FORM SUBMIT HANDLER
  onSubmit(): void {
    // Check if the form is valid before proceeding
    // Skills Array - remove empty string


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






