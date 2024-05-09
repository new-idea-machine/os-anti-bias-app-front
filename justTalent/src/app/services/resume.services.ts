import { Injectable } from '@angular/core';
// IMPORT HttpClient from @angular/common/http to make HTTP Requests
import { HttpClient } from '@angular/common/http';
// Observal and subscribe is a set
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Resume } from '../interfaces/resume';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = 'http://localhost:3000/api';

 
  constructor(private http: HttpClient) { }

  

  // MOVE TO JOB DETAILS SERVICE LATER?

  getAllResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/Resumes/`);
}

filterResumes(filters: Partial<Resume>): Observable<Resume[]> {
  return this.http.get<Resume[]>(`${this.apiUrl}/resume/`).pipe(
      map(jobs => jobs.filter(job => 
          (Object.keys(filters) as (keyof Resume)[]).every(key => 
              filters[key] === undefined || job[key] === filters[key]
          )
      ))
  );
}
    

}
