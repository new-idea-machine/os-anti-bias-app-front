import { Component, OnInit } from '@angular/core';
import { JobPost } from '../interfaces/job-post';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  jobPostId: string = '';
  jobPost: JobPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService
  ) {}

  ngOnInit(): void {
      this.jobPostId = this.route.snapshot.params['id'];
      this.getJobPostDetails(this.jobPostId);
  }

  getJobPostDetails(id: string): void {
    this.employerService.getJobPostByJobId(id)
      .subscribe((jobPost: JobPost) => {
        this.jobPost = jobPost;
      })
  }
}
