import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employer-search.component.html',
  styleUrl: './employer-search.component.css'
})
export class EmployerSearchComponent implements OnInit {
  searchControl = new FormControl();

  results: any[] = [];

  constructor(){};

  ngOnInit(): void {
      this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.performSearch(query)),
      )
      .subscribe((data: any) => {
        this.results = data;
      });
  }

  performSearch(query: string) {
    const dummyData = [
      { name: 'Angular' },
      { name: 'React' },
      { name: 'Vue' },
      { name: 'Svelte' },
    ];
    return of(dummyData.filter(item => item.name.toLowerCase().includes(query.toLowerCase())));
  }







}
