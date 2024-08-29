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


  getCurrentUserResume(): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/resume/current-user`);
  }

  updateResume(resume: Resume): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/resume/${resume.resume_id}`, resume)
  }

  createNewResume(resume: Resume): Observable<Resume> {
    const token =localStorage.getItem('token');

    const newResume = {...resume, user: token};
    return this.http.post<Resume>(`${this.apiUrl}/resume/`, newResume)
  }


}
