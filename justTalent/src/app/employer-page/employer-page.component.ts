import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { JobPost } from '../interfaces/job-post';
import { Employer } from '../interfaces/employer';
import { JobListComponent } from '../job-list/job-list.component';

@Component({
  selector: 'app-employer-page',
  standalone: true,
  imports: [JobListComponent],
  templateUrl: './employer-page.component.html',
  styleUrls: ['./employer-page.component.css']
})
export class EmployerPageComponent implements OnInit {
  employerId: string = '';
  employer: Employer | undefined;
  jobPosts: JobPost[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService
  ) {}

  //ngOnInit is to initialize a component such making initial API calls, setting default values and so on.
  ngOnInit(): void {
    this.employerId = this.route.snapshot.paramMap.get('id') || '';
    this.getEmployerDetails(this.employerId);
    this.getJobPosts(this.employerId);
  }

  getEmployerDetails(id: string): void {
    this.employerService.getEmployerById(id)
      .subscribe((employer: Employer) => {
        this.employer = employer;
      });
  }

  getJobPosts(id: string): void {
    this.employerService.getJobPostsByEmployerId(id)
      .subscribe((jobPosts: JobPost[]) => {
        this.jobPosts = jobPosts;
      });
  }


}
