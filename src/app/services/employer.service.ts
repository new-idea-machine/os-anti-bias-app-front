import { Injectable } from '@angular/core';
// IMPORT HttpClient from @angular/common/http to make HTTP Requests
import { HttpClient, HttpParams } from '@angular/common/http';
// Observal and subscribe is a set
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employer } from '../interfaces/employer';
import { JobPost } from '../interfaces/job-post';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getEmployerById(id: string): Observable<Employer> {
    return this.http.get<Employer>(`${this.apiUrl}/employers/${id}`);
  }

  getJobPostsByEmployerId(id: string): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/by-employer/${id}`);
  }

  // MOVE TO JOB DETAILS SERVICE LATER?
  getJobPostByJobId(id: string): Observable<JobPost> {
    console.log(this.http.get<JobPost>(`${this.apiUrl}/jobPosts/${id}`));
    return this.http.get<JobPost>(`${this.apiUrl}/jobPosts/${id}`);
  }
  getAllJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/`);
}
// filtering backend uses less processing power for larger database -KE
  filterJobs(filters: Partial<JobPost>): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/`).pipe(
        map(jobs => jobs.filter(job =>
            (Object.keys(filters) as (keyof JobPost)[]).every(key =>
                filters[key] === undefined || job[key] === filters[key]
            )
        ))
    );
  }



  getCurrentUserEmployerInfo(): Observable<Employer> {
    return this.http.get<Employer>(`${this.apiUrl}/employers/current-user`);
  }



  updateEmployer(employer: Employer): Observable<Employer> {
    return this.http.put<Employer>(`${this.apiUrl}/employers/${employer.employer_id}`, employer);
  }

  createEmployerInfo(employer: Employer): Observable<Employer> {
    const token = localStorage.getItem('token');

    const newEmployerData = { ...employer, token };
    return this.http.post<Employer>(`${this.apiUrl}/employers/`, newEmployerData);
  }


  userAuthToEditEmployerInfo(employer: Employer): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/employers/${employer.employer_id}/auth`);
  }

  getAllEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.apiUrl}/employers`);
  }

  searchEmployerByName(employerName: string): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.apiUrl}/employers/search`, { params: { employer_name: employerName }});
  }

filterJobs1(filters: Partial<JobPost>): Observable<JobPost[]> {
  return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/`).pipe(
      map(jobs => jobs.filter(job =>
          (Object.keys(filters) as (keyof JobPost)[]).every(key =>
              filters[key] === undefined || job[key] === filters[key]
          )
      ))
  );
}

filterJobs2(filters: Partial<JobPost>, searchString: string): Observable<JobPost[]> {
  return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/`).pipe(
      map(jobs =>
        jobs
        .filter(job => job.description.toLowerCase().includes(searchString.toLowerCase()) || job.job_title.toLowerCase().includes(searchString.toLowerCase()) )
        .filter(job =>
          (Object.keys(filters) as (keyof JobPost)[]).every(key =>
              filters[key] === undefined || job[key] === filters[key]
          )
      )
    )
  );
}

filterJobs3(filters: Partial<JobPost>, searchString: string): Observable<JobPost[]> {

const params = new HttpParams()
    .set('searchString', searchString)
    .set('filters', JSON.stringify(filters));
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/filtered`, { params });
}
}
