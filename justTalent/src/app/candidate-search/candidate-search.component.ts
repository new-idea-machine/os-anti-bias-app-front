import candidateData from "../../data/candidateData.json";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.services';
import { FormsModule } from '@angular/forms';
import { Resume } from '../interfaces/resume';

@Component({
  selector: 'app-candidate-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './candidate-search.component.html',
  styleUrl: './candidate-search.component.css'
})
export class CandidateSearchComponent {
  
  constructor(
    private router: Router,
    private resumeService: ResumeService
  ) { }
  candidates: Resume[] = [];
  search: any = ""
  filters: any = {
    country: "",
    type_of_work: "",


  };

  filteredSearch() {
    const searchString = this.search
    const verifiedFilters: any = {
    };
    Object.keys(this.filters).forEach(key => {
      if (this.filters[key].length > 0) {
        verifiedFilters[key] = this.filters[key];
      }
    }

    );


    this.resumeService.filterResumes2(verifiedFilters, searchString).subscribe(filteredResumes => {
      this.candidates = filteredResumes;
      console.log(this.candidates)
    });
    
  }

  redirectToResume(id: any) {
    this.router.navigate(['/resume', id]);
  }



}
