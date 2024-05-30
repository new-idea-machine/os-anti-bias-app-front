import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit{
  user: any | undefined;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUserDetails();

  }

  getCurrentUserDetails(): void {
    this.userService.getCurrentUser()
      .subscribe((user: any) => {
      this.user= user.user;
    })
  }
}
