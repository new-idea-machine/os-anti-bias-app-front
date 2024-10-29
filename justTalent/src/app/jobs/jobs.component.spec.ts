import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';
import { EmployerService } from '../services/employer.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobPost } from '../interfaces/job-post';

// Mock EmployerService to avoid real HTTP calls
class MockEmployerService {
  getAllJobPosts() {
    return of([]);  // Return an observable with an empty array
  }
  filterJobs2(filters: any, searchString: string) {
    return of([]);  // Return an observable with an empty array
  }
}

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let employerService: EmployerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,   // Importing CommonModule as it is used by the component
        FormsModule,    // Importing FormsModule for template-driven forms
        RouterLink,     // Importing RouterLink for navigation links
        JobsComponent   // Import the standalone component directly
      ],
      providers: [
        { provide: EmployerService, useClass: MockEmployerService }, // Mock EmployerService
        { provide: Router, useValue: { navigate: jest.fn() } }       // Mock Router with jest.fn() for Jest
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    employerService = TestBed.inject(EmployerService);  // Inject EmployerService mock
    router = TestBed.inject(Router);                    // Inject Router mock
    fixture.detectChanges();                            // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize jobs as an empty array', () => {
    expect(component.jobs).toEqual([]);
  });

  it('should call searchJobs and fetch all job posts', () => {
    const jobs: JobPost[] = [{
      job_post_id: 1,
      employer_id: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      job_title: 'Software Engineer',
      description: 'Develop software applications.',
      requirements: '3 years of experience in JavaScript',
      salary: 70000,
      type_of_salary: 'Annual',
      country: 'USA',
      city: 'New York',
      type_of_work: 'Full-time',
      location: 'On-site',
      created_at: '2024-01-01T00:00:00Z',
      modified_at: '2024-01-01T00:00:00Z'
    }];
    
    // Mock getAllJobPosts to return a specific set of job posts
    jest.spyOn(employerService, 'getAllJobPosts').mockReturnValue(of(jobs));

    component.searchJobs();

    expect(employerService.getAllJobPosts).toHaveBeenCalled();
    expect(component.jobs).toEqual(jobs);
  });

  it('should call filteredSearch and update jobs based on filters', () => {
    const filteredJobs: JobPost[] = [{
      job_post_id: 2,
      employer_id: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      job_title: 'Web Developer',
      description: 'Develop and maintain web applications.',
      requirements: '2 years of experience in Angular',
      salary: 60000,
      type_of_salary: 'Annual',
      country: 'USA',
      city: 'San Francisco',
      type_of_work: 'Remote',
      location: 'Remote',
      created_at: '2024-01-01T00:00:00Z',
      modified_at: '2024-01-01T00:00:00Z'
    }];
    
    // Mock filterJobs2 to return a filtered set of job posts
    jest.spyOn(employerService, 'filterJobs2').mockReturnValue(of(filteredJobs));

    component.filteredSearch();

    const expectedFilters = {  };
    expect(employerService.filterJobs2).toHaveBeenCalledWith(expectedFilters, component.search);
    expect(component.jobs).toEqual(filteredJobs);
  });

  it('should navigate to job details on redirectToJobDetails', () => {
    const jobId = 123;
    component.redirectToJobDetails(jobId);
    expect(router.navigate).toHaveBeenCalledWith(['/job-details', jobId]);
  });
});
