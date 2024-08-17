import { Component, OnInit } from '@angular/core';
import { Employer } from '../interfaces/employer';
import { EmployerService } from '../services/employer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-info.component.html',
  styleUrl: './employer-info.component.css'
})
export class EmployerInfoComponent implements OnInit {
  employer: Employer | undefined;


  constructor(
    private employerService: EmployerService,
  ){}

  ngOnInit(): void {
    this.getCurrentUserEmployerInfo();
  }

  getCurrentUserEmployerInfo(): void {
    this.employerService.getCurrentUserEmployerInfo()
      .subscribe((employer: Employer) => {
        this.employer = employer;
      })
  }

}
