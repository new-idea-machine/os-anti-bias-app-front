import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobPostService } from '../services/job-post.service';

@Component({
  selector: 'app-add-job-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-job-post.component.html',
  styleUrl: './add-job-post.component.css'
})
export class AddJobPostComponent implements OnInit {
  jobPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  }

  cancelEdit():void{

  }

  onSubmit(): void {

  }
}
