import { Component, Input, OnInit } from '@angular/core';
import { JobListItemComponent } from './job-list-item/job-list-item.component';
import { JobPost } from '../interfaces/job-post';
import { CommonModule } from '@angular/common';
import { AddJobPostComponent } from '../add-job-post/add-job-post.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobListItemComponent, AddJobPostComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  @Input() jobPosts: JobPost[] | undefined;

  constructor (){

  }

  ngOnInit(): void{
    console.log(this.jobPosts)
  }

  onJobPostAdded(newJobPost: any): void {
    this.jobPosts?.push(newJobPost);
  }
}
