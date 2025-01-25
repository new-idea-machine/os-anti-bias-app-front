import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() toggleEditMode = new EventEmitter();

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

  cancelEdit(): void{
    this.toggleEditMode.emit();
  }


  ngOnInit(): void {
    if(this.jobPost) {
      this.jobPostForm.patchValue(this.jobPost);
    }
  }

  handleFormSubmit(updatedJobPost: JobPost): void{
    this.jobPostService.updateJobPost(updatedJobPost).subscribe(()=>{
      this.jobPost = updatedJobPost;
      this.toggleEditMode.emit();
    });
  }

  onSubmit() {
    if (this.jobPostForm.valid) {
      const updatedJobPost = {
        ...this.jobPost,
        ...this.jobPostForm.value
      };
      this.handleFormSubmit(updatedJobPost);
    }
  }




}
