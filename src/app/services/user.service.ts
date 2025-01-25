import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getCurrentUser(): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/current`)
  }

}
