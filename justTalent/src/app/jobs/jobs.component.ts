import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

  constructor(
    private router: Router,
    private employerService: EmployerService
  ) {}
  jobs: any = {}
  filters: any = {
    country:"",
    setting:"",
    province:"",
    skills:"",
  }
updateFilters(): void {
 console.log(this.filters)
}

  searchJobs()  {
    this.jobs = this.employerService.getAllJobPosts()
  }

  redirectToJobDetails(id: string) {
    this.router.navigate(['/job-details', id]);
  }
  
}
