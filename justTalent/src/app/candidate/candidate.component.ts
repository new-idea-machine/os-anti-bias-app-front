import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Resume } from '../interfaces/resume';
import { ResumeService } from '../services/resume.services';


@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit{
  user: any | undefined;
  resume: Resume | undefined;

  constructor(
    private userService: UserService,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getCurrentUserResume();
  }

  getCurrentUserDetails(): void {
    this.userService.getCurrentUser()
      .subscribe((user: any) => {
      this.user= user.user;
    })
  }

  getCurrentUserResume(): void {
    this.resumeService.getCurrentUserResume()
      .subscribe((resume: Resume) => {
        this.resume = resume;
        console.log(resume, '🚨')
      })
  }
}
