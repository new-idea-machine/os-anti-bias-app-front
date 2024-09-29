import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResumeService } from '../services/resume.services';
import { UserService } from '../services/user.service';
import { Resume } from '../interfaces/resume';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit {
  user: any | undefined;
  resume: Resume | undefined;
  @Output() openEdit = new EventEmitter();

  constructor(
    private userService: UserService,
    private resumeService: ResumeService,
  ){}

  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getCurrentUserResume();
  }


  parseDate(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
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
      })
  }

  openEditForm(): void {
    this.openEdit.emit();
  }


}
