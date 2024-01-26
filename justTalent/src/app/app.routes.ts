import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployerPageComponent } from './employer-page/employer-page.component';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';

export const routes: Routes = [
  { 'path': '', component: HomeComponent },
  { 'path': 'employer-page', component: EmployerPageComponent },
  { 'path': 'candidate-search', component: CandidateSearchComponent },
  { 'path': 'jobs', component: JobsComponent },
  { 'path': 'job-details/:id', component: JobDetailsComponent },
  { 'path': 'employer-page/:id', component: EmployerPageComponent },
]

