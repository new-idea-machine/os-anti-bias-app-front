import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPost } from '../interfaces/job-post';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  canEditJobPost(jobPostId: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/jobposts/${jobPostId}/can-edit`)
  }

  updateJobPost(jobPost: JobPost): Observable<JobPost>{
    return this.http.put<JobPost>(`${this.apiUrl}/jobposts/${jobPost.job_post_id}`, jobPost);
  }

}
