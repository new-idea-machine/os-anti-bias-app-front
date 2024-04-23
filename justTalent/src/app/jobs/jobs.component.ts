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
    country:"Germany"

  }
updateFilters(): void {
 console.log(this.filters)
}

  searchJobs()  {
    this.jobs = this.employerService.getAllJobPosts()
    console.log(this.jobs)
  }
  filteredSearch() {
    this.jobs = this.employerService.filterJobs(this.filters)
    console.log(this.jobs)
  }

  redirectToJobDetails(id: string) {
    this.router.navigate(['/job-details', id]);
  }

  
}
//Test///
// interface Person {
//   name: string;
//   country: string;
//   language: string;
//   skills: string[];
// }

// function filterObjects(array: Person[], filters: Partial<Person>): Person[] {
//   return array.filter(person => {
//       return (Object.keys(filters) as (keyof Person)[])
//                 .every(key => {
//                     if (key === "skills") {
//                         // Check if filters[key] is indeed an array and not undefined
//                         if (Array.isArray(filters[key])) {
//                             // Now it's safe to assume filters[key] is string[], perform the check
//                             return (filters[key] as string[]).every(skill => person.skills.includes(skill));
//                         }
//                         // If filters[key] is not an array, skip this filter
//                         return true;
//                     } else {
//                         // For other keys, just compare directly; ensure the filter's key value isn't undefined
//                         return filters[key] === undefined || person[key] === filters[key];
//                     }
//                 });
//   });
// }

// // Example usage:
// const data: Person[] = [
//     { name: 'John', country: 'USA', language: 'English', skills: ['JavaScript', 'HTML', 'CSS'] },
//     { name: 'Alice', country: 'Canada', language: 'English', skills: ['Python', 'Java', 'C++'] },
//     { name: 'Bob', country: 'USA', language: 'Spanish', skills: ['JavaScript', 'Python'] },
//     { name: 'Emily', country: 'UK', language: 'English', skills: ['JavaScript', 'Ruby'] }
// ];

// const filters: Partial<Person> = {
    
//   country:"Germany",
 


// };

// const filteredObjects = filterObjects(data, filters);
// console.log(filteredObjects);