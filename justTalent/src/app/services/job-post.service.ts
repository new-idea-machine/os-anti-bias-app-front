import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  canEditJobPost(jobPostId: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/jobposts/${jobPostId}/can-edit`)
  }

}
