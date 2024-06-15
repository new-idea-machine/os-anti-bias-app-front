import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Resume } from '../interfaces/resume';
import { ResumeService } from '../services/resume.services';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ResumeComponent } from '../resume/resume.component';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ResumeComponent],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit{
  user: any | undefined;
  resume: Resume | undefined;

  isEditMode:boolean = false;
  // Non-null assertion operator used here
  resumeForm!: FormGroup;

  constructor(
    private userService: UserService,
    private resumeService: ResumeService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getCurrentUserResume();
    this.initializeForm();

  }

  parseDate(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
  }

  // EDIT BUTTON TOGGLER
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && this.resume) {
      this.populateForm(this.resume); // Update form with resume data
    }
  }

  // Populate form with resume data
  populateForm(resume: Resume): void {
    this.resumeForm.patchValue({
      title: resume.title,
      summary: resume.summary,
      // Populate other form controls as needed
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
      this.resumeService.updateResume(updatedResume).subscribe(()=>{
        this.resume = updatedResume;
        this.toggleEditMode();
      })

    }
  }

  // Initialize the form with default values
  initializeForm(): void {
    this.resumeForm = this.fb.group({
      title: [this.resume?.title || ''],
      summary: [this.resume?.summary || ''],
      // Add other form controls as needed
    });
  }

  getCurrentUserDetails(): void {
    this.userService.getCurrentUser()
      .subscribe((user: any) => {
      this.user= user.user;
    })
  }

  getCurrentUserResume(): void {
    this.resumeService.getCurrentUserResume()
      .subscribe((resume: Resume) => {
        this.resume = resume;
        console.log(resume, '🚨')
      })
  }
}
