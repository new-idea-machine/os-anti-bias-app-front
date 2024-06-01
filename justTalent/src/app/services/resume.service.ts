import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume } from '../interfaces/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCurrentUserResume(): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/resume/current-user`);
  }
}
