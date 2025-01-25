import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPost } from '../interfaces/job-post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  canEditJobPost(jobPostId: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/jobposts/${jobPostId}/can-edit`)
  }

  createJobPost(jobPost: JobPost): Observable<JobPost>{
    return this.http.post<JobPost>(`${this.apiUrl}/jobposts/`, jobPost);
  }

  updateJobPost(jobPost: JobPost): Observable<JobPost>{
    return this.http.put<JobPost>(`${this.apiUrl}/jobposts/${jobPost.job_post_id}`, jobPost);
  }

}
