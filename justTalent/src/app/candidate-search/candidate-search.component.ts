import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import candidateData from "../../data/candidateData.json"

@Component({
  selector: 'app-candidate-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-search.component.html',
  styleUrl: './candidate-search.component.css'
})
export class CandidateSearchComponent {
  candidates = candidateData


}
