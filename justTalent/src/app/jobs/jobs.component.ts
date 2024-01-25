import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import candidateData from "../../data/candidateData.json"

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  candidates = candidateData
}
