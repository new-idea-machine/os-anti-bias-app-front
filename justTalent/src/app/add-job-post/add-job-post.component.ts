import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobPostService } from '../services/job-post.service';
import { JobPost } from '../interfaces/job-post';

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
      city: ['', Validators.required],
      country: ['', Validators.required],
      type_of_salary: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }


  cancelEdit():void{
    //Close the form
    this.jobPostForm.reset();
  }

  handleFormSubmit(josPost: JobPost): void{
    this.jobPostService.createJobPost(josPost).subscribe(()=>{
    // Close the Form
    this.jobPostForm.reset();
    });
  }

  onSubmit(): void {
    if(this.jobPostForm.valid){
      const newJobPost = {
        ...this.jobPostForm.value,
      }
      this.handleFormSubmit(newJobPost);
      // how to re-render a job list?
    }
  }
}
