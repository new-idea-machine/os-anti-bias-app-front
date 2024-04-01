import { Injectable } from '@angular/core';
// IMPORT HttpClient from @angular/common/http to make HTTP Requests
import { HttpClient } from '@angular/common/http';
// Observal and subscribe is a set
import { Observable } from 'rxjs';
import { Employer } from '../interfaces/employer';
import { JobPost } from '../interfaces/job-post';


@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEmployerById(id: string): Observable<Employer> {
    return this.http.get<Employer>(`${this.apiUrl}/employers/${id}`);
  }

  getJobPostsByEmployerId(id: string): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/by-employer/${id}`);
  }

  // MOVE TO JOB DETAILS SERVICE LATER?
  getJobPostByJobId(id: string): Observable<JobPost> {
    return this.http.get<JobPost>(`${this.apiUrl}/jobPosts/${id}`);
  }


}
