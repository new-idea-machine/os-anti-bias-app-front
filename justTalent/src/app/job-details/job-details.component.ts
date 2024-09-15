import { Component, OnInit } from '@angular/core';
import { JobPost } from '../interfaces/job-post';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { JobPostService } from '../services/job-post.service';
import { EditJobPostComponent } from '../edit-job-post/edit-job-post.component';


@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [EditJobPostComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  jobPostId: string = '';
  jobPost: JobPost | undefined;
  canEdit:boolean = false;
  editJobPostMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService,
    private jobPostService: JobPostService
  ) {}

  ngOnInit(): void {
      this.jobPostId = this.route.snapshot.params['id'];
      this.getJobPostDetails(this.jobPostId);
      this.canEditJobPost(this.jobPostId)
  }

  getJobPostDetails(id: string): void {
    this.employerService.getJobPostByJobId(id)
      .subscribe((jobPost: JobPost) => {
        this.jobPost = jobPost;
      })
  }

  // check if the job post's user ID matches with the current user ID
  canEditJobPost(jobPostId: string): void {
    this.jobPostService.canEditJobPost(jobPostId).subscribe(
      (response: any) => {
        this.canEdit = response.canEdit;
      },
      (error) => {
        console.error('Error checking edit permission:', error);
      }
    );
  }

  toggleJobPostEditMode(): void {
    this.editJobPostMode = !this.editJobPostMode;
  }

}
