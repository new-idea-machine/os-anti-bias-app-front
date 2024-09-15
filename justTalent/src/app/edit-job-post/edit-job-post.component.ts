import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobPost } from '../interfaces/job-post';
import { JobPostService } from '../services/job-post.service';

@Component({
  selector: 'app-edit-job-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-job-post.component.html',
  styleUrl: './edit-job-post.component.css'
})
export class EditJobPostComponent implements OnInit{
  @Input() jobPost:JobPost | undefined;
  jobPostForm: FormGroup;


  constructor(
    private fb:FormBuilder,
    private jobPostService: JobPostService
  ){
    this.jobPostForm = this.fb.group({
      job_title: ['', Validators.required],
      requirements: ['', Validators.required],
      location: ['', Validators.required],
      type_of_work: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    if(this.jobPost) {
      this.jobPostForm = this.fb.group({
        job_title: [this.jobPost.job_title, Validators.required],
        requirements: [this.jobPost.requirements, Validators.required],
        location: [this.jobPost.location, Validators.required],
        type_of_work: [this.jobPost.type_of_work, Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.jobPostForm.valid) {
      console.log('Form data:', this.jobPostForm.value);
    }
  }




}
