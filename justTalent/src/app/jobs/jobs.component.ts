import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

  constructor(
    private router: Router,
    private employerService: EmployerService
  ) {}
  jobs = this.employerService.getAllJobPosts()

  redirectToJobDetails(id: string) {
    this.router.navigate(['/job-details', id]);
  }
  
}
