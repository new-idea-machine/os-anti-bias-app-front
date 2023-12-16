import { Component, Input, OnInit } from '@angular/core';
import { JobPost } from '../../interfaces/job-post';


@Component({
  selector: 'app-job-list-item',
  standalone: true,
  imports: [],
  templateUrl: './job-list-item.component.html',
  styleUrl: './job-list-item.component.css'
})
export class JobListItemComponent implements OnInit{
  @Input() jobPost: JobPost | undefined;

  constructor() {}

  ngOnInit(): void {

  }
}
