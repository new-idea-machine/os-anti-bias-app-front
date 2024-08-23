import { Component, OnInit, Output } from '@angular/core';
import { Employer } from '../interfaces/employer';
import { EmployerService } from '../services/employer.service';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employer-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-info.component.html',
  styleUrl: './employer-info.component.css'
})
export class EmployerInfoComponent implements OnInit {
  employer: Employer | undefined;
  @Output() openEdit = new EventEmitter();


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

  openEditForm(): void {
    this.openEdit.emit();
  }

}
