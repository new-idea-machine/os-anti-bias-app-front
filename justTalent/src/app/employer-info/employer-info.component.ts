import { Component, OnInit, Output } from '@angular/core';
import { Employer } from '../interfaces/employer';
import { EmployerService } from '../services/employer.service';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { JobListComponent } from '../job-list/job-list.component';
import { JobPost } from '../interfaces/job-post';
import { AddJobPostComponent } from '../add-job-post/add-job-post.component';

@Component({
  selector: 'app-employer-info',
  standalone: true,
  imports: [CommonModule, JobListComponent, AddJobPostComponent],
  templateUrl: './employer-info.component.html',
  styleUrl: './employer-info.component.css'
})
export class EmployerInfoComponent implements OnInit {
  employer: Employer | undefined;
  jobPosts: JobPost[] | undefined;

  @Output() openEdit = new EventEmitter();


  constructor(
    private employerService: EmployerService,
  ){}

  ngOnInit(): void {
    this.getCurrentUserEmployerInfo();
  }

  getCurrentUserEmployerInfo(): void {
    this.employerService.getCurrentUserEmployerInfo()
      .subscribe((employer: Employer) => {
        this.employer = employer;
        if(this.employer){
          this.getJobPostsByEmployerId(this.employer?.employer_id);
        }
      })
  }

  getJobPostsByEmployerId(employerId: string): void {
    this.employerService.getJobPostsByEmployerId(employerId)
      .subscribe((jobPosts: JobPost[]) =>{
        this.jobPosts = jobPosts;
      })
  }

  openEditForm(): void {
    this.openEdit.emit();
  }

}
