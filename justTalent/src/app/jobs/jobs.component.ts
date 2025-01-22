import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { FormsModule } from '@angular/forms';
import { JobPost } from '../interfaces/job-post';


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
  jobs: JobPost[] = []
  search: any = ""
  filters: any = {
      country:"",
      type_of_work: "",
    
  }
updateFilters(): void {
//  console.log(this.filters)
}

  searchJobs()  {
    this.employerService.getAllJobPosts().subscribe(
      (jobs) => {
        this.jobs = jobs
      }
    )
    // console.log(this.jobs)
  }
  filteredSearch() {
    const searchString = this.search
    const verifiedFilters: any = {
      
    } 
    Object.keys(this.filters).forEach( key => {
      if (this.filters[key].length > 0 ){
        verifiedFilters[key] = this.filters[key]
      }
    }
      
    )


    this.employerService.filterJobs3(verifiedFilters, searchString).subscribe(filteredJobs => {
      this.jobs = filteredJobs;
    })
    // console.log(this.jobs)
  }

  redirectToJobDetails(id: any) {
    this.router.navigate(['/job-details', id]);
  }

  
}
