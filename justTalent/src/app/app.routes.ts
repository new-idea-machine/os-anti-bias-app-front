import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployerPageComponent } from './employer-page/employer-page.component';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResumeComponent } from './resume/resume.component';

export const routes: Routes = [
  {'path':'', component:HomeComponent},
  {'path':'employer-page/:id', component:EmployerPageComponent},
  {'path':'job-details/:id', component:JobDetailsComponent},
  {'path':'register', component:RegisterComponent},
  {'path':'login', component:LoginComponent},
  {'path':'candidate-search', component:CandidateSearchComponent},
  {'path':'jobPosts', component:JobsComponent},
  {'path':'resume/:id', component:ResumeComponent},
];
