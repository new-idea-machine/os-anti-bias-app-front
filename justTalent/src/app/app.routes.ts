import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployerPageComponent } from './employer-page/employer-page.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {'path':'', component:HomeComponent},
  {'path':'employer-page/:id', component:EmployerPageComponent},
  {'path':'job-details/:id', component:JobDetailsComponent},
  {'path':'register', component:RegisterComponent},
  {'path':'login', component:LoginComponent},
];
