import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Employer } from '../interfaces/employer';
import { EmployerService } from '../services/employer.service';
import { EmployerCardComponent } from '../employer-card/employer-card.component';

@Component({
  selector: 'app-employer-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmployerCardComponent],
  templateUrl: './employer-search.component.html',
  styleUrl: './employer-search.component.css'
})
export class EmployerSearchComponent implements OnInit {
  searchControl = new FormControl();
  employers: Employer[] =[];


  constructor(private employerService: EmployerService){

  };

  ngOnInit(): void {
    this.getAllEmployers();
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.performSearch(query)),
    )
    .subscribe((data: any) => {
      console.log(data)
      this.employers = data;
    });
  }

  getAllEmployers(): void {
    this.employerService.getAllEmployers().subscribe((employers: Employer[]) => {
      this.employers = employers;
    });
  }

  performSearch(query: string): Observable<Employer[]> {
    if (query) {
      return this.employerService.searchEmployerByName(query);
    } else {
      return this.employerService.getAllEmployers();
    }
  }







}
