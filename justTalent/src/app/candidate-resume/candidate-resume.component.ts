import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../services/resume.services';
import { Resume } from '../interfaces/resume';



@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './candidate-resume.component.html',
  styleUrl: './candidate-resume.component.css'
})
export class ResumeComponent implements OnInit {
  ResumeId: string = '';  
  resume: Resume | undefined;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
      this.ResumeId = this.route.snapshot.params['id'];
      console.log(this.ResumeId)
      this.getResumeDetails(this.ResumeId);
  }

  getResumeDetails(id: string): void {
    this.resumeService.getResumeById(id)
      .subscribe((Resume: Resume) => {
        this.resume = Resume;
      })
  }


}
