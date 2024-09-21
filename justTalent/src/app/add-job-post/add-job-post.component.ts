import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() jobPostAdded = new EventEmitter<JobPost>();

  isCreateMode: boolean = false;


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


  toggleEdit():void{
    this.isCreateMode = !this.isCreateMode;
    this.jobPostForm.reset();
  }

  handleFormSubmit(jobPost: JobPost): void{
    this.jobPostService.createJobPost(jobPost).subscribe(newJobPost => {
      this.jobPostForm.reset();
      this.jobPostAdded.emit(newJobPost);
      //close the form
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
