import { Component, Input, OnInit } from '@angular/core';
import { JobListItemComponent } from './job-list-item/job-list-item.component';
import { JobPost } from '../interfaces/job-post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobListItemComponent],
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
}
