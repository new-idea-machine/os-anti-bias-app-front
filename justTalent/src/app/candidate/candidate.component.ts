import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Resume } from '../interfaces/resume';
import { ResumeService } from '../services/resume.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumeComponent } from '../resume/resume.component';
import { ResumeFormComponent } from '../resume-form/resume-form.component';
import { EmployerFormComponent } from '../employer-form/employer-form.component';
import { Employer } from '../interfaces/employer';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ResumeComponent, ResumeFormComponent, EmployerFormComponent],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit{
  user: any | undefined;
  resume: Resume | undefined;
  employer: Employer |undefined;

  isEditMode:boolean = false;


  constructor(
    private userService: UserService,
    private resumeService: ResumeService,
    private employerSerivce: EmployerService,
  ) {}

  ngOnInit(): void {
    this.getCurrentUserDetails();
    // RUN ONE OF BELOW BASED ON USER ROLE?
    this.getCurrentUserResume();
    this.getCurrentUserEmployerInfo();

  }



  parseDate(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  handleFormSubmit(updatedResume: Resume): void {
    this.resumeService.updateResume(updatedResume).subscribe(() => {
      this.resume = updatedResume;
      this.toggleEditMode();
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
      })
  }

  getCurrentUserEmployerInfo(): void {
    this.employerSerivce.getCurrentUserEmployerInfo()
      .subscribe((employer: Employer) => {
        this.employer = employer;
      })
  }
}
