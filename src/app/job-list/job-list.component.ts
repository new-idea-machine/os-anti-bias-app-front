import { Component, Input, OnInit } from '@angular/core';
import { JobListItemComponent } from './job-list-item/job-list-item.component';
import { JobPost } from '../interfaces/job-post';
import { CommonModule } from '@angular/common';
import { AddJobPostComponent } from '../add-job-post/add-job-post.component';
import { Employer } from '../interfaces/employer';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobListItemComponent, AddJobPostComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  @Input() jobPosts: JobPost[] | undefined;
  employer: Employer | undefined;

  canEdit: boolean = false;

  constructor (
    private employerService: EmployerService
  ){

  }

  ngOnInit(): void{
    this.getCurrentUserEmployerInfo();
    // console.log(this.employer, 'employer')
    // console.log(this.jobPosts)
    // if(this.employer){
    //   console.log(this.employer, 'employer')
    //   this.userAuth(this.employer);
    // }
  }

  onJobPostAdded(newJobPost: any): void {
    this.jobPosts?.push(newJobPost);
  }

  getCurrentUserEmployerInfo(): void {
    this.employerService.getCurrentUserEmployerInfo()
      .subscribe((employer: Employer) => {
        this.employer = employer;
        if (this.employer) {
          console.log(this.employer);
          this.userAuth(this.employer);
        }
      })
  }

  userAuth(employer: Employer):void{
    this.employerService.userAuthToEditEmployerInfo(employer).subscribe(
      (response: any) =>{
      this.canEdit = response.canEdit;
      },
      (error) => {
        console.error('Error checking edit permission:', error);
      }
    )
  }
}
