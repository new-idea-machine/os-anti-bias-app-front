import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../employer.service';
import { JobPost } from '../interfaces/job-post';
import { Employer } from '../interfaces/employer';

@Component({
  selector: 'app-employer-page',
  templateUrl: './employer-page.component.html',
  styleUrls: ['./employer-page.component.css']
})
export class EmployerPageComponent implements OnInit {
  employerId: number = -1;
  employer: Employer | undefined

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService
  ) {}

  //ngOnInit is to initialize a component such making initial API calls, setting default values and so on.
  ngOnInit(): void {
    this.employerId = Number(this.route.snapshot.params['id']);
    this.employer = this.employerService.getEmployerById(this.employerId)
  }


}
