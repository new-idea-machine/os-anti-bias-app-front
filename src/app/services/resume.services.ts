import { Injectable } from '@angular/core';
// IMPORT HttpClient from @angular/common/http to make HTTP Requests
import { HttpClient, HttpParams } from '@angular/common/http';
// Observal and subscribe is a set
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Resume } from '../interfaces/resume';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = environment.apiUrl;


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

    const newResume = {...resume, token};
    return this.http.post<Resume>(`${this.apiUrl}/resume/`, newResume)
  }

getResumeById(id: string): Observable<Resume> {
  console.log(this.http.get<Resume>(`${this.apiUrl}/resume/${id}`));
  return this.http.get<Resume>(`${this.apiUrl}/resume/${id}`);
}

// filterResumes1(filters: Partial<Resume>): Observable<Resume[]> {
//   return this.http.get<Resume[]>(`${this.apiUrl}/resume/`).pipe(
//       map(jobs => jobs.filter(job =>
//           (Object.keys(filters) as (keyof Resume)[]).every(key =>
//               filters[key] === undefined || job[key] === filters[key]
//           )
//       ))
//   );
// }

filterResumes2(filters: Partial<Resume>, searchString: string): Observable<Resume[]> {
  return this.http.get<Resume[]>(`${this.apiUrl}/resume/`).pipe(
      map(jobs =>
        jobs
        .filter(job => job.summary.toLowerCase().includes(searchString.toLowerCase()) || job.title.toLowerCase().includes(searchString.toLowerCase()) )
        .filter(job =>
          (Object.keys(filters) as (keyof Resume)[]).every(key =>
              filters[key] === undefined || job[key] === filters[key]
          )
      ))
  );
}





filterResumes3(filters: Partial<Resume>, searchString: string): Observable<Resume[]> {

  const params = new HttpParams()
  .set('searchString', searchString)
  .set('filters', JSON.stringify(filters));
  return this.http.get<Resume[]>(`${this.apiUrl}/resume/filtered`, { params });
}

}







