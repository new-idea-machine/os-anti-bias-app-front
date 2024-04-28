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
    type_of_work: ""

  }
updateFilters(): void {
 console.log(this.filters)
}

  searchJobs()  {
    this.jobs = this.employerService.getAllJobPosts()
    console.log(this.jobs)
  }
  filteredSearch() {
    const verifiedFilters: any = {
      
    } 
    Object.keys(this.filters).forEach( key => {
      if (this.filters[key].length > 0 ){
        verifiedFilters[key] = this.filters[key]
      }
    }
      
    )

console.log("filters: " + JSON.stringify(this.filters))
console.log("Verified filters: " + JSON.stringify(verifiedFilters))
    this.jobs = this.employerService.filterJobs(verifiedFilters)
    console.log(this.jobs)
  }

  redirectToJobDetails(id: string) {
    this.router.navigate(['/job-details', id]);
  }

  
}